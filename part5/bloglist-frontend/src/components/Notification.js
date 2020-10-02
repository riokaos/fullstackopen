import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

const Notification = ({ message }) => {
  if ((message === null) ||  (message === ''))  {
    return null
  }

  // const Notification = () => {
  //   const notification = useSelector(state => {
  //     return state
  //     // return state.notification
  //   })

  return (
    <div className="notification">
      {message}
    </div>
  )
}

export default Notification
