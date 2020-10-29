import React, { useState } from 'react'
// import { like } from '../reducers/blogReducer'
// import Togglable from './Togglable'
import { Link } from 'react-router-dom'

const Blog = ({ blog, likeAdder, blogDel, loggedUser }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }
  // console.log("blog title:",blog.title);
  // console.log("blog user:",blog.user);
  // console.log("type::",JSON.stringify(blog.user));
  // console.log("validation:",(blog.user) === undefined);
  // console.log("validation user:",(blog.user.username) === loggedUser);
  const deleteButton = () => (
    // {
    <button id="delete" className="button button1" onClick={blogDel}>delete</button>
    // }
  )

  // console.log("visible:",visible);

  return (
    <div style={blogStyle} className='blog'>
      <div className='blogDefault'>
        <Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link>
      </div>
    </div>
  )
}

export default Blog
