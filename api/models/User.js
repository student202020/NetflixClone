const mongoose = require("mongoose")

const userSchema = new  mongoose.Schema({
email: {type:String, require:true},
username: {type:String, require:true},
password: {type:String, require:true},
img: {type:String, default:""},
isAdmin: {type:Boolean, default:false},
},
{timestamps:true})

module.exports = mongoose.model("User", userSchema)