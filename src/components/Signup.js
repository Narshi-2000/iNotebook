import React, {useState} from 'react'
import { useNavigate } from "react-router-dom";

const Signup = (props) => {

    const [credentials, setCredentials] = useState({name:"", email:"", password:"", cpassword:""});
    let navigate = useNavigate(); 
  
    const onChange =(e) =>{
      setCredentials({
          ...credentials, [e.target.name]: e.target.value
      })
    }
    const handleSubmit=async(e)=>{
      e.preventDefault();
      const {name, email, password} = credentials;
      const response = await fetch("http://localhost:5000/api/auth/createuser",  {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({name, email, password})
        })
        const json =await response.json();
        console.log(json);
        
        if(json.success){
            //save the auth token and redirect
            localStorage.setItem("token", json.authtoken);
            navigate("/");
            props.showAlert("Account created successfully", "success");
          }else{
            props.showAlert("User with same credentials already exists", "danger");
          }
    }

  return (
    <div className="outer-div">
    <div className="mt-3 login-div">
    <h2>Signup to iNotebook</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
            <label htmlFor="username" className="form-label">Name</label>
            <input type="text" className="form-control" id="username" name="name" aria-describedby="emailHelp" onChange={onChange} />
        </div>
        <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" onChange={onChange} />
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" name="password" onChange={onChange} required minLength={5}/>
        </div>
        <div className="mb-3">
            <label htmlFor="cpassword" className="form-label">Confirm Password</label>
            <input type="password" className="form-control" id="cpassword" name="cpassword" onChange={onChange} required minLength={5}/>
        </div>
        
        <button type="submit" className="btn btn-custom">Signup</button>
      </form>
    </div>
    </div>
  )
}

export default Signup
