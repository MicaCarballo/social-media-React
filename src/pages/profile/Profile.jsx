import React, { useContext, useEffect, useState } from 'react'
import "./profile.scss"
import coverImg from "../../assets/coverImg.jpg"
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from "../../context/authContext";
import { Update } from '../../components/update/Update';

const Profile = () => {

  const { currentUser } = useContext(AuthContext);

const userId =(useLocation().pathname.split("/")[2])
const [user, setuser] = useState()
const [relationship, setrelationship] = useState()
    const [openUpdate, setopenUpdate] = useState(false)
useEffect(() => {
  
  const URL =`https://micacarballo-social-media-api.onrender.com/api/v1/users/${userId}` 
  axios.get(URL)
  .then(res => {
    setuser(res.data)
  }
  
  
  )
  .catch( err => console.log(err))
 
}, [])


useEffect(() => {
  
  const URL =`https://micacarballo-social-media-api.onrender.com/api/v1/follows` 
 
  const config={
    headers: {
      Authorization: `jwt ${currentUser.token}`
  }
  }
  axios.get(URL, config)
  .then(res => {
    setrelationship(res.data)
  }
  
  
  )
  .catch( err => console.log(err))

}, [relationship])


const handleFollow=()=>{
  const URL =`https://micacarballo-social-media-api.onrender.com/api/v1/users/${userId}/follow` 
  const data ={};
  const config={
    headers: {
      Authorization: `jwt ${currentUser.token}`
  }
  }
  axios.post(URL, data, config)
  .then(res => {
    console.log(res.data)
  }
  
  
  )
  .catch( err => console.log(err))
}









  return (
    <div className="profile">
    <div className="images">
      <img
        src={coverImg}
        alt=""
        className="cover"
      />
      <img
        src={user?.profileImg ? user.profileImg : "https://wiki.fluidproject.org/images/icons/profilepics/anonymous.png" }
        alt=""
        className="profilePic"
      />
    </div>
    <div className="profileContainer">
      <div className="uInfo">
       
        <div className="center">
          <span>{user?.firstName} {user?.lastName}</span>
          <div className="info">
            
          </div>{
            userId === currentUser.id ?<button onClick={()=>setopenUpdate(true)}>edit</button>: <button onClick={handleFollow}>{ relationship?.some((element) => element.id === userId) ? "following": "follow"}</button>
          }
          
        </div>
        
      </div>
    
    </div>
    { openUpdate && <Update setopenUpdate={setopenUpdate}/>}
  </div>
  )
}

export default Profile