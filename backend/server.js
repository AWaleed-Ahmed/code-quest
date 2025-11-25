const express = require('express');
const cors = require('cors');
const { simulateDecay, getIsotopes } = require('./controllers/decayController');

const app = express();
app.use(cors());
app.use(express.json());

// Serve a tiny default favicon (16x16 transparent)
const faviconBase64 = Buffer.from(
  'AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAGAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
  'base64'
);
app.get('/favicon.ico', (req, res) => {
  res.writeHead(200, {
    'Content-Type': 'image/x-icon',
    'Content-Length': faviconBase64.length
  });
  res.end(faviconBase64);
});

// Debug logging
app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  next();
});

// Routes
app.get('/api/isotopes', getIsotopes);
app.post('/api/simulate', simulateDecay);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
