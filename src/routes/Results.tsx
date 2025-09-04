import { useNavigate } from "react-router-dom";
import { useQuiz } from "../lib/store";

export default function Results() {
  const { state, dispatch } = useQuiz();
  const navigate = useNavigate();
  const total = state.questions.length;

  if (total === 0) {
    return (
      <div className="max-w-lg mx-auto bg-white shadow-lg rounded-2xl p-8 text-center">
        <p className="mb-6 text-gray-600">No results available.</p>
        <button
          className="px-6 py-3 rounded-xl bg-indigo-600 text-white font-semibold shadow hover:bg-indigo-700 transition"
          onClick={() => navigate("/")}
        >
          Go Home
        </button>
      </div>
    );
  }

  const restart = () => {
    dispatch({ type: "RESET" });
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white px-4 py-10">
      {/* Main Card */}
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-3xl p-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <h2 className="text-3xl font-extrabold text-indigo-700 text-center sm:text-left">
            Quiz Results
          </h2>
          <div className="flex gap-3 justify-center">
            <button
              className="px-5 py-2 rounded-xl bg-gray-100 text-gray-700 font-medium shadow hover:bg-gray-200 transition"
              onClick={() => navigate("/quiz")}
            >
              Back
            </button>
            <button
              className="px-5 py-2 rounded-xl bg-indigo-600 text-white font-medium shadow hover:bg-indigo-700 transition"
              onClick={restart}
            >
              Restart
            </button>
          </div>
        </div>

        {/* Score */}
        <div className="text-center">
          <p className="text-lg text-gray-700">
            You scored{" "}
            <span className="font-bold text-indigo-700 text-xl">
              {state.score}
            </span>{" "}
            / {total}
          </p>
        </div>

        {/* Questions */}
        <ul className="grid gap-4 sm:grid-cols-2">
          {state.questions.map((q) => {
            const rec = state.answers[q.id];
            const isCorrect = rec?.status === "correct";

            return (
              <li
                key={q.id}
                className="p-5 bg-gray-50 border rounded-2xl shadow-sm hover:shadow-md transition"
              >
                <p className="font-semibold text-gray-800">{q.question}</p>
                <div className="mt-2 text-sm">
                  <span
                    className={`font-medium ${
                      isCorrect
                        ? "text-emerald-600"
                        : rec?.status === "skipped"
                        ? "text-yellow-600"
                        : rec?.status === "timeout"
                        ? "text-purple-600"
                        : "text-red-600"
                    }`}
                  >
                    {isCorrect
                      ? "✓ Correct"
                      : rec?.status === "skipped"
                      ? "⤼ Skipped"
                      : rec?.status === "timeout"
                      ? "⏲ Timeout"
                      : "✗ Incorrect"}
                  </span>
                </div>

                <div className="mt-1 text-gray-700 text-sm">
                  Your answer:{" "}
                  <span className="font-medium">
                    {rec?.selected ?? "—"}
                  </span>
                </div>

                {!isCorrect && (
                  <div className="text-gray-500 text-sm">
                    Correct:{" "}
                    <span className="font-medium">{q.correctAnswer}</span>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
