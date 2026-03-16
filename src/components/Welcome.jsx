export default function Welcome(props) {
  return (
    <main>
      <h1>Quizzical</h1>
      <p>Some description if needed</p>
      <button onClick={props.start}id="main-btn">Start Quiz</button>
    </main>
  )
}