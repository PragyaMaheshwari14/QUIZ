import { test, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import QuestionCard from '../components/QuestionCard'
import type { QuizQuestion } from '../types/quiz'

const q: QuizQuestion = {
  id: 't1',
  question: 'Pick one?',
  options: ['A','B','C','D'],
  correctAnswer: 'A',
  difficulty: 'easy'
}

test('select with keyboard', async () => {
  const user = userEvent.setup()
  const onSelectIndex = vi.fn()
  render(<QuestionCard question={q} selectedIndex={null} onSelectIndex={onSelectIndex} />)

  const options = screen.getAllByRole('radio')
  expect(options).toHaveLength(4)

  await user.keyboard('{ArrowDown}')
  await user.keyboard('{Enter}')
  expect(onSelectIndex).toHaveBeenCalled()
})
