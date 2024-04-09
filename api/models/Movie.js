const mongoose = require("mongoose")

const movieSchema = new  mongoose.Schema({
    
title: {type:String, require:true},
genre: {type:String, require:true},
img: {type:String, default:""},
imgTitle: {type:String, default:""},
imgSm: { type: String, default:"" },
trailer: {type:String, default:""},
video: {type:String, default:""},
duration: {type:String, require:true},
year: {type:String, require:true},
desc: {type:String, require:true},
isSeries:{type:Boolean, default:false}
},
{timestamps:true})

module.exports = mongoose.model("Movie", movieSchema)