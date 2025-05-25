const express = require('express');
const cors = require('cors');
const { spawn } = require('child_process');

const app = express();

app.use(cors());
app.use(express.json());

app.post('/api/predict', (req, res) => {
    const pythonProcess = spawn('python', ['predict.py', JSON.stringify(req.body)]);
    let result = '';

    pythonProcess.stdout.on('data', (data) => {
        result += data.toString();
    });

    pythonProcess.stderr.on('data', (data) => {
        console.error(`Error from Python: ${data}`);
    });

    pythonProcess.on('close', (code) => {
        if (code !== 0) {
            return res.status(500).json({ error: 'Prediction failed' });
        }
        try {
            const prediction = JSON.parse(result);
            res.json(prediction);
        } catch (error) {
            res.status(500).json({ error: 'Invalid prediction result' });
        }
    });
});

const PORT = 8082;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
});