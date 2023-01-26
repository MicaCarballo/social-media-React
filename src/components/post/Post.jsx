import "./post.scss";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";

import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Link } from "react-router-dom";

import { useContext, useEffect, useState } from "react";
import Comments from "../comments/Comments";
import axios from "axios";
import Moment from 'moment';
import { AuthContext } from "../../context/authContext";


const Post = ({ post }) => {
    const [commentOpen, setcommentOpen] = useState(false)
    const [menuOpen, setmenuOpen] = useState(false)
   
    const [userPost, setuserPost] = useState();
   const [likes, setlikes] = useState()
   
   const { currentUser } = useContext(AuthContext);


    useEffect(() => {
      let userId = post.userId
      const URL =`https://micacarballo-social-media-api.onrender.com/api/v1/users/${userId}` 
      axios.get(URL)
      .then(res => setuserPost(res.data))
      .catch( err => console.log(err))
     
    }, [])
   
    useEffect(() => {
      let postId = post.id
      const URL =`https://micacarballo-social-media-api.onrender.com/api/v1/posts/${postId}/likes` 
      axios.get(URL)
      .then(res => {
        setlikes(res.data)
      }
      
      
      )
      .catch( err => console.log(err))
     
    }, [likes])
 
   
      
        
const handleLike = ()=>{
  let postId = post.id
  const URL =`https://micacarballo-social-media-api.onrender.com/api/v1/posts/${postId}/likes` 
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
  
const handleDelete = ()=>{
  let postId = post.id
  const URL =`https://micacarballo-social-media-api.onrender.com/api/v1/posts/${postId}` 

  const config={
    headers: {
      Authorization: `jwt ${currentUser.token}`
  }
  }
  axios.delete(URL, config)
  .then(res => {
    console.log(res.data)
  }
  
  
  )
  .catch( err => console.log(err))
  
      
}

  return (

   <div className="post">
    <div className="container">
      <div className="user">
        <div className="userInfo">
          <img src={userPost?.profileImg ? userPost.profileImg : "https://wiki.fluidproject.org/images/icons/profilepics/anonymous.png" } alt="" />
          <div className="details">
            <Link
              to={`/profile/${userPost?.id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <span className="name">{userPost?.nickName}</span>
            </Link>
            <span className="date">{Moment(post?.createdAt).fromNow()}</span>
          </div>
        </div>{
          userPost?.id ===  currentUser.id ? <MoreHorizIcon onClick={()=> setmenuOpen(!menuOpen)}/> 
          : null
        }
         {menuOpen && <button onClick={handleDelete}>delete</button>}
      </div>
      <div className="content">
        <p>{post?.content}</p>
        <img src= {post?.imgurl ? post.imgurl : null} alt=""  />
      </div>
      <div className="info">
        <div className="item">
         {
            likes?.users.some((element) => element.id === currentUser.id) ? <FavoriteOutlinedIcon style={{color:"red"}} /> : <FavoriteBorderOutlinedIcon onClick={handleLike} />
         }
           
           {likes?.users.length} Likes
        </div>
        
      </div>
     { commentOpen &&
      <Comments/>
     }
    </div>
  </div> 
   
  ) 
};

export default Post;