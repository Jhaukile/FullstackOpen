import { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [points, setpoints] = useState(new Uint8Array(8))

  const handleSelected = () => {
  setSelected(0 + Math.floor(Math.random()* 8))
}

const handleVote = () => {
  const copy = [ ...points]
  copy[selected] +=1
  setpoints(copy)
}

  return (
    <div>
      <Button handleClick={handleSelected} text='Generate Random Anecdote' />
      <Button handleClick={handleVote} text='Like'/>
      <p>{anecdotes[selected]}</p>
      <p>has {points[selected]} votes</p>
      <p>Most voted anecdote:</p>
      <p>{anecdotes[points.indexOf(Math.max(...points))]}</p>
    </div>
  )
}

export default App