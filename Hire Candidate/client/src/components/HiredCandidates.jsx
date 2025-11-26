import React from 'react'
import CandidateCard from './CandidateCard';
import { useCandidate } from '../context/CandidateProvider';

const HiredCandidates = () => {
  const { hired } = useCandidate();


  return (
    <div>
      <p className="text-md ml-6 mt-5">Total Candidates: {hired?.length}</p>

      {hired?.length === 0 && (
        <div className="w-full min-h-[70vh] flex justify-center items-center">
          <span className="text-gray-500 text-xl font-semibold">
            No Candidates Found
          </span>

        </div>
      )}
      <div className="flex flex-wrap gap-4 m-5">
        {hired?.map((c) => {
          return <CandidateCard key={c.id} candidate={c} />;
        })}
      </div>
    </div>
  );
}

export default HiredCandidates