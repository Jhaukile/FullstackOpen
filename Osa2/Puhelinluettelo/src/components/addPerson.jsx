import { useState, useEffect } from 'react'
import axios from 'axios'
import noteService from '../services/puhelinluettelo'

const updatePerson = (id, newNumber, setPersons, persons, setErrorMessage) => {
  const konfirmaatio = window.confirm("tällä nimellä löytyi, vaihetaanko numero?")
  if (!konfirmaatio){
    return
  }
const uusiNumero = { ...persons.find(person => person.id ===id), number: newNumber}
axios.put(`http://localhost:3001/persons/${id}`, uusiNumero)
.then(response => {
  setPersons(persons.map(person => person.id !== id ? person : response.data))
  setErrorMessage(`Numero Vaihdettu ${uusiNumero.name}`)
  setTimeout(() => {
    setErrorMessage(null)
  }, 5000)
})
.catch(error => {
  console.error('EI ONNISTUNUT!', error)
  setErrorMessage('EI ONNISTUNUT NUMERON VAIHTO')
  setTimeout(() => {
    setErrorMessage(null)
  }, 5000)
})

}
const addPerson = (event, persons, setPersons, newName, newNumber, setNewName, setNewNumber, setErrorMessage) => {
    event.preventDefault()
    const vanhaperson = persons.find(person => person.name === newName)
    if (vanhaperson){
      updatePerson(vanhaperson.id, newNumber, setPersons, persons, setErrorMessage)
    } 
   else{
    const PersonObject = {
      name: newName,
      number: newNumber
    }
    noteService
    .create(PersonObject)
    .then(response => {
    setPersons(persons.concat(response.data))
    setNewName('')
    setNewNumber('')
    setErrorMessage("UUSI JÄSEN LISÄTTY NUMEROKIRJAAN")
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  })
    }
  }
  
export default addPerson