import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useQuiz } from "../lib/store";
import ProgressBar from "../components/ProgressBar";
import QuestionCard from "../components/QuestionCard";
import ScorePill from "../components/ScrorePill";
import Timer from "../components/Timer";
import ErrorState from "../components/ErrorState";

export default function Quiz() {
  const { state, dispatch } = useQuiz();
  const navigate = useNavigate();

  const q = state.questions[state.currentIndex];
  const total = state.questions.length;

  useEffect(() => {
    if (total === 0) {
      navigate("/start");
      return;
    }
    if (state.finished) {
      navigate("/results");
    }
  }, [total, state.finished, navigate]);

  const selectedIndex = useMemo(() => {
    const rec = state.answers[q?.id];
    if (!rec || rec.selected == null)
      return rec?.status === "timeout" || rec?.status === "skipped"
        ? null
        : null;
    return q.options.indexOf(rec.selected);
  }, [state.answers, q]);

  if (total === 0) return null;

  const canNext = !!state.answers[q.id];

  const onSelectIndex = (i: number) => {
    dispatch({
      type: "SELECT",
      payload: { questionId: q.id, selected: q.options[i] },
    });
  };

  const onSkip = () => {
    dispatch({ type: "SKIP", payload: { questionId: q.id } });
    dispatch({ type: "NEXT" });
  };

  const onTimeout = () => {
    if (!state.answers[q.id]) {
      dispatch({ type: "TIMEOUT", payload: { questionId: q.id } });
    }
    dispatch({ type: "NEXT" });
  };

  const next = () => {
    if (!canNext) return;
    if (state.currentIndex + 1 < total) {
      dispatch({ type: "NEXT" });
    } else {
      dispatch({ type: "FINISH" });
      navigate("/results");
    }
  };

  const prev = () => {
    dispatch({ type: "PREV" });
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="text-sm text-gray-600">
          Difficulty:{" "}
          <span className="capitalize font-medium text-gray-800">
            {state.difficulty}
          </span>
        </div>
        <ScorePill score={state.score} />
      </div>

      {/* Progress */}
      <ProgressBar current={state.currentIndex} total={total} />

      {/* Timer */}
      <div className="flex justify-center">
        <Timer
          keyRef={state.currentIndex}
          seconds={state.timerSeconds}
          onExpire={onTimeout}
        />
      </div>

      {/* Question */}
      {!q ? (
        <ErrorState message="Question not found." />
      ) : (
        <QuestionCard
          question={q}
          selectedIndex={selectedIndex}
          onSelectIndex={onSelectIndex}
          disabled={
            !!state.answers[q.id] &&
            state.answers[q.id].status === "timeout"
          }
        />
      )}

      {/* Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
        <button
          onClick={prev}
          disabled={state.currentIndex === 0}
          className="btn btn-secondary w-full"
        >
          Previous
        </button>
        <button onClick={onSkip} className="btn btn-secondary w-full">
          Skip
        </button>
        <button
          onClick={next}
          disabled={!canNext}
          className="btn btn-primary w-full"
        >
          {state.currentIndex + 1 === total ? "Finish" : "Next"}
        </button>
      </div>

      {/* Hint */}
      <p className="text-xs text-gray-500 text-center">
        💡 Keyboard shortcuts: ↑/↓ or ←/→ to move, Enter/Space to select
      </p>
    </div>
  );
}
