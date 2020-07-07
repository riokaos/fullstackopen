import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import ErrorNotification from './components/ErrorNotification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newBlog, setNewBlog] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [notiMessage, setNotiMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])
  // console.log("user out:",user);
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    // console.log("logger User:",JSON.parse(loggedUserJSON));
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      // console.log("user effect:",user);
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setNotiMessage(`Welcome again ${user.username} `)
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const loginForm = () => (
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
  )

  const blogForm = () => (
    <form onSubmit={addBlog}>
      Title: <input
        value={newBlog}
        onChange={handleBlogChange}
      />
      <div>
        Author:
          <input
          type="text"
          value={newAuthor}
          name="Author"
          onChange={({ target }) => setNewAuthor(target.value)}
        />
      </div>
      <div>
        Url:
          <input
          type="text"
          value={newUrl}
          name="url"
          onChange={({ target }) => setNewUrl(target.value)}
        />
      </div>
      <button type="submit">create</button>
    </form>
  )

  const handleBlogChange = (event) => {
    console.log(event.target.value)
    setNewBlog(event.target.value)
  }

  const handleLogOut = (event) => {
    // console.log(event.target.value)
    setUser(null)
    window.localStorage.clear()
  }

  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: newBlog,
      author: newAuthor,
      url: newUrl
      }

    blogService
      .create(blogObject)
      .then(returnedBlog => {
        // console.log(response)
        setBlogs(blogs.concat(returnedBlog))
        setNewBlog('')
        setNewAuthor('')
        setNewUrl('')
        setNotiMessage(
            `Blog '${returnedBlog.title}' added`
          )
          setTimeout(() => {
            setNotiMessage(null)
          }, 5000)
      })
      .catch(error => {
        let niceError = error.response.data.error
        setErrorMessage(
            `error:'${niceError}''`
          )
        setTimeout(() => {
            setErrorMessage(null)
          }, 15000)
        console.log("Error::",Object.values(error.response.data));
        console.log(niceError);
      })
  }

  return (
    <div>
      <h1>blogs</h1>
      <Notification message={notiMessage} />
      <ErrorNotification message={errorMessage} />
      {user === null ?
         loginForm():
         <div>
            <p>{user.name} logged in <button onClick={() => handleLogOut()}>
            Log out
            </button></p>
            {blogForm()}
         </div>

       }
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App
