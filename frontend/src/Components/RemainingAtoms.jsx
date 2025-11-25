const RemainingAtoms = ({ timeline }) => {
  const last = timeline[timeline.length - 1];

  return (
    <div className="bg-white p-4 rounded shadow mb-4">
      <h2 className="text-xl font-bold mb-2">Remaining Atoms</h2>
      <p className="text-2xl font-semibold">{last.remaining}</p>
    </div>
  );
};

export default RemainingAtoms;
