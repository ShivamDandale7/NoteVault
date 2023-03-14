import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'

export const Signup = (props) => {
  let navigate = useNavigate();
 
    const [credentials, setcredentials] = useState({name:"", email:"", password:"", cpassword:""})
    const handleSubmit=async(e)=>{
      const {name,email,password} = credentials;
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/createuser", {
            method: 'POST', 
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify({name,email,password})
        });
        const json = await response.json();
        console.log(json);
        if(json.success){
          // save authtoken and redirect
          localStorage.setItem('token',json.authtoken);
          navigate("/login");
            props.showAlert("Account Created Successfully", "success")
        }
        else{
            props.showAlert("Invalid Credentials", "dander");
        }
    }

    const onChange=(e)=>{
        setcredentials({...credentials,[e.target.name]:e.target.value})
   
     }

  return (
      <div className="mx-auto bg-light mt-5 h-60 w-50 align-items-center justify-content-center border border-dark px-5 py-5 rounded-end-circle border-5">
    <form onSubmit={handleSubmit}>
    <h2 className='title '>Sign Up</h2>
      <div className="mb-2 w-50">
      <label htmlFor="name" className="form-label">Name</label>
      <input type="text" className="form-control border-dark rounded-2 border-2 bg-secondary text-light" id="name" name="name"  onChange={onChange}  aria-describedby="nameHelp"/>
    </div>
    <div className="mb-3 w-50">
      <label htmlFor="email" className="form-label">Email address</label>
      <input type="email" className="form-control border-dark rounded-2 border-2 bg-secondary w-30 text-light" id="email" name="email" onChange={onChange} aria-describedby="emailHelp"/>
      <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
    </div>
    <div className="mb-3 w-50">
      <label htmlFor="password" className="form-label">Password</label>
      <input type="password" className="form-control border-dark rounded-2 border-2 bg-secondary text-light" id="password"  onChange={onChange} minLength={5} required name="password"/>
    </div>
    <div className="mb-3 w-50">
      <label htmlFor="password" className="form-label">Confirm Password</label>
      <input type="password" className="form-control border-dark rounded-2 border-2 bg-secondary text-light" id="cpassword" onChange={onChange} minLength={5} required name="cpassword"/>
    </div>
    <button type="submit" className="btn btn-primary">Submit</button>
  </form>
    </div>
  )
}
