const _ = require('lodash')

const dummy = (blogs) => {
    return (1)
  }
  

const totalLikes = (blogs) => {
    const total = blogs.reduce((sum, blog) => sum + blog.likes, 0)
    return (total)
}

const favoriteBlog = (blogs) => {
    const mostlikes = blogs.reduce((eka, toka) => (eka.likes > toka.likes) ? eka : toka)
    const {title, author, likes} = mostlikes
    ret = {title, author, likes}
    return (ret)
}

const mostBlogs = (blogs) => {
    const authors = _.countBy(blogs, 'author')
    const highAuthor = _.maxBy(Object.keys(authors), (author) => authors[author])
    return {author: highAuthor, blogs: authors[highAuthor]}
}

const mostLikes = (blogs) => {
    const authors = _.groupBy(blogs, 'author')
    likes = _.mapValues(authors, (blogs) => _.sumBy(blogs, 'likes'))
    highAuthor = _.maxBy(Object.keys(likes), (author) => likes[author])
    return { author: highAuthor, likes: likes[highAuthor]}
}

module.exports = {
    dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes}
