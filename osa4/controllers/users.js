const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
    const users = await User
    .find({}).populate('blogs')
        response.json(users)
      })



usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body
  if (username === undefined || username.length < 4){
    return response.status(400).json({error: 'username too short'})
  }
  const exist = await User.findOne( {username})
    if (exist){
        return response.status(400).json({error: 'username already in use'})
    }
  if (password === undefined || password.length < 4){
    return response.status(400).json({error: 'password too short'})
  }
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

module.exports = usersRouter