import { useEffect, useRef, useState } from 'react'

type Props = {
  seconds: number
  keyRef: number
  onExpire: () => void
}
export default function Timer({ seconds, keyRef, onExpire }: Props) {
  const [left, setLeft] = useState(seconds)
  const called = useRef(false)

  useEffect(() => { setLeft(seconds); called.current = false }, [seconds, keyRef])

  useEffect(() => {
    if (left <= 0) {
      if (!called.current) {
        called.current = true
        onExpire()
      }
      return
    }
    const id = setInterval(() => setLeft(t => t - 1), 1000)
    return () => clearInterval(id)
  }, [left, onExpire])

  const pct = Math.max(0, Math.min(100, Math.round((left / seconds) * 100)))

  return (
    <div aria-label="Timer" className="mb-4">
      <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
        <span>Time Left</span>
        <span className="tabular-nums">{left}s</span>
      </div>
      <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
        <div className="h-2 bg-emerald-600 transition-all" style={{ width: `${pct}%` }} />
      </div>
    </div>
  )
}
