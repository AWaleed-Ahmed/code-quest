import { Routes, Route } from "react-router-dom";

// Correct relative paths:
import Navbar from "./components/Navbar.jsx";
import Home from "./Pages/Home.jsx";
import TimelinePage from "./Pages/TimelinePage.jsx";
import About from "./Pages/About.jsx";
const App = () => (
  <>
    <Navbar />
    <div className="max-w-5xl mx-auto p-5">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/timeline" element={<TimelinePage />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  </>
);

export default App;
