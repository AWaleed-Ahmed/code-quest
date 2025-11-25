const fs = require('fs');
const path = require('path');
const LinkedList = require('../models/LinkedList');

// Load isotopes from CSV
function loadIsotopes() {
  const filePath = path.join(__dirname, '../data/isotopes.csv');
  const data = fs.readFileSync(filePath, 'utf-8');
  const lines = data.trim().split('\n').slice(1); // skip header
  const isotopes = lines.map(line => {
    const [name, halfLife] = line.split(',');
    return { name, halfLife: parseFloat(halfLife) };
  });
  return isotopes;
}

// GET /api/isotopes
function getIsotopes(req, res) {
  const isotopes = loadIsotopes();
  res.json(isotopes);
}

// POST /api/simulate
function simulateDecay(req, res) {
  const { isotopeName, initialAtoms, steps } = req.body;
  const isotopes = loadIsotopes();
  const isotope = isotopes.find(i => i.name === isotopeName);

  if (!isotope) return res.status(400).json({ error: "Isotope not found" });

  const halfLife = isotope.halfLife;
  let currentAtoms = initialAtoms;
  const decayedList = new LinkedList();
  const decayTimeline = [];

  for (let t = 1; t <= steps; t++) {
    const decayedThisStep = [];
    const decayProb = 1 - Math.pow(0.5, 1 / halfLife);

    for (let i = 0; i < currentAtoms; i++) {
      if (Math.random() < decayProb) {
        decayedList.add(`Atom ${i + 1} decayed at step ${t}`);
        decayedThisStep.push(i + 1);
      }
    }

    currentAtoms -= decayedThisStep.length;
    decayTimeline.push({
      step: t,
      remaining: currentAtoms,
      decayed: decayedThisStep.length
    });
  }

  res.json({
    isotope: isotopeName,
    decayTimeline,
    decayedAtoms: decayedList.toArray(),
    remainingAtoms: currentAtoms
  });
}

module.exports = { getIsotopes, simulateDecay };
