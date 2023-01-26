import axios from "axios";
import { useEffect, useState } from "react";

import Loading from "../loading/Loading";
import Post from "../post/Post";
import "./posts.scss";



const Posts = ({userId}) => {
  
  

  const [posts, setposts] = useState()

  
    
    
      useEffect(() => {
        const URL = "https://micacarballo-social-media-api.onrender.com/api/v1/posts";
      axios.get(URL)
      .then(res => setposts(res.data))
      .catch( err => console.log(err))
      
        
      }, [posts])
      
    
    
    
       posts?.sort(
        (objA, objB) => Date.parse(new Date(objB.createdAt)) - Date.parse(new Date(objA.createdAt)),
      );
   
  
  
   
   

  return <div className="posts">
    { posts ?
         posts?.map(post=>(
          <Post post={post} key={post.id}/>
        )) : <Loading/>}
  
   
      
   
  </div>;
};

export default Posts;