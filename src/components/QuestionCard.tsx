import { useEffect, useRef, useState } from 'react'
import type { QuizQuestion } from '../types/quiz'
import OptionItem from './OptionItem'

type Props = {
  question: QuizQuestion
  selectedIndex: number | null
  onSelectIndex: (i: number) => void
  disabled?: boolean
}

export default function QuestionCard({ question, selectedIndex, onSelectIndex, disabled }: Props) {
  const [, setFocusIndex] = useState<number>(selectedIndex ?? 0)
  const liveRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (liveRef.current) {
      liveRef.current.textContent = `Question changed: ${question.question}`
    }
    setFocusIndex(selectedIndex ?? 0)
  }, [question.id, selectedIndex])

  const move = (dir: 'prev' | 'next') => {
    const last = Math.max(0, question.options.length - 1)
    setFocusIndex(prev => {
      if (dir === 'prev') return prev <= 0 ? last : prev - 1
      return prev >= last ? 0 : prev + 1
    })
  }

  return (
    <div className="space-y-4">
      <div aria-live="polite" aria-atomic="true" className="sr-only" ref={liveRef} />
      <p className="text-lg font-semibold">{question.question}</p>
      <div role="radiogroup" aria-label="Options" className="grid gap-2">
        {question.options.map((opt, i) => (
          <OptionItem
            key={i}
            label={opt}
            index={i}
            isActive={selectedIndex === i}
            isDisabled={disabled}
            onSelect={onSelectIndex}
            onMove={move}
          />
        ))}
      </div>
    </div>
  )
}
