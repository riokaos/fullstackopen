import React from 'react'

const Notification = ({ message }) => {
  if ((message === null) ||  (message === ''))  {
    return null
  }

  // const Notification = () => {
  //   const notification = useSelector(state => {
  //     return state.notification
  //   })

  return (
    <div className="notification">
      {message}
    </div>
  )
}

export default Notification
