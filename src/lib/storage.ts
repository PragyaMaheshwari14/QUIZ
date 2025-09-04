import type { Difficulty } from '../types/quiz'

const KEY = 'quiz_high_scores_v1'

export type HighScore = {
  difficulty: Difficulty
  bestScore: number
  total: number
  dateISO: string
}

export type HighScoresMap = Partial<Record<Difficulty, HighScore>>

function safeParse<T>(s: string | null): T | null {
  try { return s ? (JSON.parse(s) as T) : null } catch { return null }
}

export function getHighScores(): HighScoresMap {
  if (typeof window === 'undefined') return {}
  return safeParse<HighScoresMap>(localStorage.getItem(KEY)) ?? {}
}

export function getHighScore(diff: Difficulty): HighScore | undefined {
  return getHighScores()[diff]
}

export function saveHighScore(diff: Difficulty, score: number, total: number) {
  if (typeof window === 'undefined') return
  const map = getHighScores()
  const prev = map[diff]
  if (!prev || score > prev.bestScore) {
    map[diff] = { difficulty: diff, bestScore: score, total, dateISO: new Date().toISOString() }
    localStorage.setItem(KEY, JSON.stringify(map))
  }
}
