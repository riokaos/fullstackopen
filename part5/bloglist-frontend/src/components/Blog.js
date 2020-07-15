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
    <div style={blogStyle} className='blog'>
      <div style={hideWhenVisible} className='blogDefault'>{blog.title}<br/>{blog.author}
        <button onClick={toggleVisibility} id='show'>Show</button>

      </div>
      <div style={showWhenVisible} className='blogNonDefault'>{blog.title}<br/>{blog.author}

        <button onClick={toggleVisibility}>Hide</button>
        <br/>url: {blog.url}<br/>
        likes: {blog.likes} <button id='likes' onClick={likeAdder}>Like</button><br/>
        {blog.user.username === loggedUser ? deleteButton(): null}

      </div>
    </div>
  )
}

export default Blog
