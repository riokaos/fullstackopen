import React, { useState } from 'react'

const CommentForm = ({ createComment, blog }) => {
  const [newComment, setComment] = useState('')


  const handleCommentTitle = (event) => {
    setComment(event.target.value)
  }


  const addComment = (event) => {
    event.preventDefault()
    createComment(blog.id, {
      content: newComment
    })
    // console.log("comment::",newComment);
    setComment('')

  }

  return (
    <div className="formDiv">
      <h2>Add a comment</h2>

      <form onSubmit={addComment}>
        <div>
          comentario: <input
            id='comment'
            value={newComment}
            onChange={handleCommentTitle}
          />
        </div>
        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default CommentForm
