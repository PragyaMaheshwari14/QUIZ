import { useNavigate } from "react-router-dom";
import { useState } from "react";
import type { Difficulty } from "../types/quiz";
import { selectQuestions } from "../lib/data";
import { useQuiz } from "../lib/store";

export default function Home() {
  const navigate = useNavigate();
  const { dispatch } = useQuiz();

  const [difficulty, setDifficulty] = useState<Difficulty>("easy");
  const [count, setCount] = useState<number>(5);
  const [timer, setTimer] = useState<number>(30);

  const start = () => {
    const questions = selectQuestions(difficulty, count);
    if (questions.length < count) {
      alert(
        `Only ${questions.length} questions available for ${difficulty}.`
      );
    }
    dispatch({
      type: "INIT",
      payload: { questions, timerSeconds: timer, difficulty },
    });
    navigate("/quiz");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8 bg-gradient-to-br from-purple-50 via-white to-purple-100">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6 space-y-6">
        {/* Title */}
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-purple-700">Quiz App</h1>
          <p className="text-gray-500 mt-2 text-sm">
            Choose your options and start the quiz. Data is local — works
            offline.
          </p>
        </div>

        {/* Difficulty */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Difficulty
          </label>
          <div className="grid grid-cols-3 gap-2">
            {(["easy", "medium", "hard"] as const).map((d) => (
              <button
                key={d}
                onClick={() => setDifficulty(d)}
                className={`px-3 py-2 rounded-lg font-medium capitalize transition-all
                  ${
                    difficulty === d
                      ? "bg-purple-600 text-white shadow-md"
                      : "bg-gray-100 text-gray-700 hover:bg-purple-100"
                  }`}
                aria-pressed={difficulty === d}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        {/* Question Count */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Number of Questions
          </label>
          <input
            type="number"
            min={5}
            max={10}
            value={count}
            onChange={(e) =>
              setCount(Math.max(5, Math.min(10, Number(e.target.value))))
            }
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
          />
          <p className="text-xs text-gray-400 mt-1">(Range: 5–10)</p>
        </div>

        {/* Timer */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Timer per Question
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[10, 20, 30].map((t) => (
              <button
                key={t}
                onClick={() => setTimer(t)}
                className={`px-3 py-2 rounded-lg font-medium transition-all
                  ${
                    timer === t
                      ? "bg-green-500 text-white shadow-md"
                      : "bg-gray-100 text-gray-700 hover:bg-green-100"
                  }`}
                aria-pressed={timer === t}
              >
                {t}s
              </button>
            ))}
          </div>
        </div>

        {/* Start Button */}
        <div className="pt-2">
          <button
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg shadow-md transition-all"
            onClick={start}
          >
            Start Quiz 🚀
          </button>
        </div>
      </div>
    </div>
  );
}
