import { useState } from "react";
import React from "react";
import axios from "axios";
import "./Login.css";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username,setUsername]=useState('')
  const [password,setPassword]=useState('')
  const navigate = useNavigate()

  function handleSubmit(event){
    event.preventDefault();
    axios.post("http://localhost:3000/login",{username,password})
    .then(res=>{console.log(res)
      navigate("/admin")
    })
    .catch(err=>console.log(err)); 

  }
  return (
    <div className="signin-container">
      <h2>LogIn</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <input type="text" placeholder="Enter Username" className="input-field" onChange={e=>setUsername(e.target.value)}/>
        </div>
        <div className="input-group">
          <input type="password" className="input-field" placeholder="Enter Password" onChange={e=>setPassword(e.target.value)}/>
        </div>
        <div>
          <button className="login-button">Log In</button>
        </div>
      </form>

    </div>
  );
}

export default Login;

