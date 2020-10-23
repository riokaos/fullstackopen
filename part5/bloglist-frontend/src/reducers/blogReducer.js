import blogService from '../services/blogs'
// import notificationReducer , { setNotification } from './notiReducer'


const blogReducer = (state = [], action) => {
  switch(action.type) {
    case 'NEW_BLOG':
      // console.log("action::", action.data);
      // return state.concat(action.data)
      // const changedBlogObject = {
      //   ...action.data,
      //   user: {"username": action.data.user.username, "id": action.data.user}
      // }
      // console.log("action data:", action.data);
      // console.log("the change:", changedBlogObject);
      return [...state, action.data]
    case 'INIT_BLOGS':
      return action.data
    case 'REMOVE_BLOG':
      const id = action.data.id
      // console.log('action.data.id:', action.data.id)
      const restBlogs2 = state.filter(n => n.id !== id)
      // console.log("remove_blog new state:", restBlogs2);
      return state.filter(n => n.id !== id)
    case 'LIKE': {
      const id = action.data.id
      const blogToChange = state.find(n => n.id === id)
      const changedBlog = {
        ...blogToChange,
        likes: blogToChange.likes +1
      }
      // const notificationToChange = state.notification
      // const changedNotification = {
      //   ...notificationToChange, 'Note added'
      // }
      // console.log("state::",state);
      return (
         state.map(blog =>
          blog.id !== id ? blog : changedBlog
        ).sort((a, b) => (b.likes > a.likes) ? 1 : -1)

      )
     }
    default:
    // console.log("default state");
      return state
  }
}

// first version simple one
// export const initializeBlogs = (blogs) => {
//   return {
//     type: 'INIT_BLOGS',
//     data: blogs,
//   }
// }

export const newBlog = (content) => {
  return {
    type: 'NEW_BLOG',
    data: content
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs,
    })
  }
}

//async version


export const like = (id) => {
  return {
    type: 'LIKE',
    data: { id }
  }
}

export const removeBlog = (id) => {
  return {
    type: 'REMOVE_BLOG',
    data: { id }
  }
}


// export const initializeBlogs = () => {
//   return async dispatch => {
//     const blogs = await blogService.getAll()
//     // anecdotes.sort((a, b) => (b.votes > a.votes) ? 1 : -1)
//     dispatch({
//       type: 'INIT_BLOGS',
//       data: blogs,
//     })
//
//   }
// }



//async version
// export const createNote = content => {
//   return async dispatch => {
//     const newNote = await noteService.createNew(content)
//     dispatch({
//       type: 'NEW_NOTE',
//       data: newNote,
//     })
//   }
// }



export default blogReducer
