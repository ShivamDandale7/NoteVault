import React,{useEffect}from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom';

export const NavBar = () => {
    let navigate = useNavigate();
    let location = useLocation();
useEffect(() => {
    // Google Analytics
    console.log(location.pathname);
}, [location]); 

const handleLogout=()=>{
  localStorage.removeItem('token');
  navigate('/login');
}

  return (
    <>
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
  <div className="container-fluid">
    <a className="navbar-brand" href="#">NoteVault</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname==="/" ? "active":""}`} aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname==="/about"?"active":""}`} to="/about">About</Link>
        </li>
      </ul>
      {!localStorage.getItem('token' )?<form className="d-flex" role="search">
       <Link className="btn btn-success mx-1" to="/login" type="submit">Login</Link>
        <Link className="btn btn-success mx-1" to="/signup" type="submit">Signup</Link>
      </form>:<button className="btn btn-success mx-1" onClick={handleLogout}>Logout</button> }
    </div>
  </div>
</nav>
    </>
  )
}
