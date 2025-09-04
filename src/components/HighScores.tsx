import { getHighScores } from '../lib/storage'

export default function HighScores() {
  const scores = getHighScores()
  if (!scores || Object.keys(scores).length === 0) {
    return <p className="text-sm text-gray-500">No high scores yet. Be the first!</p>
  }
  return (
    <div className="space-y-2">
      {(['easy','medium','hard'] as const).map(d => {
        const s = scores[d]
        return (
          <div key={d} className="flex items-center justify-between rounded-lg border p-3 bg-white">
            <div className="text-sm">
              <div className="font-semibold capitalize">{d}</div>
              <div className="text-gray-500 text-xs">{s?.dateISO ? new Date(s.dateISO).toLocaleString() : ''}</div>
            </div>
            <div className="text-sm">
              {s ? <span className="font-semibold">{s.bestScore}/{s.total}</span> : <span className="text-gray-500">—</span>}
            </div>
          </div>
        )
      })}
    </div>
  )
}
