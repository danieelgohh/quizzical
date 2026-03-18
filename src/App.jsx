import { useEffect, useState } from 'react'
import { ClipLoader } from 'react-spinners'
import he from 'he'
import Welcome from './components/Welcome'
import Quiz from './components/Quiz'

export default function App() {

  const [start, setStart] = useState(false)
  const [quizzes, setQuizzes] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [answers, setAnswers] = useState(() => new Array(5).fill(null).map(() => ({question: "", answer: ""})))
  const [revealAnswer, setRevealAnswer] = useState(false)

  const score = answers.filter((a, index) => quizzes.length > 0 && he.decode(a.answer) === he.decode(quizzes[index].correct_answer)).length


  function shuffleSelections (options) {
    for (let i = options.length - 1; i > 0; i --) {
      const random = Math.ceil(Math.random() * 3);
      [options[i], options[random]] = [options[random], options[i]]
    }

    return options
  }

  function startQuiz() {
    setRevealAnswer(false)
    setIsLoading(true)
    setStart(true)
    setAnswers(new Array(5).fill({question: "", answer: ""}))

    fetch("https://opentdb.com/api.php?amount=5")
      .then(res => res.json())
      .then(data => {
        setQuizzes(
          data.results.map(d => ({
            ...d,
            answerSelections: shuffleSelections([...d.incorrect_answers, d.correct_answer])
          }))
        )
        setIsLoading(false)
      })
  }

  function selectAnswer(event, answer, index, question) {
    event.target.children[0].checked = true
    setAnswers(prev => {
      const newAnswers = [...prev]
      newAnswers[index] = {
        question: question,
        answer: answer
      }
      return newAnswers
    })
  }

  function submitAnswer() {
    revealAnswer ? startQuiz() : setRevealAnswer(true)
  }

  return (
    <>
      {!start && <Welcome start={startQuiz} /> }
      {start && !isLoading ? <Quiz quizzes={quizzes} selectAnswer={selectAnswer} selected={answers} submitAnswer={submitAnswer} revealAnswer={revealAnswer} score={score} />: <ClipLoader color="#36D7B7" loading={isLoading} size={50} />}
    </>
  )
}