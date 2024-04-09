const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const verify = require("../verifyToken");

const router = express.Router()

//UPDATE User

router.put("/:id", verify,  async(req, res) =>{
    if(req.user.id === req.params.id || req.user.isAdmin)
    try{
        const updatedUser = await User.findByIdAndUpdate(req.params.id,
            {$set: req.body},
            {new: true}
            )
            res.status(200).json(updatedUser)
    }catch(err){
        res.status(500).json(err)
    }
else{res.status(500).json("You are not allowed to do that!")}


})

//DELETE User

router.delete("/:id", verify,  async(req, res) =>{
    if( req.user.id === req.params.id  || req.user.isAdmin)
    try{
        await User.findByIdAndDelete(req.params.id)
            res.status(200).json("User has been deleted!")
    }catch(err){
        res.status(500).json("Neka greska!")
    }
else{res.status(500).json("You are not allowed to do that!")}

})
//GET USER
router.get("/:id", async(req, res) =>{
    
    try{
        const user = await User.findById(req.params.id)
        const {password, ...other} = user._doc
        res.status(200).json(other)
    }catch(err){
        res.status(500).json(err)
    }


})

//GET ALL USER
router.get("/", verify, async(req, res) =>{
    if(req.user.isAdmin){
        const query = req.query.new
        try{
            const users = query ? await User.find().sort({id: -1}).limit(5) : await User.find()
            const {password, ...other} = users._doc
            res.status(200).json(other)
        }catch(err){
            res.status(500).json(err)
        }
    }else{res.status(500).json("You can not do that!")}
   
})

//GET USER STATS






module.exports = router;