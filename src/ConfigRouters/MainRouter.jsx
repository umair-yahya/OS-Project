import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "../component/Home/Home";
import RoundRobin from "../component/RoundRobin/RoundRobin";
import FirstFit from "../component/FirstFit/FirstFit";
import "../index.css";

const MainRouter = () => {
  return (
    <Router>
      <div className="flex justify-center bg-gray-200 ">
        <div className="text-white-700 font-bold  bg-gray-400 px-4 py-2 m-2 hover:bg-sky-700">
          <Link to="/">Home</Link>
        </div>
        <div className="text-white-700 font-bold bg-gray-400 px-4 py-2 m-2 hover:bg-sky-700">
          <Link to="/RoundRobin">Round Robin</Link>
        </div>
        <div className="text-white-700 font-bold  bg-gray-400 px-4 py-2 m-2 hover:bg-sky-700">
          <Link to="/FirstFit">First Fit</Link>
        </div>
      </div>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/RoundRobin" element={<RoundRobin />} />
        <Route path="/FirstFit" element={<FirstFit />} />
      </Routes>
    </Router>
  );
};
export default MainRouter;
