const LinkedList = require('../models/LinkedList');

function simulateDecay(req, res) {
  const { initialAtoms, halfLife, steps } = req.body;

  if (!initialAtoms || !halfLife || !steps) {
    return res.status(400).json({ error: "Missing parameters" });
  }

  const remainingAtoms = initialAtoms;
  let currentAtoms = initialAtoms;
  const decayedList = new LinkedList();
  const decayTimeline = [];

  for (let t = 1; t <= steps; t++) {
    const decayedThisStep = [];
    // Probability for one atom to decay in one step
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
    decayTimeline,
    decayedAtoms: decayedList.toArray(),
    remainingAtoms: currentAtoms
  });
}

module.exports = { simulateDecay };
