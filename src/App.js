import './App.css';
import './style.css'
import { NoteState } from './components/context/notes/NoteState';
import {
  Routes,
  Route,
} from "react-router-dom";
import { NavBar } from './components/NavBar';
import { Home } from './components/Home';
import { About } from './components/About';
import { Alert } from './components/Alert';
import { Signup } from './components/Signup';
import { Login } from './components/Login';
import { useState } from 'react';

function App() {
  const [alert, setAlert] = useState(null)
  const showAlert=(message,type)=>{
    setAlert({
     msg:message,
     type:type
    })
    setTimeout(() => {
     setAlert(null);
    }, 2000);
}

  return (
    <>
    <NoteState>
    <NavBar/>
      <Alert alert={alert} />
    <div className="container">
    <Routes>
      <Route exact path="/" element={<Home showAlert={showAlert}/>} />
      <Route exact path="/about" element={<About />} />
      <Route exact path="/login" element={<Login showAlert={showAlert}/>} />
      <Route exact path="/signup" element={<Signup showAlert={showAlert}/>} />
    </Routes>
    </div>
    </NoteState>
    </>
  );
}

export default App;
