/* eslint react-refresh/only-export-components: ["warn", { "allowExportNames": ["QuizProvider", "useQuiz"] }] */
import React, { createContext, useContext, useEffect, useMemo, useReducer } from 'react'
import type { AnswerRecord, Difficulty, QuizQuestion, QuizState } from '../types/quiz'
import { saveHighScore } from './storage'

type Action =
  | { type: 'INIT'; payload: { questions: QuizQuestion[]; timerSeconds: number; difficulty: Difficulty } }
  | { type: 'SELECT'; payload: { questionId: string; selected: string } }
  | { type: 'SKIP'; payload: { questionId: string } }
  | { type: 'TIMEOUT'; payload: { questionId: string } }
  | { type: 'NEXT' }
  | { type: 'PREV' }
  | { type: 'FINISH' }
  | { type: 'RESET' }

const initial: QuizState = {
  questions: [],
  currentIndex: 0,
  answers: {},
  score: 0,
  timerSeconds: 30,
  difficulty: 'easy',
  finished: false, // 👈 new
}

function computeScore(answers: Record<string, AnswerRecord>) {
  return Object.values(answers).reduce((acc, a) => acc + (a.status === 'correct' ? 1 : 0), 0)
}

function reducer(state: QuizState, action: Action): QuizState {
  switch (action.type) {
    case 'INIT':
      return {
        questions: action.payload.questions,
        currentIndex: 0,
        answers: {},
        score: 0,
        timerSeconds: action.payload.timerSeconds,
        difficulty: action.payload.difficulty,
        finished: false, // fresh session
      }

    case 'SELECT': {
      const q = state.questions[state.currentIndex]
      const record: AnswerRecord = {
        questionId: q.id,
        selected: action.payload.selected,
        correctAnswer: q.correctAnswer,
        status: action.payload.selected === q.correctAnswer ? 'correct' : 'incorrect',
      }
      const answers = { ...state.answers, [q.id]: record }
      return { ...state, answers, score: computeScore(answers) }
    }

    case 'SKIP': {
      const q = state.questions[state.currentIndex]
      const record: AnswerRecord = { questionId: q.id, selected: undefined, correctAnswer: q.correctAnswer, status: 'skipped' }
      const answers = { ...state.answers, [q.id]: record }
      return { ...state, answers, score: computeScore(answers) }
    }

    case 'TIMEOUT': {
      const q = state.questions[state.currentIndex]
      const record: AnswerRecord = { questionId: q.id, selected: undefined, correctAnswer: q.correctAnswer, status: 'timeout' }
      const answers = { ...state.answers, [q.id]: record }
      return { ...state, answers, score: computeScore(answers) }
    }

    case 'NEXT':
      return { ...state, currentIndex: Math.min(state.currentIndex + 1, state.questions.length - 1) }

    case 'PREV':
      return { ...state, currentIndex: Math.max(state.currentIndex - 1, 0) }

    case 'FINISH': {
      // persist best score and mark session finished
      saveHighScore(state.difficulty, state.score, state.questions.length)
      return { ...state, finished: true }
    }

    case 'RESET':
      return initial

    default:
      return state
  }
}

export type UseQuizReturn = { state: QuizState; dispatch: React.Dispatch<Action> }

// Use `undefined` to get good type safety in the hook
const Ctx = createContext<UseQuizReturn | undefined>(undefined)

const SKEY = 'quiz_session_v1'

export function QuizProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initial, () => {
    const saved = typeof window !== 'undefined' ? sessionStorage.getItem(SKEY) : null
    if (!saved) return initial
    // Safe hydrate + forward-compatible with older sessions (no `finished`)
    const parsed = JSON.parse(saved) as Partial<QuizState>
    return {
      ...initial,
      ...parsed,
      finished: parsed.finished ?? false,
    }
  })

  useEffect(() => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem(SKEY, JSON.stringify(state))
    }
  }, [state])

  const value = useMemo<UseQuizReturn>(() => ({ state, dispatch }), [state])
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useQuiz(): UseQuizReturn {
  const ctx = useContext(Ctx)!
  return ctx
}
