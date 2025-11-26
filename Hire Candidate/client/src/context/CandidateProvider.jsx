import { createContext, useContext, useState } from "react";

const candidateContext = createContext(null);

export default function CandidateProvider({ children } = {}) {
  const [candidates, setCandidates] = useState([]);
  const [hired, setHired] = useState([]);

  async function getCandidates() {
    try {
      const res = await (
        await fetch(`${import.meta.env.VITE_BACKEND_URL}`)
      ).json();

      setCandidates(res.candidates);
    } catch (error) {
      console.log(error);
    }
  }

  async function filterCandidate({
    location,
    skill,
    availability,
    topSchoolOnly = false,
    maxSalary,
    keywordInRoles,
    diversity = false,
  }) {
    try {
      const res = await (
        await fetch(`${import.meta.env.VITE_BACKEND_URL}/filter`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json", // <-- Required to send JSON
          },
          body: JSON.stringify({
            location,
            skill,
            availability,
            topSchoolOnly,
            maxSalary,
            keywordInRoles,
            diversity,
          }),
        })
      ).json();

      setCandidates(res?.candidates);
    } catch (error) {
      console.log("Error: ", error);
    }
  }

  async function getSelectedCandidates() {
    try {
      const res = await (
        await fetch(`${import.meta.env.VITE_BACKEND_URL}/selected`)
      ).json();
      if (res?.candidates) {
        setHired(res.candidates);
      }
    } catch (error) {
      console.log("error", error);
    }
  }

  async function hireCandidate(id) {
    try {
      const res = await (
        await fetch(`${import.meta.env.VITE_BACKEND_URL}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id }),
        })
      ).json();

      if (res?.success) {
        await getSelectedCandidates();
      }
      return res;
    } catch (error) {
      console.log("Error", error);
    }
  }
  async function UnHireCandidate(id) {
    try {
      const res = await (
        await fetch(`${import.meta.env.VITE_BACKEND_URL}/unhire`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id }),
        })
      ).json();

      if (res?.success) {
        await getSelectedCandidates();
      }
      return res;
    } catch (error) {
      console.log("Error", error);
    }
  }

  return (
    <candidateContext.Provider
      value={{
        candidates,
        getCandidates,
        filterCandidate,
        setCandidates,
        getSelectedCandidates,
        hireCandidate,
        hired,
        setHired,
        UnHireCandidate,
      }}
    >
      {children}
    </candidateContext.Provider>
  );
}

export const useCandidate = () => useContext(candidateContext);
