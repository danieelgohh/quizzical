import { useEffect, useState } from 'react'
import Welcome from './components/Welcome'
import Quiz from './components/Quiz'

export default function App() {

  const [start, setStart] = useState(false)
  const [quizzes, setQuizzes] = useState([])
  const [answers, setAnswers] = useState(new Array(5).fill(undefined))

  console.log(answers)

  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5")
      .then(res => res.json())
      .then(data => setQuizzes(data))
  }, [])

  function startQuiz() {
    setStart(true)
  }

  function selectAnswer(answer, index) {
    console.log(answer, index)
    setAnswers(prev => {
      const newAnswers = [...prev]
      newAnswers[index] = answer
      return newAnswers
    })
  }

  console.log(quizzes)
  console.log(answers)

  return (
    <>
      {start && quizzes ? <Quiz quizzes={quizzes} selectAnswer={selectAnswer} selected={answers} />: <Welcome start={startQuiz} />}
    </>
  )
}