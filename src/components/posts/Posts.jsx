import axios from "axios";
import { useContext, useEffect, useState } from "react";

import { AuthContext } from "../../context/authContext";

import Loading from "../loading/Loading";
import Post from "../post/Post";
import "./posts.scss";



const Posts = ({userId}) => {
  
  const { currentUser } = useContext(AuthContext);

  const [posts, setposts] = useState()
  const [relationship, setrelationship] = useState()

  
    
    
      useEffect(() => {
        const URL = "https://micacarballo-social-media-api.onrender.com/api/v1/posts";
      axios.get(URL)
      .then(res => setposts(res.data))
      .catch( err => console.log(err))
      
        
      }, [posts])
      
    
    
    
       posts?.sort(
        (objA, objB) => Date.parse(new Date(objB.createdAt)) - Date.parse(new Date(objA.createdAt)),
      );
    
  
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
      
      }, [])
   
 

  return <div className="posts">
    { posts ?
         posts?.map(post=>(
          
          <Post post={post} key={post.id}/>
        )) : <Loading/>}
  
   
      
   
  </div>;
};

export default Posts;