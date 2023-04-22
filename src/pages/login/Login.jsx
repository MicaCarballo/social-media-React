
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../../components/loading/Loading";
import { AuthContext } from "../../context/authContext";

import "./login.scss";

const Login = () => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const [err, setErr] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // state variable for loading spinner


  const navigate = useNavigate()

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const {login} = useContext(AuthContext)

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true); // set loading to true
      await login(inputs);
         
  navigate('/')
       location.reload()
      
      
     
    } catch (err) {
      setErr(err.response.data);
    }finally {
      setIsLoading(false); // set loading back to false
    }
  };
       

    return (
      <div className='login'>
      <div className="card">
          <div className="left">
              <h1>SocialMica</h1>
              <p>
                  Make connecting with friends easy and fun
              </p>
              <span>Dont have an account yet?</span>
               <Link to="/register">
               <button>Register</button>
               </Link>
             
          </div>
          <div className="right">
              <h1>Login</h1>
              <form action="">
                <input type="email" placeholder='email' name='email' onChange={handleChange}></input>
                <input type="password"placeholder='password' name='password' onChange={handleChange}/>
               {err && "invalid email or password"}
               
               <button onClick={handleLogin} disabled={isLoading} className="login-btn"> {isLoading ? <Loading/> : "Login"}</button>
              
               
              </form>
              </div>

      </div>
  </div> )
}

export default Login