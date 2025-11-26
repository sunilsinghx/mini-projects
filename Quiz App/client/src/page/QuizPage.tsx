import { useEffect, useState } from "react";
import { Answer, Question } from "../types/question";
import { useNavigate } from "react-router-dom";
import { useTimer } from "../hooks/useTimer";
import QuestionCard from "../components/QuestionCard";

const QuizPage = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();

  const timeLeft = useTimer(60);

  //auto-submit whem timer hit 0
  useEffect(() => {
    if (timeLeft === 0) handleSubmit();
  }, [timeLeft]);

  // load questions
  useEffect(() => {
    
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/quiz/questions`)
      .then((r) => r.json())
      .then((data: Question[]) => {
        setQuestions(data);
        setAnswers(data.map((q) => ({ questionId: q.id, selectedIdx: null })));
      });
  }, []);

  const handleSelect = (idx: number) => {
    setAnswers((prev) => {
      const updated = [...prev];
      updated[index].selectedIdx = idx;
      return updated;
    });
  };

  const handleSubmit = async () => {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/quiz/submit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ answers }),
    });

    const data = await res.json();
    navigate("/result", { state: {data,questions} });
  };

  if (questions.length === 0) return <p>Loading....</p>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
  {/* Container */}
  <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-3xl flex flex-col gap-6">
    {/* Timer */}
    <h3 className="text-lg font-semibold text-gray-700 text-right">
      Time left: {timeLeft}s
    </h3>

    {/* Question Card */}
    <QuestionCard
      question={questions[index]}
      selectedIdx={answers[index].selectedIdx}
      onSelect={handleSelect}
    />

    {/* Navigation Buttons */}
    <div className="flex justify-between mt-4">
      <button
        disabled={index === 0}
        onClick={() => setIndex((i) => i - 1)}
        className={`px-6 py-2 rounded-lg font-semibold shadow-md transition 
        ${index === 0 ? "bg-gray-300 cursor-not-allowed" : "bg-orange-600 text-white hover:bg-orange-700"}`}
      >
        Previous
      </button>

      <div className="flex gap-4">
        {index !== questions.length - 1 && (
          <button
            onClick={() => setIndex((i) => i + 1)}
            className="px-6 py-2 rounded-lg font-semibold shadow-md bg-purple-600 text-white hover:bg-purple-700 transition"
          >
            Next
          </button>
        )}

        {index === questions.length - 1 && (
          <button
            onClick={handleSubmit}
            className="px-6 py-2 rounded-lg font-semibold shadow-md bg-green-500 text-white hover:bg-green-600 transition"
          >
            Submit
          </button>
        )}
      </div>
    </div>
  </div>
</div>

  );
};

export default QuizPage;
