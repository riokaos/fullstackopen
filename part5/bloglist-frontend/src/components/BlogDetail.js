import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import blogService from '../services/blogs'
import  { initializeBlogs, newBlog, like, createComment, removeBlog }  from '../reducers/blogReducer'
import CommentForm from './CommentForm'
import  { setNotification }  from '../reducers/notiReducer'
import { useHistory } from "react-router-dom";

const Comments = ( { comments } ) => {
  console.log('comments component:', comments)
  return (
    <div>
      <h2>Comments</h2>
      <ul>
        {comments.map(comment =>
          <li key={comment._id}>
            {comment.content}
          </li>
        )}
      </ul>
    </div>
  )
}

const BlogDetail = (props) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const id = props.match.params.id
  console.log('id::',id)

  const blog = useSelector(({ blogs }) =>  blogs.find(n => n.id === (id)))
  const loggedUser = useSelector(({ login }) => login)
  // console.log('logged user:',loggedUser);
  // const result_eval = (loggedUser.username === null)
  // var inputVal = loggedUser.username === null;
  // console.log('eval logged user:',inputVal);
  // console.log('logged user:',loggedUser.username);
  // console.log('blog user:', blog.user.username);

  // const user = useSelector(state => state.login)
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
        dispatch(like(blog.id))
        dispatch(setNotification(`Blog: '${blog.title}' liked`,5))
      })
      .catch(error => {
        alert(
          `the note '${blog.title}' was already deleted from server : ${error}`
        )
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

  const deleteBlogMain = id => {
    let message=`Are you sure you want to remove '${blog.title}' ?`
    if (window.confirm(message)) {
      blogService
        .deleteb(id)
        .then(() => {
          dispatch(removeBlog(blog.id))
          dispatch(setNotification(`Blog: '${blog.title}' removed`,5))
        })
        .catch(error => {
          alert(
            `the note '${blog.title}' was already deleted from server : ${error}`
          )
          //remove an allready deleted note from the state
          // setBlogs(blogs.filter(n => n.id !== id))
        })
    }
    history.push('/');
  }

  const deleteButton = () => (
    // {
    <button id="delete" className="button button1" onClick={() => deleteBlogMain(blog.id)}>delete</button>
    // }
  )

  const addComment = (id, commentObject) => {
    const changedBlog = { ...blog, comment: commentObject.content }
    dispatch(createComment(id, changedBlog))
    dispatch(setNotification(`Comment to : '${blog.title}' added`,5))
    // console.log("updated db");
  }

  // console.log('userD:', blog)
  // console.log('blog user:', blog.user)
  if (!blog) {    return null  }
  return (
    <div>
      <h2>{blog.title}<br/>{blog.author}</h2>
      {blog.author}{blog.url}
      <div>likes: {blog.likes} <button id='likes' onClick={() => addLike(blog.id)}>Like</button><br/></div>
      {blog.user === undefined ? null
        :
        loggedUser === null ? null
          :
          blog.user.username === loggedUser.username ? deleteButton(): null
      }
      {blog.comments.length > 0 &&
      <Comments comments={blog.comments}/>
      }
      <CommentForm createComment={addComment} blog={blog} />
    </div>
  )
}



export default BlogDetail
