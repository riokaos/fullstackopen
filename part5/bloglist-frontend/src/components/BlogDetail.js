import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import blogService from '../services/blogs'
import  { initializeBlogs, newBlog, like, removeBlog }  from '../reducers/blogReducer'


const BlogDetail = (props) => {
  const dispatch = useDispatch()
  const id = props.match.params.id
  console.log('id::',id)

  // const userD = useSelector(({ users }) => {
  //   return users.find(n => n.id === (id))
  // })

  const blog = useSelector(({ blogs }) =>  blogs.find(n => n.id === (id)))

  const addLike = id => {
    // find the note we want to modify and assign it to the note variable
    // const blog = blogs.find(n => n.id === id)
    // create a new object that is an exact copy but with the important property
    const newLikes = blog.likes ? blog.likes + 1 : 1
    const changedBlog = { ...blog, likes: newLikes }
    // console.log('importance change changednote:',changedBlog)
    // console.log('effect')
    blogService
      .update(id, changedBlog)
      .then(returnedBlog => {
        // var byLikes = blogs.map(blog => blog.id !== id ? blog : returnedBlog).slice(0)
        // byLikes.sort((a, b) => (b.likes > a.likes) ? 1 : -1)
        dispatch(like(blog.id))
        // setBlogs(byLikes)
      })
      .catch(error => {
        // setErrorMessage(
        //   `Blog '${blog.title}'was already removed from server: ${error}`
        // )
        // setTimeout(() => {
        //   setErrorMessage(null)
        // }, 5000)
        //remove an allready deleted note from the state
        // setBlogs(blogs.filter(n => n.id !== id))
      })
  }

  console.log("userD:", blog);
  if (!blog) {    return null  }
  return (
    <div>
      <h2>{blog.title}</h2>
      <div>likes: {blog.likes} <button id='likes' onClick={() => addLike(blog.id)}>Like</button><br/></div>
    </div>
  )
}



export default BlogDetail
