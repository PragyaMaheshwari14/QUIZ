import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './index.css'
import App from './App'
import Landing from './routes/Landing'
import Home from './routes/Home'        // ← Start/setup page
import Quiz from './routes/Quiz'        // ← Play page
import Results from './routes/Results'
import Leaderboard from './routes/Leaderboard'
import { QuizProvider } from './lib/store'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <QuizProvider>
        <Routes>
          <Route element={<App />}>
            <Route index element={<Landing />} />
            <Route path="/start" element={<Home />} />   
            <Route path="/quiz" element={<Quiz />} />  
            <Route path="/results" element={<Results />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </QuizProvider>
    </BrowserRouter>
  </React.StrictMode>
)
