import { useState, useEffect } from 'react'
import axios from 'axios'
import Person from './components/comps'
import CheckNames from './components/CheckNames'
import addPerson from './components/addPerson'
import noteService from './services/puhelinluettelo'
import './index.css'



const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="error">
      {message}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)

  //   { name: 'Arto Hellas', number: '040-123456' },
  //   { name: 'Ada Lovelace', number: '39-44-5323523' },
  //   { name: 'Dan Abramov', number: '12-43-234345' },
  //   { name: 'Mary Poppendieck', number: '39-23-6423122' }
  // ])
  useEffect(() => {
    noteService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  })
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newCheck, setNewCheck] = useState('')

  // noteService
  // .update(id, changedName)
  // .then(response => {
  //   setPersons(persons.map(persons => persons.id !== id ? persons : response.data))
  // })


 // const namesToShow = ShowAll ? persons : persons.filter(person => person.names)

  const handleBookChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} />
      <CheckNames persons={persons} newCheck={newCheck} setNewCheck={setNewCheck} setPersons={setPersons} /> 
      <form onSubmit={(event) => addPerson(event, persons, setPersons, newName, newNumber, setNewName, setNewNumber, setErrorMessage)}>
          <div>name: <input value={newName} 
          onChange={handleBookChange}/></div>
        <div>number: <input value={newNumber}
         onChange={handleNumberChange}/></div>
        <div><button type="submit">add</button></div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person =>
        <Person key={person.name} setPersons={setPersons} persons={persons} person={person} setErrorMessage={setErrorMessage}/>
      )}
      <div>debug: {newName}</div>
    </div>
  )

}

export default App