export default function ScorePill({ score }: { score: number }) {
  return (
    <div className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-sm font-semibold">
      Score: {score}
    </div>
  )
}
