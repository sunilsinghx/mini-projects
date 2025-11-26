import { Router } from "express";
import prisma from "../db/db.js";

const router = Router();

router.get("/questions", async (_, res) => {
  try {
    const questions = await prisma.question.findMany({
      select: { id: true, text: true, options: true },
    });

    res.json(questions);
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.post("/submit", async (req, res) => {
  try {
    const { answers } = req.body; // { questionId: number, selectedIdx: number }[]

    const questions = await prisma.question.findMany();

    let score = 0;
    const detailedResults = [];

    for (const q of questions) {
      const user = answers.find((a: any) => a.questionId === q.id);
      const correct = user?.selectedIdx === q.answerIdx;

      detailedResults.push({
        questionId: q.id,
        correct,
        correctIdx: q.answerIdx,
        selectedIdx: user?.selectedIdx ?? null,
      });

      if (correct) score++;
    }

    res.json({ score, total: questions.length, detailedResults });
  } catch (error) {
    console.log(error);
    
    res.status(500).json({ error });
  }
});

export default router