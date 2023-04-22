import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './search.scss'
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import SuggestedUsers from '../suggestedUsers/SuggestedUsers';



const Search = () => {

    const [sugestedUsers, setsugestedUsers] = useState()
    const [users, setusers] = useState()
  
    useEffect(() => {
    
        const URL ="https://micacarballo-social-media-api.onrender.com/api/v1/users/"
        axios.get(URL)
        .then(res => setusers(res.data))
        .catch( err => console.log(err))
       
      }, [])

    const handleChange = e =>{
        const filteredUsers = users?.filter((user) =>
        
        user.firstName.toLowerCase().includes(e.target.value.toLowerCase()) || user.lastName.toLowerCase().includes(e.target.value.toLowerCase())
      
      ) ;
      
        
      if(e.target.value !== "" && filteredUsers?.length > 0){
        setsugestedUsers(filteredUsers)
       }
       else{
         setsugestedUsers()
       }
       }

  return (
   
         <div className="search-bar">
          <div className='search-container'>
          <input className="search" placeholder="search for users" onChange={handleChange}></input>
         
         <PersonSearchIcon className='search-icon'/>
          </div>
          
        
         {/* {
   sugestedUsers &&
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

 } */}{
  sugestedUsers &&
  <SuggestedUsers sugestedUsers={sugestedUsers}/> 
 }
 
 
         </div>
         
       
 
 
 
        
  )
}

export default Search