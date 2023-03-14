import React,{useContext} from 'react'
import NoteContext from './context/notes/NoteContext';
// import { useEffect } from 'react';

export const About = () => {
    const a = useContext(NoteContext);

    // useEffect(() => {
    //   a.update(); 
    //   // eslint-disable-next-line
    // }, [])
    

  return (
    // <div>This Project is Created by {a.state.name} from class {a.state.class}</div>
    <div>This is about page</div>
  )
}
