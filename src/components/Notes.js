import React,{useContext,useRef,useEffect,useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { Addnote } from './Addnote';
import NoteContext from './context/notes/NoteContext';
import { Noteitem } from './Noteitem';


export const Notes = (props) => {
  
  const {showAlert} = props;
    const context = useContext(NoteContext);
    const {notes,getNotes,editnote} = context;
    const ref = useRef(null)
    const refClose = useRef(null)
    const [note, setnote] = useState({id:"", etitle:"",edescription:"",etag:"default"}) 

    let navigate = useNavigate();
    useEffect(() => {
      if(localStorage.getItem('token')){
        getNotes();
        // eslint-disable-next-line
      }
      else{
        navigate('/login')
        // eslint-disable-next-line
      }
    }, [])

    const updateNote=(currentNote)=>{
      ref.current.click();
      console.log("Clicked");
      setnote({id:currentNote._id,etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag});
      
    }

    const handleClick=(e)=>{
      console.log("Updating Note...",note);
      editnote(note.id, note.etitle, note.edescription, note.etag);
      e.preventDefault();
      refClose.current.click();
      props.showAlert("Notes Updated Successfully", "success")
  }
  
  const onChange=(e)=>{
     setnote({...note,[e.target.name]:e.target.value})

  }

  return (
    <>
    <Addnote showAlert={showAlert} />
   
<button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal
</button>

<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <form className='my-3'>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">title</label>
            <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} onChange={onChange} minLength={5} required aria-describedby="emailHelp"/>
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Description</label>
            <input type="text" className="form-control" id="edescription" name="edescription"  value={note.edescription} onChange={onChange} minLength={5} required/>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Tag</label>
            <input type="text" className="form-control" id="etag" name="etag"  value={note.etag} onChange={onChange} />
          </div>
          
</form>
      </div>
      <div className="modal-footer">
        <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button disabled ={note.etitle.length <5 || note.edescription.length <5} onClick={handleClick} type="button" className="btn btn-primary">Update</button>
      </div>
    </div>
  </div>
</div>
    
    <div className="mx-auto bg-light mt-5 h-60 w-50 align-items-center justify-content-center border border-dark px-3 py-2 rounded-3 border-5">
        <h2>Your Notes</h2>
        <div className="container mx-2">
        {notes.length===0 && "No Notes to display"}
        </div>
        {notes.map((note)=>{
             return <Noteitem key={note._id} updateNote={updateNote} note={note}/>
    })}
</div>
</>
  )
}
