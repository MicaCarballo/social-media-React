import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "./register.scss"
import swal from 'sweetalert';
import Loading from '../../components/loading/Loading';


const Register = () => {
  const [isLoading, setIsLoading] = useState(false);
const [inputs, setinputs] = useState({
  
  firstName: "",
  lastName: "",
  email: "",
  nickName: "",
  password: "",
  gender: "",
  birthday: "",
  profileImg:""
})
const [err, seterr] = useState(null)

const handleChange = async e =>{
  setinputs(prev =>({...prev,[e.target.name]: e.target.value}))
}


const handleClick = async e => {
  e.preventDefault()
try{
  setIsLoading(true)
  await axios.post("https://micacarballo-social-media-api.onrender.com/api/v1/users", inputs)
  swal("User Created!", {
    buttons: false,
    icon:'success',
    timer: 1500,
  })
}catch(err){
seterr(err.response.data.message)
}finally {
  setIsLoading(false); // set loading back to false
}
}



  return (
    <div className='register'>
            <div className="card">
                <div className="left">
                    <h1>SocialMica</h1>
                    <p>
                       Make connecting with friends easy and fun
                    </p>
                    <span>Already have an account ?</span>
                 
                    <Link to="/login">
                    <button>Login</button>
                    </Link>
                </div>
                <div className="right">
                    <h1>Register</h1>
                    <form action="">
                      <input type="text" placeholder='first name*' name='firstName' onChange={handleChange}></input>
                      <input type="text" placeholder='last name*' name='lastName'onChange={handleChange}></input>
                      <input type="email"placeholder='email*' name='email'onChange={handleChange}/>
                      <input type="password"placeholder='password*' name='password' onChange={handleChange}/>
                      <input type="text"placeholder='username*' name='nickName' onChange={handleChange}/>
                      <input type="text"placeholder='gender' name='gender'onChange={handleChange}/>
                      <input type="text"placeholder='birthday e.g: YYYY/MM/DD*' name='birthday' onChange={handleChange}/>
                      <input type="text"placeholder='profile picture *' name='profileImg' onChange={handleChange}/>
                      {err && "please enter valid data"  }
                      
                      <button onClick={handleClick}>{ isLoading ? <Loading/> : "Register"}</button>
                    </form>
                    </div>

            </div>
        </div>
  )
}

export default Register