const mongoose = require("mongoose");
// config/database.js
mongoose.connect("mongodb://127.0.0.1:27017/Tailor",)

const db=mongoose.connection;

db.once('open',(err)=>{
    if(err){
        console.log(err)
        return false;
    }
    console.log("db is connected")
})
module.exports = db;