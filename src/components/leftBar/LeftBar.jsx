import React, { useContext, useEffect } from 'react'
import "./leftBar.scss"




import { Link } from 'react-router-dom';
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";



const LeftBar = () => {
  
  
  

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
         
          
          <Link to="/login"  style={{ textDecoration: "none", color: "inherit" }}>
          <div className="item">
          

             <i className='bx bx-log-out-circle' style={{fontSize:"30px", color:"black"}} ></i>
<span>Logout</span>

          </div>
          </Link>
        </div>
        <hr /> 
        
        </div>
    </div>
  );
}

export default LeftBar