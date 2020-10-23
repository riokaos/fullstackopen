import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

const UserDetail = (props) => {
  // console.log('entered USER', props)
  // const id = useParams().id
  const id = props.match.params.id
  console.log('id::',id)

  // const userD = useSelector(({ users }) => {
  //   return users.find(n => n.id === (id))
  // })

  const userD = useSelector(({ users }) =>  users.find(n => n.id === (id)))

  console.log("userD:", userD);
  if (!userD) {    return null  }
  return (
    <div>
      <h2>{userD.name}</h2>
      <div></div>
    </div>
  )
}



export default UserDetail
