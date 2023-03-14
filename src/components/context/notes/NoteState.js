import React from "react";
import NoteContext from "./NoteContext";
import { useState} from "react";

export const NoteState = (props) => {
   const host = "http://localhost:5000"
   const notesinitial = []

         const [notes, setnotes] = useState(notesinitial)
         

         // Get all notes
         const getNotes=async()=>{
            //  API CALL
            const response = await fetch(`${host}/api/notes/fetchallnotes`, { 
               method: 'GET', 
               headers: {
                  "Content-Type": "application/json",
                  "auth-token": localStorage.getItem('token')
               }
               
             });
             const json = await response.json();
             console.log(json);
             setnotes(json)
            }

         // Add a note
         const addnote=async(title,description,tag)=>{
         //  API CALL
         const response = await fetch(`${host}/api/notes/addnote`, { 
            method: "POST", 
            headers: {
               "Content-Type": "application/json",
               "auth-token": localStorage.getItem('token'),
            },
            body: JSON.stringify({title,description,tag}),
            
          });
           const note = await response.json();
            setnotes(notes.concat(note));
         }
         // Delete a note
         const deletenote=async(id)=>{
               // API CALL
               const response = await fetch(`${host}/api/notes/deletenotes/${id}`, {
                 method: "DELETE", 
                 headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem('token')
                 }
                 
               });
               const json = await response.json();
               console.log(json);

            console.log("Deleting node");
            const newNote = notes.filter((note)=>{return note._id !==id});
            setnotes(newNote)
         }
         // Edit a note
         const editnote=async(id,title,description,tag)=>{
          // API CALL
          const response = await fetch(`${host}/api/notes/updatenotes/${id}`, {
            method: "PUT", 
            headers: {
               "Content-Type": "application/json",
               "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({title,description,tag}),
          });
          const json = await response.json();
               console.log(json);

          // Logic to edit notes
          let newNotes = JSON.parse(JSON.stringify(notes));
            for(let index=0; index<notes.length; index++){
                 let element = newNotes[index];
                 if(element._id === id){
                  newNotes[index].title = title;
                  newNotes[index].description = description;
                  newNotes[index].tag = tag;
                  break;
                 }
            }
            setnotes(newNotes);
         } 
      
  return (
     <NoteContext.Provider value={{notes,addnote,deletenote,editnote,getNotes}}>
        {props.children}
     </NoteContext.Provider>
  )
  }

