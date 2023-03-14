const mongoose = require('mongoose');

const MongoURI = "mongodb://127.0.0.1:27017/inotebook?directConnection=true";
//  const MongoURI = " mongodb://127.0.0.1:27017/?compressors=disabled&gssapiServiceName=mongodb";
const connectToMongo = () =>{
    mongoose.connect(MongoURI,()=>{
        console.log("Connected To mongoose Succesfully");
    })
}
module.exports = connectToMongo