const mongoose = require('mongoose')
const config = require('./utils/config')
const cors = require('cors')
const express = require('express')
const app = express()
const blogsRouter = require('./controllers/blogs')
require('express-async-errors')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const middleware = require('./utils/middleware')

const mongoUrl = config.MONGODB_URI

mongoose.connect(mongoUrl)


app.use(cors())
app.use(express.json())
app.use(middleware.tokenExtractor)
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)



module.exports = app
