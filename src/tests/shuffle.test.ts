import { expect, test } from 'vitest'
import { shuffle } from '../lib/shuffle'

test('shuffle returns new array of same length', () => {
  const a = [1,2,3,4,5]
  const b = shuffle(a)
  expect(b).toHaveLength(a.length)
  expect(b).not.toBe(a)
})
