import { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)


const StatisticLine = (props) => {
  return (
    <div>
      <p>{props.text} {props.value}</p>
    </div>
  )
}

const Statistics = (props) => {
  if (props.good + props.bad + props.neutral === 0) {
    return (
      <div>
       No feedback given
      </div>
    )
  }
  return (
    <div>
      <h1>Stats</h1>
      <table>
        <tbody>
        <tr>
          <td>Good:</td>
          <td>{props.good}</td>
        </tr>
        <tr>
          <td>Neutral:</td>
          <td>{props.neutral}</td>
        </tr>
        <tr>
          <td>Bad</td>
          <td>{props.bad}</td>
        </tr>
        <tr>
          <td>Amount of Voters</td>
          <td>{props.good + props.neutral + props.bad}</td>
        </tr>
        <tr>
          <td>Avg</td>
          <td>{(props.good - props.bad) / (props.good + props.neutral + props.bad)}</td>
        </tr>
        <tr>
          <td>Positive%</td>
          <td>{props.good / (props.good + props.neutral + props.bad)}</td>
        </tr>
        </tbody>
      </table>
    </div>
  )
}


const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  const handleGood = () => {
    setGood(good + 1)
  }

  const handleNeutral = () => {
    setNeutral(neutral + 1)
  }

  const handleBad = () => {
    setBad(bad + 1)
  }


  return (
    <div>
      <h1>Feedback</h1>
        <Button handleClick={handleGood} text='Good' />
        <Button handleClick={handleNeutral} text='Neutral' />
        <Button handleClick={handleBad} text='Bad' />
        <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App