import React, { useContext, useEffect, useState } from 'react';
import "./profile.scss";
import coverImg from "../../assets/coverImg.jpg";
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from "../../context/authContext";
import {applicationModal} from '../../services/alerts/alert.services'


import Post from '../../components/post/Post';
import Loading from '../../components/loading/Loading';
import Update from '../../components/update/Update';




const Profile = () => {



  const { currentUser, updateUser } = useContext(AuthContext);

const userId =(useLocation().pathname.split("/")[2])
const [user, setuser] = useState()
const [relationship, setrelationship] = useState()
    

    const [posts, setposts] = useState()
    
    useEffect(() => {
      const URL = "https://micacarballo-social-media-api.onrender.com/api/v1/posts";
    axios.get(URL)
    .then(res => setposts(res.data),
   
   
     
    )
    .catch( err => console.log(err))
    
      
    }, [posts])

    posts?.sort(
      (objA, objB) => Date.parse(new Date(objB.createdAt)) - Date.parse(new Date(objA.createdAt)),
    )
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
      Authorization: `jwt ${currentUser?.token}`
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
      Authorization:`jwt ${currentUser.token}`
  }
  }
  axios.post(URL, data, config)
  .then(res => {
    console.log(res.data)
  }
  
  
  )
  .catch( err => console.log(err))
}






const [input, setinput] = useState({
  firstName:currentUser.firstName,
  lastName:currentUser.lastName,
  nickName:currentUser.nickName,
  gender:currentUser.gender,
  birthday:currentUser.birthday,
  profileImg:currentUser.profileImg
})

const submit=async()=>{
  const URL =`https://micacarballo-social-media-api.onrender.com/api/v1/users/me` 
  
  const config={
    headers: {
      Authorization: `jwt ${currentUser?.token}`
  }
  }
await  axios.patch(URL, input, config)
  .then(res => {
    console.log(res.data)
    updateUser()

    swal("User Updated!", {
      buttons: false,
      icon:'success',
      timer: 1500,
    })
  }
  
  
  )
  .catch( err => console.log(err))
}
const handleSubmit = async(e)=>{
  e.preventDefault();
 submit(input)

}
const [updatedUserInfo, setUpdatedUserInfo] = useState({
  firstName:currentUser.firstName,
  lastName:currentUser.lastName,
  nickName:currentUser.nickName,
  gender:currentUser.gender,
  birthday:currentUser.birthday,
  profileImg:currentUser.profileImg
})

console.log(currentUser.token)

// const handleSubmit = (event) => {
//   event.preventDefault();
//   fetch('https://micacarballo-social-media-api.onrender.com/api/v1/users/me', {
//     method: 'PATCH',
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `jwt ${currentUser.token}`,
//     },
//      body:JSON.stringify(updatedUserInfo)  ,
//   })
//     .then((response) => {
//       if (!response.ok) {
//         console.log(response);
//       }
//       // handle successful response
//     console.log(response)
//     })
//     .catch((error) => {
//       console.error( error);
//       // handle error
//     });
// };
// const handleChange = (event) => {
//   const { name, value } = event.target;
//   setUpdatedUserInfo({ ...updatedUserInfo, [name]: value });
// };


const handleChange =(e)=>{
  setinput((prev)=>({...prev,[e.target.name]:e.target.value}))
}

const handleClose = ()=>{
setopen(false)
  

  




}
const [open, setopen] = useState(false)

const showDetails = () => {
 setopen(true)
  // applicationModal.fire({
  //   html: 
  //   <div className="update">
    
  //   <form action="" className='update-form'>
  //     <label htmlFor="firstName">First Name</label>
  //     <input type="text" name="firstName" onChange={handleChange} placeholder={currentUser.firstName} />
    
  //     <label for="lastName">Last Name</label>
  //     <input type="text" name="lastName" onChange={handleChange} placeholder={currentUser.lastName} />
    
  //     <label htmlFor='nickName' >Nickname</label>
  //     <input type="text" name="nickName" onChange={handleChange} placeholder={currentUser.nickName} />
    
  //     <label for="gender">Gender</label>
  //     <input type="text" name="gender" onChange={handleChange} placeholder={currentUser.gender} />
    
  //     <label for="birthday">Birthdate</label>
  //     <input type="text" name="birthday" onChange={handleChange} placeholder={currentUser.birthday} />
    
  //     <label for="profileImg">Profile Picture</label>
  //     <input type="text" name="profileImg" onChange={handleChange} placeholder={currentUser.profileImg} />
    
  //     <div class="buttons">
  //       <button class="update-btn" onClick={handleSubmit}>Update</button>
  //       <button class="close" onClick={handleClose}>Close</button>
  //     </div>
  //   </form>
    
  //   </div>
    
  //   ,
    
  //   padding: 0,
  // });
};


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
            userId === currentUser.id ?<button onClick={()=>{showDetails()}}>edit</button>: <button onClick={handleFollow}>{ relationship?.some((element) => element.id === userId) ? "following": "follow"}</button>
          }
          
        </div>
        
      </div>
      {
            open && 
            <div className="update">
    
            <form action="" className='update-form'>
              <label htmlFor="firstName">First Name</label>
              <input type="text" name="firstName" onChange={handleChange} placeholder={currentUser.firstName} />
            
              <label for="lastName">Last Name</label>
              <input type="text" name="lastName" onChange={handleChange} placeholder={currentUser.lastName} />
            
              <label htmlFor='nickName' >Nickname</label>
              <input type="text" name="nickName" onChange={handleChange} placeholder={currentUser.nickName} />
            
              <label for="gender">Gender</label>
              <input type="text" name="gender" onChange={handleChange} placeholder={currentUser.gender} />
            
              <label for="birthday">Birthdate</label>
              <input type="text" name="birthday" onChange={handleChange} placeholder={currentUser.birthday} />
            
              <label for="profileImg">Profile Picture</label>
              <input type="text" name="profileImg" onChange={handleChange} placeholder={currentUser.profileImg} />
            
              <div class="buttons">
                <button class="update-btn" onClick={handleSubmit}>Update</button>
                <button class="close" onClick={handleClose}>Close</button>
              </div>
            </form>
            
            </div>
          }
    
    </div>

    
    
   {

  posts?.map((post)=> {
   const userPosts = post.userId == userId
   if(userPosts){
    return <Post post={post} key={post.id} />;
   }else{
    <Loading/>
   }
  })
   }
        

    
   
  </div>
  )
}

export default Profile