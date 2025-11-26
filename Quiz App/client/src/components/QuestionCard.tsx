import { Question } from "../types/question";

interface Props {
  question: Question;
  selectedIdx: number | null;
  onSelect: (idx: number) => void;
}

const QuestionCard = ({ question, selectedIdx, onSelect }: Props) => {
  return (
    <div className="flex flex-col gap-6">
      {/* Question Text */}
      <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
        {question.text}
      </h2>

      {/* Options Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {question.options.map((opt, idx) => (
          <button
            key={idx}
            onClick={() => onSelect(idx)}
            className={`p-4 border rounded-lg shadow-sm text-left font-medium transition
          ${
            selectedIdx === idx
              ? "bg-blue-400 border-blue-700 text-white"
              : "bg-white hover:bg-blue-50 border-gray-300"
          }`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;
