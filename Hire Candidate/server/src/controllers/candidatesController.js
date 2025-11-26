// src/controllers/candidatesController.js
import { randomUUID } from "crypto";
import { readFile, writeFile } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { diversityMarks, filterAndRankCandidates } from "../utils/filter.js";
import db from "../../db.js";
import { writeFileSync } from "fs";

// Helper to get __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load JSON file
const candidatesPath = path.resolve(__dirname, "../../form-submissions.json");
const data = await readFile(candidatesPath, "utf-8");
let candidates = JSON.parse(data);

async function saveCandidatesToFile() {
  await writeFile(candidatesPath, JSON.stringify(candidates, null, 2), "utf-8");
}

// GET all candidates
export const getAllCandidates = async (req, res) => {
  try {
    // #TODO : To Add pagination

    return res.status(200).json({
      total: candidates.length,
      candidates,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// FILTER candidates (e.g., skill or location)
export const filterCandidates = async (req, res) => {
  try {
    const {
      location,
      skill,
      availability,
      topSchoolOnly,
      maxSalary,
      keywordInRoles,
      diversity,
    } = req.body;

    console.log(req.body);

    console.log(
      location,
      skill,
      availability,
      topSchoolOnly,
      maxSalary,
      keywordInRoles,
      diversity
    );

    let filtered = filterAndRankCandidates(candidates, {
      location,
      skill,
      availability,
      topSchoolOnly,
      maxSalary,
      keywordInRoles,
      diversity,
    });

    return res
      .status(200)
      .json({ size: filtered.length, candidates: filtered });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// HIRE a candidate (mock logic)
export const hireCandidate = async (req, res) => {
  try {
    const { id } = req.body;

    const candidate = candidates.find((c) => c.id === id);
    if (!candidate) {
      return res.status(404).json({ error: "Candidate not found" });
    }
    candidate.isHired = true;

    await db.read();

    db.data.candidates.push({ ...candidate, isHired: true });

    await db.write(); //save to  json db

    await saveCandidatesToFile(); // update orignal json file

    res.status(201).json({ candidate, success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json("Inside HireCandidate: ", error);
  }
};

// GET hired candidates
export const getHiredCandidates = async (req, res) => {
  try {
    await db.read();

    const hiredCandidates = db.data.candidates || [];

    return res.status(200).json({ candidates: hiredCandidates });
  } catch (error) {
    res.status(500).json("Inside getHiredCandidates: ", error);
  }
};

export const unHireCandidate = async (req, res) => {
  try {
    const { id } = req.body;

    // Check if candidate exists in original list
    const candidate = candidates.find((c) => c.id === id);
    if (!candidate) {
      return res.status(404).json({ error: "Candidate not found" });
    }

    // Update original candidate list
    candidate.isHired = false;

    // Update lowdb
    await db.read();

    db.data.candidates = db.data.candidates.filter((c) => c.id !== id);

    await db.write();

    await saveCandidatesToFile();

    return res.status(200).json({
      success: true,
      message: "Candidate un-hired successfully",
      candidate,
    });
  } catch (error) {
    console.error("Inside unhireCandidate:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
