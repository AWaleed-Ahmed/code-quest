import { useState } from "react";

const InputForm = ({ onSimulate }) => {
  const [initialAtoms, setInitialAtoms] = useState(100);
  const [halfLife, setHalfLife] = useState(2);
  const [steps, setSteps] = useState(10);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSimulate({ initialAtoms, halfLife, steps });
  };

  return (
    <form className="bg-white p-5 rounded-lg shadow mb-5" onSubmit={handleSubmit}>
      <div className="grid grid-cols-3 gap-4">
        <input
          type="number"
          className="input"
          placeholder="Initial Atoms"
          value={initialAtoms}
          onChange={(e) => setInitialAtoms(+e.target.value)}
        />
        <input
          type="number"
          className="input"
          placeholder="Half Life"
          value={halfLife}
          onChange={(e) => setHalfLife(+e.target.value)}
        />
        <input
          type="number"
          className="input"
          placeholder="Steps"
          value={steps}
          onChange={(e) => setSteps(+e.target.value)}
        />
      </div>
      <button className="mt-3 px-4 py-2 bg-blue-600 text-white rounded">Simulate</button>
    </form>
  );
};

export default InputForm;
