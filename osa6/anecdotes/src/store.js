import { configureStore } from '@reduxjs/toolkit'
import AnecdoteReducer from './reducers/anecdoteReducer'
import filterReducer from './reducers/filterReducer'
import notificationReducer from './reducers/notificationReducer'

const store = configureStore({
    reducer: {
      anecdotes: AnecdoteReducer,
      filter: filterReducer,
      notifications: notificationReducer
    }
  })

export default store