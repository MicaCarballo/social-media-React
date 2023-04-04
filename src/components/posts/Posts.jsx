import axios from "axios";
import { useContext, useEffect, useState } from "react";

import { AuthContext } from "../../context/authContext";

import Loading from "../loading/Loading";
import Post from "../post/Post";
import "./posts.scss";



const Posts = ({}) => {
  
  const { currentUser } = useContext(AuthContext);

  
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
    
      // posts.some((element)=> console.log(element.userId))

     
      // console.log(relationship?.some((element)=>{element.id})== posts?.some((element)=> (element.userId)));
console.log(currentUser)

 
 

return (
  <div className="posts">
  {posts && relationship ? (
    posts.map((post) => {
      const isCurrentUserPost = post.userId === currentUser.id;
      const isRelatedUserPost = relationship?.find((obj2) => obj2.id === post.userId);

      if (isCurrentUserPost || isRelatedUserPost) {
        return <Post post={post} key={post.id} />;
      }

      return null;
    })
  ) : (
    <Loading />
  )}
</div>

)}
export default Posts;