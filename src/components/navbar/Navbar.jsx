import React, { useContext, useEffect, useState } from "react";
import "./navbar.scss";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import AppsRoundedIcon from "@mui/icons-material/AppsRounded";

import { Link } from "react-router-dom";

import { AuthContext } from "../../context/authContext";


const Navbar = () => {
  
  
  const { currentUser } = useContext(AuthContext);

  
  
  const [menuOpen, setmenuOpen] = useState(false);

 

 

  const handleLogOut = () => {};

  return (
    <div
      className="navbar"
      style={{
        height: menuOpen ? "100vh" : "10vh",
        display: menuOpen && "flex",
        justifyContent: menuOpen && "center",
      }}
    >
      <div
        className="left"
        style={{
          display: menuOpen && "flex",
          flexDirection: menuOpen && "column",
          alignSelf: menuOpen && "center",
        }}
      >
        <span>MicaSocial</span>

        {menuOpen ? (
          <>
            <Link
              to="/"
              style={{
                textDecoration: "none",
                color: "black",
                display: "flex",
              }}
            >
              <HomeRoundedIcon
                className="home-icon"
                style={{ display: menuOpen ? "block" : "none" }}
                onClick={() => setmenuOpen(!menuOpen)}
              />
              <span>Home</span>
            </Link>
            <Link
              to={`/profile/${currentUser?.id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div className="myUser">
                <span>Your Profile</span>
              </div>
            </Link>
            <Link
              to="/login"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              
              <span>Logout</span>
            </Link>
            <i class="bx bx-x" onClick={() => setmenuOpen(!menuOpen)}></i>
          </>
        ) : (
          <AppsRoundedIcon
            className="menu-icon"
            onClick={() => setmenuOpen(!menuOpen)}
          />
        )}
      </div>

      <div className="right">
        <Link
          to={`/profile/${currentUser?.id}`}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <div className="myUser">
            <img
              src={
                currentUser.profileImg
                  ? currentUser.profileImg
                  : "https://wiki.fluidproject.org/images/icons/profilepics/anonymous.png"
              }
              alt=""
            />
            <span>
              {currentUser.firstName} {currentUser.lastName}
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
