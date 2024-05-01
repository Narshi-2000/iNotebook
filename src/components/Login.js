import React, {useState} from 'react'
import { useNavigate } from "react-router-dom";
import '../App.css';

const Login = (props) => {

  const [credentials, setCredentials] = useState({email:"", password:""});
  let navigate = useNavigate(); 

  const onChange =(e) =>{
    setCredentials({
        ...credentials, [e.target.name]: e.target.value
    })
  }
  const handleSubmit=async(e)=>{
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/login",  {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({email:credentials.email, password: credentials.password})
      })
      const json =await response.json();
      console.log(json);

      if(json.success){
        //save the auth token and redirect
        localStorage.setItem("token", json.authtoken);
        navigate("/");
        props.showAlert("Successfully signed in", "success");
      }else{
        props.showAlert("Wrong credentials!! sign up or enter right credentials..", "danger");
      }
  }
  return (
    <div className="outer-div">
    <div className="login-div mt-3">
      <h2>Login to iNotebook</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control" id="email" name="email" value={credentials.email} aria-describedby="emailHelp"  onChange={onChange} />
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" value={credentials.password} name="password"  onChange={onChange} />
        </div>
        
        <button type="submit" className="btn btn-custom">Login</button>
      </form>
    </div>
    </div>
  )
}

export default Login
