export type Difficulty = 'easy' | 'medium' | 'hard'

export type QuizQuestion = {
  id: string
  question: string
  options: string[] 
  correctAnswer: string
  difficulty: Difficulty
  category?: string
}

export type AnswerRecord = {
  questionId: string
  selected?: string 
  correctAnswer: string
  status: 'correct' | 'incorrect' | 'skipped' | 'timeout'
}

export type QuizState = {
  questions: QuizQuestion[]
  currentIndex: number
  answers: Record<string, AnswerRecord>
  score: number
  timerSeconds: number
  difficulty: Difficulty
  finished: boolean; 
}
