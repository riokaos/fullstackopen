import React, { useState, useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'
import Blog from './components/Blog'
import Notification from './components/Notification'
import ErrorNotification from './components/ErrorNotification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import UserList from './components/UserList'
import UserDetail from './components/UserDetail'
import BlogDetail from './components/BlogDetail'
import blogService from './services/blogs'
import loginService from './services/login'
import  { setNotification }  from './reducers/notiReducer'
import  { initializeBlogs, newBlog, like, removeBlog }  from './reducers/blogReducer'
import  { loginUser, logoutUser }  from './reducers/loginReducer'
import  { initializeUsers }  from './reducers/userReducer'
import { Container, Table, TableBody, TableCell, TableContainer, TableRow,
  Paper, Button, AppBar, Toolbar  } from '@material-ui/core'


import {
  BrowserRouter as Router,
  Switch, Route, Link, useParams, useRouteMatch, Redirect, useHistory
} from 'react-router-dom'
// import { composeWithDevTools } from 'redux-devtools-extension'
import { useSelector, useDispatch } from 'react-redux'



const Menu = ({user, logForm, bgForm,hdLogout }) => {
  const padding = {
    paddingRight: 5
  }
  const logoutButton = () => (
    // {
    <Button variant="outlined" color="" id="log-out" className="button button1" onClick={hdLogout}>
      Log out
    </Button>
    // }
  )
  // return (
  //   <div>
  //     <Link style={padding} to="/">home</Link>
  //     <Link style={padding} to="/users">users</Link>
  //     <Link style={padding} to="/blogs">blogs</Link>
  //     {user === null ?
  //       logForm():
  //       <span>
  //         {user.name} logged in {<Button size="small" variant="outlined" color="primary" id="log-out" onClick={hdLogout()}>
  //         Log out
  //         </Button>}
  //         {bgForm()}
  //       </span>
  //     }
  //   </div>
  // )
  return (
    <AppBar position="static">
      <Toolbar>
        <Button color="inherit" component={Link} to="/">
         home
        </Button>
        <Button color="inherit" component={Link} to="/users">
          users
        </Button>
        <Button color="inherit" component={Link} to="/blogs">
           blogs
        </Button>
        {user === null ?
          <span>not logged</span>:
          <span>
            {user.name} logged in {<Button size="small" variant="contained" color="default" id="log-out" onClick={hdLogout()}>
            Log out
            </Button>}

          </span>
        }
      </Toolbar>
    </AppBar>
  )
}


const App = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  },[dispatch])

  const notiList = useSelector(state => state.notification)

  const blogs = useSelector(({ blogs }) => {
    blogs.sort((a, b) => (b.likes > a.likes) ? 1 : -1)
    // console.log("selector ran")
    return blogs
  })
  // console.log("state::",useSelector(state => state.login));
  const user = useSelector(state => state.login)

  const users = useSelector(state => state.users)

  const [errorMessage, setErrorMessage] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')


  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(loginUser(user))
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
      dispatch(loginUser(user))
      setUsername('')
      setPassword('')

      dispatch(setNotification(`Welcome again ${user.username} `,5))
    } catch (error) {
      setErrorMessage('Wrong credentials')
      console.log('error:', error)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const loginForm = () => (
    <Togglable buttonLabel='login' startOpen='true'>
      <LoginForm
        username = {username}
        password = {password}
        handleUsernameChange = {({ target }) => setUsername(target.value)}
        handlePasswordChange = {({ target }) => setPassword(target.value)}
        handleSubmit = {handleLogin}
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
    // setUser(null)
    dispatch(logoutUser(null))
      dispatch(setNotification(`Log Out succesfull`,5))
    window.localStorage.clear()
  }


  const addBlog = (blogObject) => {

    blogFormRef.current.toggleVisibility()
    console.log('blog object::', blogObject)
    blogService
      .create(blogObject)
      .then(returnedBlog => {

        const changedBlogObject = {
          ...returnedBlog,
          user: { 'username': user.username, 'id': returnedBlog.user }
        }
        dispatch(newBlog(changedBlogObject))
        dispatch(setNotification(`Blog '${returnedBlog.title}' added`,5))
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

  const rows = () => blogs.map(blog =>
    <Blog
      key={blog.id}
      blog={blog}
      loggedUser={user === null  ? null : user.username}
    />
  )

  const BlogList = () => {
    return(
      <div>
        <h2>Blogs</h2>
        <TableContainer component={Paper}>
          <Table>
            <TableBody>
              {blogs.map(blog =>
                <Blog
                  key={blog.id}
                  blog={blog}
                  loggedUser={user === null  ? null : user.username}
                />)}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    )
  }


  return (
    <Container>
      <div>
        <Router>
          <Menu user={user} logForm={() => loginForm()}
            bgForm={() => blogForm()}
            hdLogout={() => handleLogOut}/>
          {notiList.length > 0 &&
          <Notification />}

          <ErrorNotification message={errorMessage} />
          {user === null ?
            loginForm():
            <div>
              <p>{user.name} logged in <Button size="small" variant="outlined" color="primary" id="log-out" onClick={() => handleLogOut()}>
              Log out
              </Button></p>
              {blogForm()}
            </div>
          }
          <Switch>
            <Route path="/users/:id" component={UserDetail}/>
            <Route path="/blogs/:id" component={BlogDetail}/>

            <Route path="/users">
              <h1>Users</h1>
              <UserList users={users}/>
            </Route>
            <Route path="/">
              <BlogList/>
            </Route>
          </Switch>
        </Router>

      </div>
    </Container>
  )
}


export default App
