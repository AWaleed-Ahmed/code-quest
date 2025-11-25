const express = require('express');
const cors = require('cors');
const { simulateDecay, getIsotopes } = require('./controllers/decayController');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/favicon.ico', (req, res) => res.sendStatus(204));

// Routes
app.get('/api/isotopes', getIsotopes);
app.post('/api/simulate', simulateDecay);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
