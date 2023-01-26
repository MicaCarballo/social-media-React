import axios from 'axios';
import React, { useContext, useState } from 'react'
import { AuthContext } from '../../context/authContext';
import "./update.scss"

export const Update = ({setopenUpdate}) => {

    const { currentUser } = useContext(AuthContext);
    const [update, setupdate] = useState()

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
        Authorization: `jwt ${currentUser.token}`
    }
    }
  await  axios.patch(URL, input, config)
    .then(res => {
      setupdate(res.data)
    }
    
    
    )
    .catch( err => console.log(err))
}
const handleSubmit = async(e)=>{
    e.preventDefault();
   submit(input)

}



const handleChange =(e)=>{
    setinput((prev)=>({...prev,[e.target.name]:e.target.value}))
}

const handleClose = ()=>{
  
    setopenUpdate(false)
  location.reload(true)
    
  
  
  

}


  return (
    <div className='update'>
 <h2>Update your information</h2>
   <form action="">
    <label for="firstName">firstname</label>
<input type="text" name='firstName' onChange={handleChange} placeholder={currentUser.firstName}/>
<label for="lastName">lastname</label>
<input type="text" name='lastName'onChange={handleChange} placeholder={currentUser.lastName}/>
<label for="nickname">nickname</label>
<input type="text" name='nickName' onChange={handleChange} placeholder={currentUser.nickName}/>
<label for="gender">gender</label>
<input type="text" name='gender'onChange={handleChange} placeholder={currentUser.gender}/>
<label for="birthday">birthdate</label>
<input type="text" name='birthday' onChange={handleChange} placeholder={currentUser.birthday}/>
<label for="profileImg">Profile picture</label>
<input type="text" name='profileImg'onChange={handleChange} placeholder={currentUser.profileImg}/>
<div className='buttons'>
<button className="update-btn" onClick={handleSubmit}>update</button>
<button className="close" onClick={handleClose}>
          close
        </button>
</div>

</form>
{update?.message}

   
    </div>
  );
};
