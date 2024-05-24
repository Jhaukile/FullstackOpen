import { createAnecdote, incVote } from '../reducers/anecdoteReducer'
import { useSelector, useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'





const AnecdoteForm = () => {

  //  const anecdotes = useSelector(state => state)
    const dispatch = useDispatch()

    const addAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        // const newAnecdote = await AnecService.createNew(content)
        dispatch(createAnecdote(content))
        dispatch(setNotification(`lisäsit "${content}`, 5))
      }

    return(
        <div>
            <h2>create new</h2>
            <form onSubmit={addAnecdote}>
                <div><input name="anecdote"/></div>
                <button type="submit">create</button>
            </form>
        </div>
    )
}



export default AnecdoteForm
