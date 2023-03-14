import React,{useState} from 'react'
import {useNavigate } from 'react-router-dom'

export const Login = (props) => {
  let navigate = useNavigate();
 
    const [credentials, setcredentials] = useState({email:"", password:""})
    const handleSubmit=async(e)=>{
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST', 
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify({email:credentials.email,password:credentials.password})
        });
        const json = await response.json();
        console.log(json);
        if(json.success){
          // save authtoken and redirect
          localStorage.setItem('token',json.authToken);
          props.showAlert("Logged in Successfully", "success")
          navigate("/");
        }
        else{
            props.showAlert("Invalid Credentials", "danger")
        }
    }

    const onChange=(e)=>{
        setcredentials({...credentials,[e.target.name]:e.target.value})
   
     }

  return (
    <>
        <div className='mx-auto bg-light mt-5 h-60 w-50 align-items-center justify-content-center border border-dark px-5 py-5 rounded-end-circle border-5' >
        <form onSubmit={handleSubmit}>
        <h2 className='title '>Login</h2>
      <div className="mb-3 w-50">
        <label htmlFor="email" className="form-email ">Email address</label>
        <input type="email" className="form-control bg-secondary text-light" id="email" name="email" value={credentials.email} onChange={onChange} aria-describedby="emailHelp"/>
        <div id="emailHelp" className="form-text ">We'll never share your email with anyone else.</div>
      </div>
      <div className="mb-3 w-50">
        <label htmlFor="password" className="form-password ">Password</label>
        <input type="password" className="form-control bg-secondary text-light" id="password" value={credentials.password} onChange={onChange} name="password"/>
      </div>
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
    </div>

{/* <div className="App bg-gray-900 h-screen w-screen relative overflow-hidden flex justify-center items-center">
      <div className="h-40-r w-40-r bg-gradient-to-r from-green-400 to-blue-500 rounded-full absolute left-2/3 -top-56 transform rotate-160 animate-pulse"></div>
      <div className="h-35-r w-35-r bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 rounded-full absolute top-96 -left-20 transform rotate-180 animate-pulse"></div>
      
        <div className="container h-96 w-96 bg-white bg-opacity-10 rounded-2xl shadow-5xl relative z-2 border border-opacity-30 border-r-0 border-b-0 backdrop-filter backdrop-blur-sm">
          <form className='h-full flex flex-col justify-evenly items-center'>
            <div className='text-white font-poppins text-2xl tracking-widest'>Login form</div>
            <input type="text" placeholder='username' className='input-text'/>
            <input type="password" placeholder='password' className='input-text'/>
            <input type="Submit" className='cursor-pointer font-poppins rounded-full px-5 py-1 bg-white bg-opacity-50 hover:bg-white hover:bg-opacity-80 '/>
          </form>
        </div>
    
    </div> */}
 </>
 


  )
}