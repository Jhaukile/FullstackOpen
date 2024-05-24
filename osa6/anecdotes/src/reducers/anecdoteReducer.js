import {createSlice} from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'
// const anecdotesAtStart = [
//   'If it hurts, do it more often',
//   'Adding manpower to a late software project makes it later!',
//   'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
//   'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
//   'Premature optimization is the root of all evil.',
//   'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
// ]

// const getId = () => (100000 * Math.random()).toFixed(0)

// const asObject = (anecdote) => {
//   return {
//     content: anecdote,
//     id: getId(),
//     votes: 0
//   }
// }

// const initialState = anecdotesAtStart.map(asObject)

const AnecdoteSlice = createSlice( {
  name: 'anecdote',
  initialState: [],
  reducers: {
    createAnecdote(state, action){
      const newAnecdote = action.payload
      state.push(newAnecdote)
    },
    incVote(state, action){
      const id = action.payload.id
      const changedAnec = action.payload
      return state.map(anecdote => 
        anecdote.id !== id ? anecdote : changedAnec
      )
    },
    appendAnec(state, action){
      state.push(action.payload)
    },
    setAnecs(state, action){
      return action.payload
    }
  },
})
  





export const {incVote, appendAnec, setAnecs } = AnecdoteSlice.actions

export const setAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecs(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch (appendAnec(newAnecdote))
}
}

export const incVotes = (id) => {
  return async dispatch => {
    const newVote = await anecdoteService.updateV(id)
    dispatch(incVote(newVote))

  }
}

export default AnecdoteSlice.reducer


// const AnecdoteReducer = (state = initialState, action) => {
//   console.log('state now: ', state)
//   console.log('action', action)
//   switch (action.type) {
//     case 'VOTE':
//       const id = action.payload.id
//       const voteChange = state.find(n => n.id === id)
//       const changedAnec = {
//         ...voteChange,
//         votes: voteChange.votes + 1
//       }
//       return state.map(anecdote => anecdote.id !== id ? anecdote : changedAnec)
//       case 'NEW_ANECDOTE':
//         return [...state, action.payload]
//       default: return state
// }
// }

// export const createAnecdote = (content) => {
//   return {
//     type: 'NEW_ANECDOTE',
//     payload: {
//       content,
//       votes: 0,
//       id: getId()
//     }
//   }
// }

// export const incVote = (id) => {
//   return {
//     type: 'VOTE',
//     payload: { id }
//   }
// }

// export default AnecdoteReducer