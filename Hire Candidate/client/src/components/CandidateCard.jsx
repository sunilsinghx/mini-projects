import React, { useState } from "react";
import { useCandidate } from "../context/CandidateProvider";

const CandidateCard = ({ candidate }) => {
  const [showHired, setShowHired] = useState(false);

  const { hireCandidate, hired } = useCandidate();

  async function onHireSuccess(id) {
    if (showHired || candidate.isHired || hired?.length >= 5) return;

    const res = await hireCandidate(id);

    if (res?.success) {
      setShowHired(true);
    }
  }

  if (!candidate) return;
  return (
    <div
      className="border border-gray-300 p-3 max-w-md w-full rounded-lg shadow-md mb-4 overflow-hidden break-words bg-gray-50
"
    >
      <div className="flex justify-between mb-2">
        <h3>Name: {candidate.name}</h3>
        <p>📍{candidate.location}</p>
      </div>
      <p>Availability: {candidate.work_availability.join(",")}</p>
      <div className="flex items-center">
        Skills:{" "}
        <div className="flex flex-wrap gap-2  m-3">
          {candidate?.skills?.map((skill, idx) => (
            <span
              key={idx}
              className="text-xs bg-blue-400 text-gray-50 px-2 py-1 rounded-full"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
      <p>
        Salary Expection:{" "}
        {candidate.annual_salary_expectation?.["full-time"].toLocaleString(
          "en-US",
          { style: "currency", currency: "USD" }
        ) || "NA"}
      </p>
      <p>Diversity Score: {candidate.diversityScore}</p>
      <button
        className={`px-5 py-2 rounded mt-4 text-white hover:bg-indigo-600 ${
          showHired || candidate.isHired ? "bg-green-500" : "bg-indigo-500"
        }`}
        onClick={() => onHireSuccess(candidate.id)}
      >
        {showHired || candidate.isHired ? "Hired" : "Hire"}
      </button>
    </div>
  );
};

export default CandidateCard;
