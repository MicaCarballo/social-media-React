import axios from "axios";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import "./share.scss" 
const Share = () => {

  const {currentUser} = useContext(AuthContext)

  const share=async()=>{
    const URL =`https://micacarballo-social-media-api.onrender.com/api/v1/posts` 
    
    const config={
      headers: {
        Authorization: `jwt ${currentUser.token}`
    }
    }
  await  axios.post(URL, input, config)
    .then(res => {
      console.log(res.data)
    }
    
    
    )
    .catch( err => console.log(err))
}
const [input, setinput] = useState({
    content:""
    
})
const handleShare = async(e)=>{
    e.preventDefault();
    share(input)
}
  console.log();
  const handleChange =(e)=>{
    setinput((prev)=>({...prev,[e.target.name]:e.target.value}))
}

console.log(input);
  return (
    <div className="share">
      <div className="container">
        <div className="top">
          <img
            src={currentUser?.profilePic ? currentUser.profilePic : "https://wiki.fluidproject.org/images/icons/profilepics/anonymous.png"}
            alt=""
          />
          <input type="text" placeholder={`What's on your mind ${currentUser?.firstName}?`}name="content" onChange={handleChange}/>
        </div>
        <hr />
        <div className="bottom">
          <div className="left">
      
          
            
          </div>
          <div className="right">
            <button onClick={handleShare}>Share</button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Share;