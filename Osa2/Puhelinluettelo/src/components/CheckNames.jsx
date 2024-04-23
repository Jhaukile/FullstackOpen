

const CheckNames = ({ persons, newCheck, setNewCheck, setPersons}) => {

    const handleCheckNames = (event) => {
      event.preventDefault()
      const filtered = persons.filter((person) => person.name.toLowerCase().includes(newCheck.toLowerCase()))
      setPersons(filtered)
    }
  
    return (
      <form onSubmit={handleCheckNames}>
        <div>Filtteri: <input value={newCheck} onChange={(event) => setNewCheck(event.target.value)} /></div>
        <div><button type="submit">Filter</button></div>
      </form>
    )
  }
export default CheckNames