
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import "./login.scss";

const Login = () => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const [err, setErr] = useState(null);

  const navigate = useNavigate()

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const {login} = useContext(AuthContext)

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      
      await login(inputs);
      navigate("/")
     
    } catch (err) {
      setErr(err.response.data);
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
                     
                     <button onClick={handleLogin}>Login</button>
                    
                     
                    </form>
                    </div>

            </div>
        </div>
    
    )
}

export default Login