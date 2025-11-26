const oecdCountries = [
  "Australia", "Austria", "Belgium", "Canada","UK", "Chile", "Colombia", "Czech Republic",
  "Denmark", "Estonia", "Finland", "France", "Germany", "Greece", "Hungary", "Iceland",
  "Ireland", "Israel", "Italy", "Japan", "Korea", "Latvia", "Lithuania", "Luxembourg",
  "Mexico", "Netherlands", "New Zealand", "Norway", "Poland", "Portugal", "Slovak Republic",
  "Slovenia", "Spain", "Sweden", "Switzerland", "Turkey", "United Kingdom", "United States"
];
export function filterCandidate(
  candidate,
  {
    location,
    skill,
    availability,
    topSchoolOnly,
    maxSalary,
    keywordInRoles,
    diversity
  }
) {

  try {
    if (!candidate) return false;

    const salary = parseInt(
      candidate.annual_salary_expectation?.["full-time"]?.replace(/\D/g, "")
    ) || 0;

    const locationMatch =
      !location ||
      (candidate.location &&
        candidate.location.toLowerCase().includes(location.toLowerCase()));

    const skillMatch =
      !skill ||
      candidate.skills?.some((s) =>
        s?.toLowerCase().includes(skill.toLowerCase())
      );

    const availabilityMatch =
      !availability ||
      candidate.work_availability?.includes(availability);

    const topSchoolMatch =
      !topSchoolOnly ||
      candidate.education?.degrees?.some((d) => d.isTop50 === true);

    const salaryMatch =
      !maxSalary || salary <= parseInt(maxSalary);

    const roleMatch =
      !keywordInRoles ||
      candidate.work_experiences?.some((exp) =>
        exp.roleName?.toLowerCase().includes(keywordInRoles.toLowerCase())
      );

    const candidateCountry = candidate?.location?.toLowerCase();
    const isOECD = oecdCountries.some((c) =>
      candidateCountry?.includes(c.toLowerCase())
    );

    
    const diversityMatch = !diversity || !isOECD;
      

    return (
      locationMatch &&
      skillMatch &&
      availabilityMatch &&
      topSchoolMatch &&
      salaryMatch &&
      roleMatch && diversityMatch
    );
  } catch (error) {
    console.error("ERROR in filterCandidate:", error);
    return false;
  }

}

export function diversityMarks(candidate) {
  if (!candidate) return 0;



  let marks = 0;

  // 1. Subjects
  const subjects = new Set(
    candidate.education?.degrees
      ?.map((d) => d.subject?.toLowerCase())
      .filter(Boolean)
  );
  marks += subjects.size * 2;

  // 2. Unique roles
  const roles = new Set(
    candidate.work_experiences
      ?.map((exp) => exp.roleName?.toLowerCase())
      .filter(Boolean)
  );
  marks += roles.size * 1.5;

  // 3. Skills count
  marks += (candidate.skills?.length || 0) * 1;

  // 4. Education level
  const level = candidate.education?.highest_level?.toLowerCase() || "";
  if (level.includes("phd")) marks += 6;
  else if (level.includes("master")) marks += 4;
  else if (level.includes("bachelor")) marks += 2;

  // 5. OECD country
  const location = candidate.location?.toLowerCase() || "";
  const isOECD = oecdCountries.some((c) =>
    location.includes(c.toLowerCase())
  );
  if (!isOECD) marks += 3;

  return marks;

}

export function filterAndRankCandidates(candidates, {
    location,
    skill,
    availability,
    topSchoolOnly,
    maxSalary,
    keywordInRoles,
    diversity
  }){
   
    
    const filtered = candidates.filter(c=> filterCandidate(c,{ location,
        skill,
        availability,
        topSchoolOnly,
        maxSalary,
        keywordInRoles,
        diversity
      }))



        //sort in desc with respect to Diversity Score
        if(diversity)
        {
            return filtered.map((candidate)=>(candidate)).sort((a,b)=> b.diversityScore - a.diversityScore)
        }

        return filtered
}