const mongoose = require("mongoose")

const listSchema = new  mongoose.Schema({
title: {type:String, require:true},
type: { type: String },
genre: {type:String, require:true},
content: {type:Array, default:[]},
},
{timestamps:true})

module.exports = mongoose.model("List", listSchema)