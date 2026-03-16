import { useEffect, useState } from 'react'
import Welcome from './components/Welcome'
import Quiz from './components/Quiz'

export default function App() {

  const [start, setStart] = useState(false)
  const [quizzes, setQuizzes] = useState([])

  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5")
      .then(res => res.json())
      .then(data => setQuizzes(data))
  }, [])

  function startQuiz() {
    setStart(true)
  }

  return (
    <>
      {start ? <Quiz quizzes={quizzes} />: <Welcome start={startQuiz} />}
    </>
  )
}