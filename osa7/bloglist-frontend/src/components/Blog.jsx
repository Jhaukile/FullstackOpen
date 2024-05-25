import { useState, useEffect, useRef } from "react";
import blogService from "../services/blogs";

const Blog = ({ blog, user, updateBlogList, removeBlog }) => {
  const [tiedotVisible, settiedotVisible] = useState(false);
  const [setLikes, setNewLikes] = useState("");
  const blogstyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const handleLike = (event) => {
    event.preventDefault();
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
    };
    blogService
      .update(blog.id, updatedBlog)
      .then((returnedBlog) => {
        setNewLikes(blog.likes + 1);
        updateBlogList(returnedBlog);
      })
      .catch((error) => {
        console.error("Error updating likes:", error);
      });
  };

  const handleDelete = (event) => {
    event.preventDefault();
    const conf = window.confirm("ARE YOU SURE YOU WANNA DELETE?");
    if (conf) {
      blogService.deleteone(blog.id);
      removeBlog(blog.id);
    }
  };

  if (tiedotVisible === false) {
    return (
      <div style={blogstyle}>
        <p className="blog">
          {blog.title} {blog.author}
          <button onClick={() => settiedotVisible(true)}>Show</button>
        </p>
      </div>
    );
  }

  if (tiedotVisible === true && user.username === blog.user.username) {
    return (
      <div style={blogstyle}>
        <p>
          {blog.title} {blog.author}
          <button onClick={() => settiedotVisible(false)}>hide</button>
        </p>
        <p>{blog.url}</p>
        <p>
          likes : {blog.likes} <button onClick={handleLike}>Like</button>
        </p>
        <p>{blog.user.name}</p>
        <p>
          <button onClick={handleDelete}>poista</button>
        </p>
      </div>
    );
  } else {
    return (
      <div style={blogstyle}>
        <p>
          {blog.title} {blog.author}
          <button onClick={() => settiedotVisible(false)}>hide</button>
        </p>
        <p>{blog.url}</p>
        <p>
          likes : {blog.likes} <button onClick={handleLike}>Like</button>
        </p>
        <p>{blog.user.name}</p>
      </div>
    );
  }
};

export default Blog;
