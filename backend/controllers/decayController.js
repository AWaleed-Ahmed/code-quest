const fs = require("fs");
const path = require("path");

// Load isotopes from CSV
function loadIsotopes() {
  const filePath = path.join(__dirname, "../data/isotopes.csv");
  const data = fs.readFileSync(filePath, "utf-8");
  const lines = data.trim().split("\n").slice(1); // skip header
  return lines.map((line) => {
    const [name, halfLife] = line.split(",");
    return { name, halfLife: parseFloat(halfLife) };
  });
}

// GET /api/isotopes
function getIsotopes(req, res) {
  const isotopes = loadIsotopes();
  res.json(isotopes);
}

// POST /api/simulate
function simulateDecay(req, res) {
  const { isotopeName, initialAtoms, steps } = req.body;

  if (!isotopeName || !initialAtoms || !steps) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const isotopes = loadIsotopes();
  const isotope = isotopes.find((i) => i.name === isotopeName);

  if (!isotope) {
    return res.status(400).json({ error: "Isotope not found" });
  }

  const halfLife = isotope.halfLife;
  let currentAtoms = initialAtoms;
  const decayTimeline = [];

  for (let t = 1; t <= steps; t++) {
    const decayProb = 1 - Math.pow(0.5, 1 / halfLife);
    let decayedThisStep = 0;

    for (let i = 0; i < currentAtoms; i++) {
      if (Math.random() < decayProb) decayedThisStep++;
    }

    currentAtoms -= decayedThisStep;
    decayTimeline.push({
      step: t,
      decayed: decayedThisStep,
      remaining: currentAtoms
    });
  }

  res.json({ timeline: decayTimeline });
}

module.exports = { getIsotopes, simulateDecay };
