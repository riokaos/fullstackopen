import React from 'react'
import { useSelector, connect } from 'react-redux'

// has the connect disabled

const Notification = (props) => {
  const notification = useSelector(state => {
    return state.notification
  })
  // const timer_id = useSelector(state => {
  //   return state.timerId
  // })
  // console.log("the timer id::",timer_id);
  // const notification = props.notification
  const style = {
    border: 'solid',
    padding: 5,
    borderWidth: 1
  }
  return (
    <div style={style}>
      {notification}
    </div>
  )
}

// const mapStateToProps = state => {
//     return {
//         notification: state.notification
//     }
// }

export default Notification
// export default connect(mapStateToProps, null)(Notification);
