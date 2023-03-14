const jwt = require('jsonwebtoken');

const JWT_SECRET = "helloworldprogramming";

const fetchUser = (req,res,next)=>{
     // Get the user from the jwt token and add it to req object
     const token  = req.header('auth-token')
     if(!token){
        return res.status(400).json({error:"Please authenticate with a valid token"})
     }

     try {
        const string = jwt.verify(token,JWT_SECRET);
        req.user = string.user;
        next()
     } catch (error) {
        return res.status(400).json({error:"Please authenticate with a valid token"})
     }
   
}

module.exports = fetchUser