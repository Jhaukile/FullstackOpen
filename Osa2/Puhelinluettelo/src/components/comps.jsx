import axios from 'axios';



const poistaListalta = (id, setPersons, persons, setErrorMessage) => {
    
  const accept = window.confirm("Poistetaanko?")
  if (!accept){
    return
  }
  axios.delete(`http://localhost:3001/persons/${id}`)
  .then(() => {
    setPersons(persons.filter(person => person.id !== id))
    setErrorMessage("numero poistettu")
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  })
    
}

const Person = ({person, setPersons, persons, setErrorMessage}) => {
    const handleDel = (event) => {
      event.preventDefault()
      poistaListalta(person.id, setPersons, persons, setErrorMessage)
    }
    return (
      <div>
        <p>{person.name} {person.number} <button onClick={handleDel}>DELETE</button></p>

      </div>
    )
  
  }


export default Person
