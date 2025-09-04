import { afterEach, vi } from 'vitest'
import { getHighScores, saveHighScore } from '../lib/storage'

afterEach(() => {
  localStorage.clear()
})

test('high scores save only if better', () => {
  saveHighScore('easy', 3, 5)
  let scores = getHighScores()
  expect(scores.easy?.bestScore).toBe(3)
  saveHighScore('easy', 2, 5)
  scores = getHighScores()
  expect(scores.easy?.bestScore).toBe(3)
  saveHighScore('easy', 4, 5)
  scores = getHighScores()
  expect(scores.easy?.bestScore).toBe(4)
})
