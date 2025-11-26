import { useNavigate } from "react-router-dom";
import axios from "axios";
import InputForm from "../components/InputForm";

const Home = () => {
  const navigate = useNavigate();

  const simulateDecay = async (payload) => {
    try {
      const res = await axios.post("http://localhost:3000/api/simulate", payload);
      navigate("/timeline", { state: { timeline: res.data.timeline } });
    } catch (err) {
      console.error("Simulation error:", err);
      alert("Simulation failed. Please try again.");
    }
  };

  return <InputForm onSimulate={simulateDecay} />;
};

export default Home;
