import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import InputForm from "../components/InputForm.jsx";
import RemainingAtoms from "../components/RemainingAtoms";


const Home = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isotopes, setIsotopes] = useState([]);
  const [selectedIsotope, setSelectedIsotope] = useState("");

  // Fetch isotopes from backend
  useEffect(() => {
    const fetchIsotopes = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/isotopes");
        console.log(res.data);
        setIsotopes(res.data);
        if (res.data.length) setSelectedIsotope(res.data[0].name);
      } catch (err) {
        console.error(err);
      }
    };
    fetchIsotopes();
  }, []);

  const simulateDecay = async ({ initialAtoms, steps }) => {
    if (!selectedIsotope) return;
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:3000/api/simulate", {
        isotopeName: selectedIsotope,
        initialAtoms,
        steps
      });
      navigate("/timeline", { state: { timeline: res.data.timeline } });
    } catch (err) {
      console.error(err);
      alert("Simulation failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <label className="block mb-2 font-semibold">Select Isotope:</label>
      <select
        className="mb-4 p-2 border rounded"
        value={selectedIsotope}
        onChange={(e) => setSelectedIsotope(e.target.value)}
      >
        {isotopes.map((iso) => (
          <option key={iso.name} value={iso.name}>
            {iso.name} (Half-life: {iso.halfLife})
          </option>
        ))}
      </select>

      <InputForm onSimulate={simulateDecay} />
      {loading && <p className="text-blue-600 mt-3">Simulating decay, please wait...</p>}
    </div>
  );
};

export default Home;
