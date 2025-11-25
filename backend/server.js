const express = require('express');
const cors = require('cors');
const { simulateDecay } = require('./controllers/decayController');

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.post('/api/simulate', simulateDecay);

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Node backend running at http://localhost:${PORT}`);
});
