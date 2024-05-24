import {incVotes } from '../reducers/anecdoteReducer'
import { useSelector, useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'






const AnecdoteList = () => {
    const dispatch = useDispatch()

    const anecdotes = useSelector(({filter, anecdotes}) => {
        if (filter === null){
            return anecdotes
        }
        const reg = new RegExp( filter, 'i')
        return(anecdotes.filter(anecdote => anecdote.content.toLowerCase().match(reg)))
        })

    
    const vote = (id, content) => {
        dispatch(incVotes(id))
        dispatch(setNotification(`Äänestit "${content}"`, 5))
    }

      return (
        <div>
            {anecdotes.sort((a, b) => b.votes - a.votes)
            .map(anecdote =>
            <div key={anecdote.id}>
                <div>
                    {anecdote.content}
                </div>
                <div>
                    has {anecdote.votes}
                    <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
                </div>
            </div>
          )}
        </div>
    )
}



export default AnecdoteList
