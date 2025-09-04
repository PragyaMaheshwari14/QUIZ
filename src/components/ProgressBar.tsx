export default function ProgressBar({ current, total }: { current: number; total: number }) {
  const pct = total > 0 ? Math.round(((current + 1) / total) * 100) : 0
  return (
    <div aria-label="Progress" className="mb-4">
      <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
        <span>Question {current + 1} of {total}</span>
        <span>{pct}%</span>
      </div>
      <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
        <div className="h-2 bg-blue-600 transition-all" style={{ width: `${pct}%` }} />
      </div>
    </div>
  )
}
