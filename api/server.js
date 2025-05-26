const express = require('express');
const cors = require('cors');
const { spawn } = require('child_process');

const app = express();

// Enable CORS and JSON parsing
app.use(cors());
app.use(express.json());

app.post('/api/predict', (req, res) => {
    const python = spawn('python', ['predict.py']);
    
    python.stdin.write(JSON.stringify(req.body));
    python.stdin.end();

    let dataFromPython = '';

    python.stdout.on('data', (data) => {
        dataFromPython += data.toString();
    });

    python.stderr.on('data', (data) => {
        console.error(`Error from Python: ${data}`);
    });

    python.on('close', (code) => {
        if (code !== 0) {
            return res.status(500).json({ error: 'Failed to get prediction' });
        }
        try {
            const result = JSON.parse(dataFromPython);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error: 'Invalid result format' });
        }
    });
});

// Start server
const PORT = 8082;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});