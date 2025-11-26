import React, { useEffect } from "react";
import { useCandidate } from "../context/CandidateProvider";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { hired, getSelectedCandidates } = useCandidate();

  useEffect(() => {
    getSelectedCandidates();
  }, []);

  return (
    <nav className="bg-green-200 shadow-md px-6 py-4 flex justify-between items-center">
      <h1 className="text-lg font-md text-gray-800">
        {" "}
        <Link to={"/"}>Hired Candidates</Link>
      </h1>
      <div className="flex items-center space-x-2">
        <button className="text-blue-600 font-medium hover:underline">
          <Link to={"/selected"}> Hired Candidates</Link>
        </button>
        <span className="bg-yellow-500 text-blue-700 text-sm font-semibold px-2.5 py-1 rounded-full">
          {hired?.length}/5
        </span>
      </div>
    </nav>
  );
};

export default Navbar;
