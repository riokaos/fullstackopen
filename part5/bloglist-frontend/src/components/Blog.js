import React, { useState } from 'react'
// import Togglable from './Togglable'

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

  const deleteButton = () => (
    // {
    <button className="button button1" onClick={blogDel}>delete</button>
    // }
  )

  // console.log("visible:",visible);

  return (
    <div style={blogStyle}>{blog.title}
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>Show</button>

      </div>
      <div style={showWhenVisible}>

        <button onClick={toggleVisibility}>Hide</button>
        {blog.url}<br/>
        likes {blog.likes} <button onClick={likeAdder}>Like</button><br/>
        {blog.author}
        {blog.user.username === loggedUser ? deleteButton(): null}

      </div>
    </div>
  )
}

export default Blog
