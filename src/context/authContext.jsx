import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("users")) || null
  );

  const login = async (inputs) => {

  

    const res= await axios.post("https://micacarballo-social-media-api.onrender.com/api/v1/auth/login",inputs,{
      
    })
  setCurrentUser(res.data)
  };

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(currentUser));
  }, [currentUser,login]);

  return (
    <AuthContext.Provider value={{ currentUser, login }}>
      {children}
    </AuthContext.Provider>
  );
};