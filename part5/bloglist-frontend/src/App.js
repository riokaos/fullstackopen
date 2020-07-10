import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import ErrorNotification from './components/ErrorNotification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState('')
  const [notiMessage, setNotiMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)


  useEffect(() => {
    blogService.getAll().then(blogs => {
      console.log('in blogs:',blogs)
      blogs.sort((a, b) => (b.likes > a.likes) ? 1 : -1)
      console.log('in blogs sorted:',blogs)
      setBlogs( blogs )
    })
  }, [])

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
    <Togglable buttonLabel='login'>
      <LoginForm
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleSubmit={handleLogin}
      />
    </Togglable>
  )

  const blogFormRef = useRef()
  const blogForm = () => (
    <Togglable buttonLabel='New Blog' ref={blogFormRef}>
      <BlogForm createBlog={addBlog} />
    </Togglable>
  )

  const handleLogOut = () => {
    // console.log(event.target.value)
    setUser(null)
    window.localStorage.clear()
  }

  const addBlog = (blogObject) => {
    // event.preventDefault()
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        // console.log(response)
        setBlogs(blogs.concat(returnedBlog))
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
        console.log('Error::',Object.values(error.response.data))
        console.log(niceError)
      })
  }

  const addLike = id => {
    // find the note we want to modify and assign it to the note variable
    const blog = blogs.find(n => n.id === id)
    // create a new object that is an exact copy but with the important property
    const newLikes = blog.likes ? blog.likes + 1 : 1
    const changedBlog = { ...blog, likes: newLikes }
    console.log('importance change changednote:',changedBlog)
    console.log('effect')
    blogService
      .update(id, changedBlog)
      .then(returnedBlog => {
        var byLikes = blogs.map(blog => blog.id !== id ? blog : returnedBlog).slice(0)
        byLikes.sort((a, b) => (b.likes > a.likes) ? 1 : -1)
        setBlogs(byLikes)
      })
      .catch(error => {
        setErrorMessage(
          `Blog '${blog.title}'was already removed from server: ${error}`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        //remove an allready deleted note from the state
        setBlogs(blogs.filter(n => n.id !== id))
      })
  }

  const deleteBlogMain = id => {
    const blogD = blogs.find(n => n.id === id)
    const restBlogs = blogs.filter(n => n.id !== id)
    let message=`Are you sure you want to remove '${blogD.title}' ?`
    if (window.confirm(message)) {
      blogService
        .deleteb(id)
        .then(() => {
          // const toAdd = blogs.map(blog => blog.id !== id ? blog : returnedBlog.data);
          setBlogs(restBlogs)
          // setNewName('')
        })
        .catch(error => {
          alert(
            `the note '${blogD.title}' was already deleted from server : ${error}`
          )
          //remove an allready deleted note from the state
          setBlogs(blogs.filter(n => n.id !== id))
        })
    }
  }

  const rows = () => blogs.map(blog =>
    <Blog
      key={blog.id}
      blog={blog}
      likeAdder={() => addLike(blog.id)}
      blogDel={() => deleteBlogMain(blog.id)}
      loggedUser={user === null  ? null : user.username}
    />
  )

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
      {rows()}
    </div>
  )
}

export default App
