import React from 'react'
import { Link } from 'react-router-dom'

const SuggestedUsers = ({sugestedUsers}) => {

   



 

  return (
    <div className="suggested-users">
 {sugestedUsers?.map((user, index) => (
       <Link to={`/profile/${user?.id}`} onClick={()=> setsugestedUsers()}>
        <div key={index} className="user-container">
       <p className="suggested-user">{user.firstName} {user.lastName}</p>
       <img src={user.profileImg} className="user-img"/>
     </div>
       </Link>
    
   ))}
 </div> 
  )
}

export default SuggestedUsers