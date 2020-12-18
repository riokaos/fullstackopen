import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

// const Notification = ({ message }) => {
//   if ((message === null) ||  (message === ''))  {
//     return null
//   }

const Notification = () => {
  const notification = useSelector(state => {
    return state.notification
    // return state.notification
  })

  return (
    <div className="notification">
      {notification}
    </div>
  )
}

export default Notification
