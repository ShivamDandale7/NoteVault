import React,{useContext} from 'react'
import NoteContext from './context/notes/NoteContext';

export const Noteitem = (props) => {
    const context = useContext(NoteContext);
    const {note,updateNote} = props;
    const {deletenote} = context;


  return ( 
    <div className='col-md-3'>
    {/* {note.title}
    {note.description} */}
     <div className="card my-3  rounded-2 text-dark">
     <div className="card-body">
      <div className="d-flex align-items-center">
      <h5 className="card-title">{note.title}</h5>
         <i className="fa-solid fa-trash mx-2" onClick={()=>{deletenote(note._id); props.showAlert("Notes Deleted Successfully", "success");} }></i>
         <i className="fa-solid fa-file-pen mx-2" onClick={()=>{updateNote(note)}}></i>
      </div>
         <p className="card-text">{note.description}</p>
  </div>
</div>
</div>

  )
}
