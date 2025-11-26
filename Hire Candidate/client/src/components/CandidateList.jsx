import React, { useEffect, useState } from "react";
import CandidateCard from "./CandidateCard";
import { useCandidate } from "../context/CandidateProvider";
import FilterBar from "./FilterBar";

const CandidateList = () => {
  const { getCandidates, candidates } = useCandidate();

  useEffect(() => {
    
    getCandidates();
  }, []);

  return (
    <div>
      <FilterBar />
      <p className="text-md ml-6">Total Candidates: {candidates?.length}</p>

      {candidates?.length === 0 && (
        <div className="w-full min-h-[70vh] flex justify-center items-center">
          <span className="text-gray-500 text-xl font-semibold">
            "No Candidates Found"
          </span>

        </div>
      )}
      <div className="flex flex-wrap gap-4 m-5">
        {candidates?.map((c) => {
          return <CandidateCard key={c.id} candidate={c} />;
        })}
      </div>
    </div>
  );
};

export default CandidateList;
