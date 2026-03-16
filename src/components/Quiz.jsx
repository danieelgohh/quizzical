import he from 'he'

export default function Quiz(props) {
  function shuffleSelections (options, question) {
    for (let i = options.length - 1; i > 0; i --) {
      const random = Math.ceil(Math.random() * 3)
      options[i], options[random] = options[random], options[i]
    } 

    return (
      options.map((opt => (
        <label>
          <input id={question} type="radio" name={question} />
          {he.decode(opt)}
        </label>
      )))
    )
  }

  return (
    <main>
      {props.quizzes.results.map((q => (
        <>
          <h2>{he.decode(q.question)}</h2>
          <form>
            {q.type === "multiple"
              ? shuffleSelections([...q.incorrect_answers, q.correct_answer], q.question)
              : 
              <>
                <label>
                  <input id={q.question} type="radio" name={q.question} />
                  True
                </label>
                <label>
                  <input id={q.question} type="radio" name={q.question} />
                  False
                </label>
              </>
            }
          </form>
        </>
      )))}
    </main>
  )
}