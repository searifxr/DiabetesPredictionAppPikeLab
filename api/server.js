const express = require('express');
const cors = require('cors');
const { spawn } = require('child_process');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/predict', async (req, res) => {
    try {
        const pythonProcess = spawn('python', ['predict.py']);
        let predictionData = '';
        let errorData = '';

        // Send data to Python script
        pythonProcess.stdin.write(JSON.stringify(req.body));
        pythonProcess.stdin.end();

        // Collect prediction results
        pythonProcess.stdout.on('data', (data) => {
            predictionData += data.toString();
        });

        // Collect any errors
        pythonProcess.stderr.on('data', (data) => {
            errorData += data.toString();
        });

        // Handle process completion
        pythonProcess.on('close', (code) => {
            if (code !== 0) {
                console.error('Python Error:', errorData);
                return res.status(500).json({ error: 'Prediction failed', details: errorData });
            }
            
            try {
                const result = JSON.parse(predictionData);
                res.json(result);
            } catch (e) {
                console.error('JSON Parse Error:', e);
                res.status(500).json({ 
                    error: 'Failed to parse prediction result',
                    raw: predictionData
                });
            }
        });
    } catch (error) {
        console.error('Server Error:', error);
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 8082;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));