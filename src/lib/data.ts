import raw from '../data/questions.json'
import type { Difficulty, QuizQuestion } from '../types/quiz'
import { shuffle } from './shuffle'

const ALL: QuizQuestion[] = (raw as QuizQuestion[]).filter(
  q =>
    q &&
    typeof q.id === 'string' &&
    typeof q.question === 'string' &&
    Array.isArray(q.options) &&
    q.options.length === 4 &&
    typeof q.correctAnswer === 'string' &&
    (q.difficulty === 'easy' || q.difficulty === 'medium' || q.difficulty === 'hard')
)

export function loadQuestionsLocal(): QuizQuestion[] {
  return ALL
}

export function filterByDifficulty(list: QuizQuestion[], diff: Difficulty): QuizQuestion[] {
  return list.filter(q => q.difficulty === diff)
}

export function pickRandomN<T>(arr: T[], n: number): T[] {
  const a = shuffle(arr)
  return a.slice(0, Math.max(0, Math.min(n, a.length)))
}

/** Selects N questions by difficulty, shuffles options for each, and returns */
export function selectQuestions(diff: Difficulty, count: number): QuizQuestion[] {
  const base = filterByDifficulty(loadQuestionsLocal(), diff)
  const picked = pickRandomN(base, count)
  return picked.map(q => ({
    ...q,
    options: shuffle(q.options)
  }))
}
