import React, { useState } from 'react'
// import { useDispatch } from 'react-redux'
// import { createBlog } from '../reducers/blogReducer'
// import blogService from '../services/blogs'

const BlogForm = ({ createBlog }) => {
  const [newBlog, setNewBlog] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const handleChangeTitle = (event) => {
    setNewBlog(event.target.value)
  }
  const handleChangeAuthor = (event) => {
    setNewAuthor(event.target.value)
  }
  const handleChangeUrl = (event) => {
    setNewUrl(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newBlog,
      author: newAuthor,
      url: newUrl,
      likes: 0
    })

    setNewBlog('')
    setNewAuthor('')
    setNewUrl('')
  }

  return (
    <div className="formDiv">
      <h2>Create a new blog</h2>

      <form onSubmit={addBlog}>
        <div>
          Title: <input
            id='title'
            value={newBlog}
            onChange={handleChangeTitle}
          />
        </div>
        <div>
          Author:
          <input
            id='author'
            type="text"
            value={newAuthor}
            name="Author"
            onChange={handleChangeAuthor}
          />
        </div>
        <div>
          Url:
          <input
            id='url'
            type="text"
            value={newUrl}
            name="url"
            onChange={handleChangeUrl}
          />
        </div>
        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default BlogForm
