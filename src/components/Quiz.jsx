import he from 'he'
import clsx from 'clsx'

export default function Quiz(props) {
  function renderSelections(type, choices, question, index) {
    const options = type === "multiple" ? choices : ["True", "False"]
    return (
      options.map((opt => (
        <li key={opt}
        className={clsx({
          "checked": !props.revealAnswer && props.selected[index].question === question && props.selected[index].answer === opt,
          "correct": props.revealAnswer && he.decode(choices[choices.length - 1]) === he.decode(opt),
          "incorrect": props.revealAnswer && he.decode(choices[choices.length - 1]) !== props.selected[index].answer && props.selected[index].answer === he.decode(opt),
        })} 
        onClick={(event) => props.selectAnswer(event, he.decode(opt), index, question)}>
          <input type="radio" name={question} value={he.decode(opt)} disabled={props.revealAnswer} />
          {he.decode(opt)}
        </li>
      )))
    )
  }

  return (
    <main>
      <form action={props.submitAnswer}>
        {props.quizzes.map(((q, index) => (
            <section key={q.question}>
              <fieldset className="question-text">
                <legend>{he.decode(q.question)}</legend>
                <ul className="choices-container">
                  {renderSelections(q.type, q.answerSelections, q.question, index)}
                </ul>
               </fieldset> 
            </section>
        )))}

        <div id="results-container">
          {props.revealAnswer && <span>You scored {`${props.score} / ${props.quizzes.length}`} correct answers</span>}
          <button>{props.revealAnswer ? "Play Again" : "Check Answers"}</button>
        </div>
      </form>
    </main>
  )
}