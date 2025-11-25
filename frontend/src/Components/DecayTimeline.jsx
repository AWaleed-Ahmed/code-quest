const DecayTimeline = ({ timeline }) => (
  <div className="bg-white p-4 rounded shadow">
    <h2 className="text-xl font-bold mb-2">Decay Timeline</h2>
    <table className="min-w-full text-left border">
      <thead>
        <tr>
          <th className="border px-2">Step</th>
          <th className="border px-2">Decayed</th>
          <th className="border px-2">Remaining</th>
        </tr>
      </thead>
      <tbody>
        {timeline.map((t) => (
          <tr key={t.step}>
            <td className="border px-2">{t.step}</td>
            <td className="border px-2">{t.decayed}</td>
            <td className="border px-2">{t.remaining}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default DecayTimeline;
