const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const getTokenFrom = request => {
    const authorization = request.get('authorization')
    if (authorization && authorization.startsWith('Bearer ')) {
      return authorization.replace('Bearer ', '')
    }
    return null
  }

blogsRouter.get('/', async (request, response) => {
   const blogs = await Blog
   .find({}).populate('user', {username: 1, name: 1})
        response.json(blogs)
      })

  
      
  blogsRouter.post('/', async (request, response) => {
    const check = request.body
    if (check.likes === undefined || check.likes === null){
        check.likes = 0
    }
    if (!check.title|| !check.url){
        return response.status(400).json({error: 'Bad Request'})
    }
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
        return response.status(401).json({ error: 'token invalid' })
    }
    const user = await User.findById(decodedToken.id)
    const blog = new Blog(check)
    blog.user = user._id
    const savedblog = await blog.save()
    user.blogs = user.blogs.concat(savedblog._id)
    await user.save()
       response.json(savedblog)
      })



blogsRouter.delete('/:id', async (request, response) =>{
    await Blog.findByIdAndDelete(request.params.id)
        response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
    const body = request.body

    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    }

    const updated = await Blog.findByIdAndUpdate(request.params.id, blog, {new:true})
    if (updated){
        response.json(updated)
    } else {
        response.status(404).end()
    }
})
    

module.exports = blogsRouter