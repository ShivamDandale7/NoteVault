const express = require('express');
const router = express.Router();
const Notes  = require('../models/Notes');
const fetchUser = require('../middleware/fetchUser');
const { body, validationResult } = require('express-validator');
const { findById, findByIdAndUpdate } = require('../models/User');


//<----------------- ROUTE 1 : GET All Notes of User using: GET ./api/notes/fetchallnotes  Login Required---------------------------------->
router.get('/fetchallnotes',fetchUser, async (req,res)=>{
   try {
    let notes = await Notes.find({user:req.user.id});
    res.json(notes)
   } catch (error) {
    console.error(error.message);
    res.status(500).send("Some Internal Error Occured");
   } 
});

//<----------------- ROUTE 2 :Add new notes of User using: POST ./api/notes/addnotes  Login Required---------------------------------->
router.post('/addnote',fetchUser,[
    body('title','Enter a valid title').isLength({min:3}),
    body('description','Description should have atleast 5 characters').isLength({min:5})
],async(req,res)=>{

    try {
        const {title,description,tag} = req.body;
        // If there are any errors return Bad request and errors
        // for this we imported express-validation package
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        
    
        const note = new Notes({
            title,description,tag,user :req.user.id
    })
      const savedNote = await note.save();
      res.send(savedNote)
      console.log("Notes added successfully");
    
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some Internal Error Occured");
    }
   
});

//<----------------- ROUTE 3 :Update Existing notes of User using: PUT ./api/notes/updatenotes  Login Required---------------------------------->
router.put('/updatenotes/:id',fetchUser,async(req,res)=>{
    try {
        const {title,description,tag} = req.body;
        // Create a newNote object
        const newNote = {};
        if(title){newNote.title = title};
        if(description){newNote.description = description};
        if(tag){newNote.tag = tag};
    
        // Find the note to be updated and update it
        let note = await Notes.findById(req.params.id);
        if(!note){
            return res.status(400).send("Not Found");
        }
        if(note.user.toString() != req.user.id){
            return res.status(401).send("Not allowed");
        }
        note = await Notes.findByIdAndUpdate(req.params.id,{$set: newNote}, {new:true})
        res.json({note});
        
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some Internal Error Occured");
    }
})


//<----------------- ROUTE 4 :Delete  a note of User using: DELETE ./api/notes/deletenotes  Login Required---------------------------------->
router.delete('/deletenotes/:id',fetchUser,async(req,res)=>{
   try {
    const {title,description,tag} = req.body;
    
    // Find the note to be deleted and delete it
    let note = await Notes.findById(req.params.id);
    if(!note){
        return res.status(400).send("Not Found");
    }
    // Checks whether user owns the note or not
    if(note.user.toString() != req.user.id){
        return res.status(401).send("Not allowed");
    }

    note = await Notes.findByIdAndDelete(req.params.id)
    res.json({"Success: Note Deleted Succesfully": note});
    
   } catch (error) {
    console.error(error.message);
    res.status(500).send("Some Internal Error Occured");
   }
   
   
})


module.exports = router