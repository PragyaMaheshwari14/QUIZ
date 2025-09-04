import { getHighScores } from "../lib/storage";

type Row = {
  difficulty: "easy" | "medium" | "hard";
  bestScore: number;
  total: number;
  dateISO: string | null;
};

export default function Leaderboard() {
  const hs = getHighScores();

  const rows: Row[] = (["easy", "medium", "hard"] as const).map((d) => ({
    difficulty: d,
    bestScore: hs[d]?.bestScore ?? 0,
    total: hs[d]?.total ?? 0,
    dateISO: hs[d]?.dateISO ?? null,
  }));

  // Sort by percentage desc, then score desc
  rows.sort((a, b) => {
    const pa = a.total ? a.bestScore / a.total : 0;
    const pb = b.total ? b.bestScore / b.total : 0;
    if (pb !== pa) return pb - pa;
    return b.bestScore - a.bestScore;
  });

  // Colors per difficulty
  const colorMap: Record<string, string> = {
    easy: "from-green-50 to-green-100 border-green-200",
    medium: "from-blue-50 to-blue-100 border-blue-200",
    hard: "from-red-50 to-red-100 border-red-200",
  };

  return (
    <div className="section slide-up space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <h1 className="text-3xl font-bold text-gray-800">Leaderboard</h1>
      </div>

      {/* Desktop / Laptop → Horizontal Fancy Cards */}
      <div className="hidden md:grid md:grid-cols-3 gap-8">
        {rows.map((r, i) => {
          const pct = r.total ? Math.round((r.bestScore / r.total) * 100) : 0;

          return (
            <div
              key={r.difficulty}
              className={`rounded-3xl shadow-xl p-6 border bg-gradient-to-br ${colorMap[r.difficulty]} flex flex-col justify-between min-h-[240px]`}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-bold text-xl capitalize text-gray-800">
                  #{i + 1} • {r.difficulty}
                </h2>
                <span className="px-3 py-1 rounded-full text-sm font-medium bg-white/70 text-gray-800 shadow">
                  {pct}%
                </span>
              </div>
              <p className="text-gray-700 mb-2 text-lg">
                <span className="font-semibold">{r.bestScore}</span> / {r.total} correct
              </p>
              <p className="text-sm text-gray-500">
                {r.dateISO
                  ? new Date(r.dateISO).toLocaleString()
                  : "No attempts yet"}
              </p>
            </div>
          );
        })}

        {rows.every((r) => r.total === 0) && (
          <p className="col-span-3 text-center text-gray-500 py-6">
            No scores yet. Play a quiz to appear on the board.
          </p>
        )}
      </div>

      {/* Mobile → Vertical Fancy Cards */}
      <div className="grid gap-6 md:hidden">
        {rows.map((r, i) => {
          const pct = r.total ? Math.round((r.bestScore / r.total) * 100) : 0;

          return (
            <div
              key={r.difficulty}
              className={`rounded-3xl shadow-lg p-5 border bg-gradient-to-br ${colorMap[r.difficulty]} space-y-3`}
            >
              <div className="flex justify-between items-center">
                <h2 className="font-semibold text-lg capitalize text-gray-800">
                  #{i + 1} • {r.difficulty}
                </h2>
                <span className="px-2 py-1 rounded-full text-xs font-medium bg-white/70 text-gray-800 shadow">
                  {pct}%
                </span>
              </div>
              <p className="text-sm text-gray-700">
                Score: <span className="font-medium">{r.bestScore}</span> / {r.total}
              </p>
              <p className="text-xs text-gray-500">
                {r.dateISO
                  ? new Date(r.dateISO).toLocaleString()
                  : "No attempts yet"}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
