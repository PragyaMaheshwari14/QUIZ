import { loadQuestionsLocal, filterByDifficulty, pickRandomN } from '../lib/data'

test('loadQuestionsLocal returns items', () => {
  const all = loadQuestionsLocal()
  expect(all.length).toBeGreaterThan(0)
})

test('filterByDifficulty works', () => {
  const all = loadQuestionsLocal()
  const easy = filterByDifficulty(all, 'easy')
  expect(easy.every(q => q.difficulty === 'easy')).toBe(true)
})

test('pickRandomN bounds', () => {
  const a = [1,2,3]
  expect(pickRandomN(a, 2)).toHaveLength(2)
  expect(pickRandomN(a, 10)).toHaveLength(3)
  expect(pickRandomN(a, 0)).toHaveLength(0)
})
