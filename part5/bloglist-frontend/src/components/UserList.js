import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import  { initializeUsers }  from '../reducers/userReducer'
import { Link } from 'react-router-dom'

const User = ({ user }) => {
  return(
    <tr key={user.id}>
      <td>
        <Link to={`/users/${user.id}`}>{user.name}</Link>
      </td>
      <td>
        {user.blogs.length}
      </td>
    </tr>
  )
}


const UserList = ({ users }) => {
  const dispatch = useDispatch()
  dispatch(initializeUsers())

  // const blogs = useSelector(({ blogs }) => {
  //   return filter.length > 0
  //     // ? anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
  //     ? anecdotes.filter(anecdote => anecdote.content.toLowerCase().indexOf(filter.toLowerCase()) > -1)
  //     : anecdotes
  // })

  return(
    <table>
      <tbody>
        <tr>
          <th> </th>
          <th>
            <h3>blogs created</h3>
          </th>
        </tr>
        {users.map(user =>
          <User
            key={user.id}
            user={user}
          />
        )}
      </tbody>
    </table>
  )
}

export default UserList
