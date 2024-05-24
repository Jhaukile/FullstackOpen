import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = () =>
  axios.get(baseUrl).then(res => res.data)


export const createAnecdote = async (newAnecdote) => {
    const response = await axios.post('/anecdotes', anecdote)
    return response.data
}