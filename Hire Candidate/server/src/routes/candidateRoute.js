import express from "express"
import { filterCandidates,getAllCandidates,getHiredCandidates,hireCandidate, unHireCandidate } from "../controllers/candidatesController.js"

const router = express.Router()

router.get("/",getAllCandidates)
router.post("/",hireCandidate)
router.post("/unhire",unHireCandidate)
router.post("/filter",filterCandidates)
router.get("/selected",getHiredCandidates)

export default router