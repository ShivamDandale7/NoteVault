const express = require('express');
const router = express.Router();  //provide functionality for handling route matching, requests, and sending responses
const User  = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { findById } = require('../models/User');
const fetchUser = require('../middleware/fetchUser');

const JWT_SECRET = "helloworldprogramming";

//<----------------- ROUTE 1 : Create a User using: POST ./api/auth/createuser   DOESNT REQUIRE auth No Login Required---------------------------------->
router.post('/createuser',[
    body('name','Enter a valid name').isLength({min:3}),
    body('email','Enter a valid email').isEmail(),
    body('password','Password Length is short').isLength({min:5}),
],async(req,res)=>{
    let success = false;
    console.log(req.body);
    // res.send("heloo");

    // If there are any errors return Bad request and errors
    // for this we imported express-validation package
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success,errors: errors.array() });
    }

    try {
    // To Check Whether User with same email Already Exists
    let user = await User.findOne({email:req.body.email})
    if(user){
        return res.status(400).json({success,error:'Sorry User with this email already exists'})
    }

  // password is hashed to prevent from cyberattack
   const salt = await bcrypt.genSaltSync(10);
   const secPass = await bcrypt.hashSync(req.body.password, salt);


    // creating a new user
     user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      }) //.then(user => res.json(user))
      
      const data ={
        user:{
          id: user.id
        }
      }
      // Creating a unique authentification token for the user such that an outsider cannot access the users account
      const authToken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({success,authToken});
      
      //res.json({user});
    }
    // used to catch errors
      catch (error) {
        console.error(error.message);
        res.status(500).send("Some Internal Error Occured");
      }

    // res.send(req.body);
    // const user = User(req.body);
    // user.save();
})


//<----------------------------ROUTE 2 :AUTHENTICATE A User using: POST ./api/auth/login   No Login Required---------------------------------------------->
router.post('/login',[
    body('email','Enter a valid email').isEmail(),
    body('password','Enter a proper Password').exists(),
],async(req,res)=>{
  let success = false;

  // If there are any errors return Bad request and errors
    // for this we imported express-validation package
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
    }
     
    const {email,password} = req.body;
    try {
      let user = await User.findOne({email});
      if(!user){
        return res.status(400).json({success,error:"Please Enter Correct Credentials"})
      }
        const passwordCompare = await bcrypt.compare(password,user.password)
        if(!passwordCompare){
          return res.status(400).json({success,error:"Please Enter Correct Credentials"})
      }
        const data = {
          user:{
            id: user.id
          }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({success,authToken})
      
    } catch (error) {
      console.error(error.message);
      success = false;
      res.status(500).send(success,"Some Internal Error Occured");
    }
})


//<----------------------------------- ROUTE 3: Getting Logged in info of user using: POST ./api/auth/getuser   Login Required-------------------------------------->
router.post('/getuser',fetchUser,async(req,res)=>{

 try {
  let userId = req.user.id;
  const user = await User.findById(userId).select("-password") // it will not store and send password to maintain security
  res.send(user);
  
 } catch (error) {
  console.error(error.message);
  res.status(500).send("Some Internal Error Occured");
 }

})
module.exports = router