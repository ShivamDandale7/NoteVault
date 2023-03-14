import React,{useContext,useState} from 'react'
import NoteContext from './context/notes/NoteContext';

export const Addnote = (props) => {

    const context = useContext(NoteContext);
    const {addnote} = context;
    const [note, setnote] = useState({title:"","description":"",tag:""}) 

    const handleClick=(e)=>{
        e.preventDefault();
       addnote(note.title,note.description,note.tag);
       setnote({title:"",description:"",tag:""})
       props.showAlert("Notes Added Successfully", "success")
    }
    
    const onChange=(e)=>{
       setnote({...note,[e.target.name]:e.target.value})
    }
  return (

    <div className="mx-auto bg-light mt-5 h-60 w-50 align-items-center justify-content-center border border-dark px-3 py-2 rounded-3 border-5">
    <h2 className='mt-5'>Add a Note</h2>

    <form className='my-3'>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Title</label>
    <input type="text" className="form-control border-dark rounded-2 border-2 w-30 text-light" id="title" name="title" value={note.title} onChange={onChange} minLength={5} required aria-describedby="emailHelp" />
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Description</label>
    <input type="text" className="form-control border-dark rounded-2 border-2 w-30 text-light" id="description" name="description" value={note.description} onChange={onChange} minLength={5} required/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Tag</label>
    <input type="text" className="form-control border-dark rounded-2 border-2 w-30 text-light" id="tag" name="tag"value={note.tag} onChange={onChange}/>
  </div>
  <button disabled={note.title.length <5 || note.description.length <5} type="submit" className="btn btn-primary" onClick={handleClick}>Add</button>
</form>
</div>
  )
}
