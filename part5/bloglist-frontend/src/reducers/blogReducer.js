import blogService from '../services/blogs'
// import notificationReducer , { setNotification } from './notiReducer'


const blogReducer = (state = [], action) => {
  switch(action.type) {
    case 'NEW_BLOG':
      return [...state, action.data]
    case 'NEW_COMMENT':{
      const id = action.data.id
      // console.log('action_data::', action.data);
      const blogToChange = state.find(n => n.id === id)

      const changedBlog = {
        ...blogToChange,
        comments: action.data.comments
      }
      return state.map(blog =>
        blog.id !== id ? blog : changedBlog
      )}
    case 'INIT_BLOGS':
      return action.data
    case 'REMOVE_BLOG':{
      const id = action.data.id
      // console.log('action.data.id:', action.data.id)
      // const restBlogs2 = state.filter(n => n.id !== id)
      // console.log("remove_blog new state:", restBlogs2);
      return state.filter(n => n.id !== id)}
    case 'LIKE': {
      const id = action.data.id
      const blogToChange = state.find(n => n.id === id)
      const changedBlog = {
        ...blogToChange,
        likes: blogToChange.likes +1
      }
      return (
        state.map(blog =>
          blog.id !== id ? blog : changedBlog
        ).sort((a, b) => (b.likes > a.likes) ? 1 : -1)

      )
    }
    default:
      return state
  }
}


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

export const createComment = (id, content) => {
  return async dispatch => {
    const newNote = await blogService.updateComment(id, content)
    dispatch({
      type: 'NEW_COMMENT',
      data: newNote,
    })
  }
}


export default blogReducer
