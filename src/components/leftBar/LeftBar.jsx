import React, { useContext, useEffect } from 'react'
import "./leftBar.scss"




import { Link, Router, useNavigate } from 'react-router-dom';
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";



const LeftBar = () => {
  const navigate = useNavigate()

  function deleteItems() {
   
    localStorage.removeItem("users")
    navigate("/login")
    
    
    // Clear localStorage items 

   
  }
  

  return (
    <div className="leftBar">
      <div className="container">
        <div className="menu">
        <Link
              to="/"
              style={{
                textDecoration: "none",
                color: "black",
                display: "flex",
              }}
            >
              <div className="item">
              <HomeRoundedIcon
                className="home-icon"
               />
               <span>Home</span>
              </div>
              
            </Link>
         
          
          <div className="item" onClick={deleteItems}>
          

             <i className='bx bx-log-out-circle' style={{fontSize:"30px", color:"black"}} ></i>
<span>Logout</span>

          </div>
        
        </div>
       
        
        </div>
    </div>
  );
}

export default LeftBar