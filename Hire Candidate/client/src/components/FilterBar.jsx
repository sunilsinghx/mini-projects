import React, { useState } from "react";
import { useCandidate } from "../context/CandidateProvider";

const FilterBar = () => {

    const [filters, setFilters] = useState({
    location: "",
    skill: "",
    availability: "",
    topSchoolOnly: false,
    maxSalary: "",
    keywordInRoles: "",
    diversity: false,
  });

  const {filterCandidate,getCandidates} = useCandidate()


  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    

    setFilters((prev) => {
      return { ...prev, [name]: type === "checkbox" ? checked : value,};
    });
  };

  const clickHandler=async(e,type)=>{

        if(type === "filter")
        {
           filterCandidate(filters)       

        }else if(type === "reset")
        {
            setFilters(
                {
                location: "",
                skill: "",
                availability: "",
                topSchoolOnly: false,
                maxSalary: "",
                keywordInRoles: "",
                diversity: false
              }
            )
            getCandidates()
        }

  }



  return (
    <div className="m-5">
      <div className="flex flex-wrap gap-4 mb-6">
        <input
        name="location"
          type="text"
          placeholder="Location"
          value={filters.location}
          onChange={handleChange}
          className="border border-gray-300 rounded px-3 py-2 w-48"
        />
        <input
        name="skill"
          type="text"
          placeholder="Skills (eg. Python,JS..)"
          value={filters.skill}
          onChange={handleChange}
          className="border border-gray-300 rounded px-3 py-3 w-48"
        />

        <select
        name="availability"
          value={filters.availability}
          onChange={handleChange}
          className="border border-gray-300 rounded px-3 py-3 w-48"
        >
          <option value="">Any Availability</option>
          <option value="full-time">Full-time</option>
          <option value="part-time">Part-time</option>
        </select>
        <input
          type="number"
          name="maxSalary"
          placeholder="Max Salary"
          value={filters.maxSalary}
          onChange={handleChange}
          className="border border-gray-300 rounded px-3 py-3 w-48"
        />
        <input
          type="text"
          name="keywordInRoles"
          placeholder="Keyword in Experience (e.g. PM)"
          value={filters.keywordInRoles}
          onChange={handleChange}
          className="border border-gray-300 rounded px-3 py-2 w-60"
        />

        <label className="flex items-center gap-2 w-60">
          <input
            type="checkbox"
            name="topSchoolOnly"
            checked={filters.topSchoolOnly}
            onChange={handleChange}
            className="form-checkbox h-4 w-4 text-blue-600"
          />
          <span className="text-sm">Top 50 Schools Only</span>
        </label>
        <label className="flex items-center gap-2 w-60">
          <input
            type="checkbox"
            name="diversity"
            checked={filters.diversity}
            onChange={handleChange}
            className="form-checkbox h-4 w-4 text-blue-600"
          />
          <span className="text-sm">Diversity </span>
        </label>
        
      <button onClick={e=>clickHandler(e,"filter")} className="p-2 px-5 bg-green-500 text-white hover:bg-green-600">Go</button>
      <button onClick={e=>clickHandler(e,"reset")}
        className="p-2 px-5 bg-gray-600 text-white hover:bg-gray-700"
        >Reset</button>
      </div>
    </div>
  );
};

export default FilterBar;
