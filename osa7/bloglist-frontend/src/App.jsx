import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import "./index.css";
import Togglable from "./components/toggle";
import BlogForm from "./components/blogForm";
import PropTypes from "prop-types";

const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }

  return <div className="error">{message}</div>;
};

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [ErrorMessage, setErrorMessage] = useState(null);

  const BlogRef = useRef();

  App.propTypes = {
    handleLogin: PropTypes.func.isRequired,
  };

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log("logging in with", username, password);

    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));

      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
      setErrorMessage("KIRJAUTUMINEN ONNISTUI");
      setTimeout(() => {
        setErrorMessage(null);
      }, 2000);
    } catch (exception) {
      setErrorMessage("wrong credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const handleLogout = (event) => {
    event.preventDefault();
    window.localStorage.removeItem("loggedBlogappUser");
    setUsername("");
    setPassword("");
    setUser(null);
  };

  const addBlog = (blogObject) => {
    blogService.create(blogObject).then((returnedBlog) => {
      setBlogs(blogs.concat(returnedBlog));
    });
    BlogRef.current.toggleVisibility();
    setErrorMessage("ONNISTUIT LISÄÄMÄÄN BLOGIN");
    setTimeout(() => {
      setErrorMessage(null);
    }, 2000);
  };

  const updateBlogList = (updatedBlog) => {
    setBlogs(
      blogs.map((blog) => (blog.id === updatedBlog.id ? updatedBlog : blog)),
    );
  };

  const removeBlog = (id) => {
    setBlogs(blogs.filter((blog) => blog.id !== id));
  };

  if (user === null) {
    return (
      <div>
        <Notification message={ErrorMessage} />
        <h2>Log in to application</h2>
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    );
  }
  return (
    <div>
      <Notification message={ErrorMessage} />
      <h2>blogs</h2>
      <p>
        {`${user.name} has logged in`}{" "}
        <button onClick={handleLogout}>Logout</button>
      </p>
      <div>
        <h2>create New blogs</h2>
        <Togglable buttonLabel="new Blog" ref={BlogRef}>
          <BlogForm createBlog={addBlog} />
        </Togglable>
      </div>
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            user={user}
            updateBlogList={updateBlogList}
            removeBlog={removeBlog}
          />
        ))}
    </div>
  );
};

export default App;
