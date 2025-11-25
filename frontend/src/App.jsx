import { Routes, Route } from "react-router-dom";

import Navbar from "../components/Navbar";
import Home from "../Pages/Home";
import TimelinePage from "../Pages/TimelinePage";
import About from "../Pages/About";

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
