import { Link, useLocation } from "react-router-dom";

const ResultPage = () => {
  const { state } = useLocation();
  const { data, questions } = state;

  return (
    <div className="max-w-3xl md:mx-auto p-6 bg-gray-100 min-h-screen ">
      <h1 className="text-3xl font-bold mb-4">
        Your Score: {data.score} / {data.total}
      </h1>

      <Link to="/">
        <button className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition mb-6">
          Restart
        </button>
      </Link>

      <h2 className="text-2xl font-semibold mb-4">Details</h2>

      {data.detailedResults.map((r: any) => {
        const q = questions.find((q: any) => q.id === r.questionId);

        return (
          <div
            key={r.questionId}
            className="mb-6 p-4 bg-white rounded-xl shadow-sm"
          >
            {/* Question */}
            <p className="font-semibold mb-2">
              Question {r.questionId}: {q?.text}{" "}
              {r.correct ? (
                <span className="text-green-600">✅ Correct</span>
              ) : (
                <span className="text-red-600">❌ Wrong</span>
              )}
            </p>

            {/* Options */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {q?.options.map((opt: string, idx: number) => {
                const isCorrect = idx === r.correctIdx;
                const isSelectedWrong =
                  !r.correct && idx === r.selectedIdx && idx !== r.correctIdx;

                return (
                  <div
                    key={idx}
                    className={`p-3 border rounded-lg text-left font-medium ${
                      isCorrect
                        ? "bg-green-100 border-green-400 text-green-800"
                        : isSelectedWrong
                        ? "bg-red-100 border-red-400 text-red-800"
                        : "bg-gray-50 border-gray-200 text-gray-700"
                    }`}
                  >
                    {opt}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ResultPage;
