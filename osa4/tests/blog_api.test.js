const { test, after, beforeEach, describe} = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const assert = require('node:assert')
const helper = require('./test_helper')
const Blog = require('../models/blog')

const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})

let blogObject = new Blog(helper.initialBlogs[0])
    await blogObject.save()
    
    blogObject = new Blog(helper.initialBlogs[1])
    await blogObject.save()

    blogObject = new Blog(helper.initialBlogs[2])
    await blogObject.save()


})

test('correct amount of blogs', async () => {
 const response = await api.get('/api/blogs')
 assert.strictEqual(response.body.length, 3)
})

after(async () => {
  await mongoose.connection.close()
})

test('correct id', async () => {
    const response = await api.get('/api/blogs')
    response.body.forEach(blog => {
        assert.ok(!('_id' in blog), '_id exists! ERROR')
        assert.ok('id' in blog, 'NO id properties!')
    })
})

test('valid blog can be added ', async () => {
    const newBlog = {
      title: 'hehe',
      author: 'tester',
      url: 'google.com',
      likes: 4
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
    const response = await api.get('/api/blogs')
  
    const titles = response.body.map(r => r.title)
  
    assert.strictEqual(response.body.length, helper.initialBlogs.length + 1)
  
    assert(titles.includes('hehe'))
  })


test('likes has number or 0', async () => {
    const newBlog = {
      title: 'hehe',
      author: 'tester',
      url: 'google.com',
      likes: 4
    }
  
    const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
    assert(response.body.likes === 0 || response.body.likes > 0)
  })

  test('bad request check for url', async () => {
    const newBlog = {
      title: 'hehe',
      author: 'tester',
      likes: 4
    }
  
    const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  })

  test('bad request check for title', async () => {
    const newBlog = {
      url: 'google.com',
      author: 'tester',
      likes: 4
    }
  
    const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  })

  describe('deletion of a blog', () => {
    test('deleting blog, status code 204', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToDelete = blogsAtStart[0]

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)

      const blogsAtEnd = await helper.blogsInDb()

      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)

      const titles = blogsAtEnd.map(r => r.title)
      assert(!titles.includes(blogToDelete.title))
    })
  })

  describe('updating a blog', () => {
    test('updating blog', async () => {

        
      const blogsAtStart = await helper.blogsInDb()
      const blogToUpdate = blogsAtStart[0]
      const likes = 7
      
      await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send({likes: likes})
        .expect(200)

      const blogsAtEnd = await helper.blogsInDb()
      const updated = blogsAtEnd.find(blog => blog.id === blogToUpdate.id)
      assert.deepEqual(updated.likes, likes)
    })
  })

