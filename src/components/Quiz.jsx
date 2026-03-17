import he from 'he'
import clsx from 'clsx'

export default function Quiz(props) {
  function shuffleSelections (options, question, index) {
    for (let i = options.length - 1; i > 0; i --) {
      const random = Math.ceil(Math.random() * 3)
      options[i], options[random] = options[random], options[i]
    } 

    return (
      options.map((opt => (
        <li 
        className={clsx(props.selected && props.selected.includes(he.decode(opt)) && "checked")} 
        onClick={() => props.selectAnswer(he.decode(opt), index)}>
          <input id={question} type="radio" name={question} />
          {he.decode(opt)}
        </li>
      )))
    )
  }

  return (
    <main>
      <form>
        {props.quizzes.results.map(((q, index) => (
            <section key={q.question}>
              <fieldset className="question-text">
                <legend>{he.decode(q.question)}</legend>
                <ul className="choices-container">
                  {q.type === "multiple"
                    ? shuffleSelections([...q.incorrect_answers, q.correct_answer], q.question, index)
                    : 
                    <>
                      <li 
                      className={clsx(props.selected && props.selected.includes(he.decode(opt)) && "checked")} 
                      onClick={() => props.selectAnswer("True", index)}>
                        <input id={q.question} type="radio" name={q.question} />
                        True
                      </li>
                      <li 
                      className={clsx(props.selected && props.selected.includes(he.decode(opt)) && "checked")} 
                      onClick={() => props.selectAnswer("False", index)}>
                        <input id={q.question} type="radio" name={q.question} />
                        False
                      </li>
                    </>
                  }
                </ul>
               </fieldset> 
            </section>
        )))}
      </form>
    </main>
  )
}