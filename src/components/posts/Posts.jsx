import axios from "axios";
import { useContext, useEffect, useState } from "react";

import { AuthContext } from "../../context/authContext";

import Loading from "../loading/Loading";
import Post from "../post/Post";
import "./posts.scss";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import * as React from 'react';
import PublicIcon from '@mui/icons-material/Public';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import "./posts.scss"



const Posts = ({}) => {
  
  const { currentUser } = useContext(AuthContext);


  const [relationship, setrelationship] = useState()

  
  const [posts, setposts] = useState()

  const [postBy, setpostBy] = React.useState("all");

  const handleChange = (event) => {
    setpostBy(event.target.value);
  
  };
    
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


 
 

return (
  <div className="posts">
 <Box sx={{ minWidth: 120 }} className='select'>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Post from</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={postBy}
          label="posts from"
          onChange={handleChange}
        >
          <MenuItem value={"all"}> <PublicIcon/> All</MenuItem> 
          <MenuItem value={"following"}><GroupAddIcon/>Following</MenuItem>
          
        </Select>
      </FormControl>
    </Box>
  {posts && relationship ? (
    posts.map((post) => {
      const isCurrentUserPost = post.userId === currentUser.id;
      const isRelatedUserPost = relationship?.find((obj2) => obj2.id === post.userId);
     if(postBy == "following"){
      if (isCurrentUserPost || isRelatedUserPost) {
        return <Post post={post} key={post.id} />;
      }
     }else{
      return <Post post={post} key={post.id} />;
     }
      

      
    })
  ) : (
    <Loading />
  )}
</div>

)}
export default Posts;