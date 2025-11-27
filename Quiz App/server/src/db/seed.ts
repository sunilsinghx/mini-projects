// src/seed.ts
import prisma from "./db.js";

async function main() {
  await prisma.question.deleteMany({});
  console.log("🗑️ Existing questions deleted.");
  
  const questions = [
    {
      text: "What is the capital of France?",
      options: ["Paris", "London", "Berlin", "Madrid"],
      answerIdx: 0,
    },
    {
      text: "Which planet is known as the Red Planet?",
      options: ["Earth", "Mars", "Jupiter", "Venus"],
      answerIdx: 1,
    },
    {
      text: "Who wrote 'Romeo and Juliet'?",
      options: ["Shakespeare", "Hemingway", "Tolkien", "Dickens"],
      answerIdx: 0,
    },
    {
      text: "What is 2 + 2?",
      options: ["3", "4", "5", "6"],
      answerIdx: 1,
    },
    {
      text: "Which language runs in a web browser?",
      options: ["Python", "C++", "JavaScript", "Java"],
      answerIdx: 2,
    },
    {
      text: "Which ocean is the largest?",
      options: ["Atlantic", "Indian", "Pacific", "Arctic"],
      answerIdx: 2,
    },
    {
      text: "What color do you get by mixing red and blue?",
      options: ["Purple", "Green", "Orange", "Brown"],
      answerIdx: 0,
    },
    {
      text: "Which country is famous for sushi?",
      options: ["China", "Japan", "Thailand", "Korea"],
      answerIdx: 1,
    },
    {
      text: "How many continents are there?",
      options: ["5", "6", "7", "8"],
      answerIdx: 2,
    },
    {
      text: "What is the largest mammal?",
      options: ["Elephant", "Blue Whale", "Giraffe", "Hippo"],
      answerIdx: 1,
    },
  ];

  for (const q of questions) {
    await prisma.question.create({
      data: q,
    });
  }

  console.log("✅ 10 quiz questions inserted successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
