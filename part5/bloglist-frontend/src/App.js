import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import CreateForm from './components/CreateForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState('')
  const [sucessMessage, setSucessMessage] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem('loggedNoteAppUser', JSON.stringify(user))

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong Credentials')
      setTimeout(() => {
        setErrorMessage('')
      }, 5000)
    }
  }

  const addBlog = (blogObject) => {

    try {
      blogFormRef.current.toggleVisibility()

      blogService.create(blogObject).then((returnedObject) => {
        setBlogs(blogs.concat(returnedObject))
        setSucessMessage(`a new blog ${blogObject.title} by ${blogObject.author} added`)
        setTimeout(() => {
          setSucessMessage('')
        }, 5000)

      })
    } catch (exception) {
      console.log(exception)
      setErrorMessage('failed to create a new entry')
      setTimeout(() => {
        setErrorMessage('')
      }, 5000)
    }
  }

  const updateLikes = async (blog) => {
    const blogObject = {
      ...blog,
      likes: blog.likes + 1,
    }

    const returnedObject = await blogService.update(blog.id, blogObject)
    const blogUpdate = blogs.map((blog) => {
      return blog.id !== returnedObject.id ? blog : returnedObject
    })
    setBlogs(blogUpdate)
  }

  const deleteBlog = async (toBeDeleted) => {
    try {
      const ok = window.confirm(`Remove ${toBeDeleted.title} by ${toBeDeleted.author}`)
      if(ok) {
        await blogService.remove(toBeDeleted.id)
        setBlogs(blogs.filter(blog => blog.id !== toBeDeleted.id))
      }}
    catch(exepction) {
      alert('You don\'t have permission to delete this blog')
    }
  }

  const handleLogOut = async () => {
    window.localStorage.removeItem('loggedNoteAppUser')
    setUser(null)
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <h2>log in </h2>
      <div>
        username
        <input
          id='username'
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          id='password'
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id='login-button' type="submit">login</button>
    </form>
  )

  const blogList = () => {
    const orderedBlogs = blogs
      .map((blog) => {
        return (
          <Blog
            key={blog.id}
            blog={blog}
            updateLikes={updateLikes}
            deleteBlog={deleteBlog}
          />
        )
      })
      .sort((a, b) => {
        return b.props.blog.likes - a.props.blog.likes
      })

    return <>{orderedBlogs}</>
  }

  const blogFormRef = useRef()

  return (
    <div>
      {errorMessage}
      {sucessMessage}
      {user === null ? (
        loginForm()
      ) : (
        <div>
          <h2>blogs</h2>
          <p>
            {user.name} is logged in{' '}
            <button onClick={handleLogOut}>logout</button>
          </p>{' '}
          <Togglable buttonLabel="Add" ref={blogFormRef}>
            <CreateForm
              createBlog={addBlog}
            />
          </Togglable>
          {blogList()}
        </div>
      )}
    </div>
  )
}

export default App
