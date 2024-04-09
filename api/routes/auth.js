const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router()
//REGISTER
router.post("/register", async (req, res) =>{
    try{
    const salt = await bcrypt.genSalt(10)
    const hasPass = await bcrypt.hash(req.body.password, salt)
  
    const newUser = new User({
       username:req.body.username,
       email: req.body.email,
       isAdmin: req.body.isAdmin,
       img:req.body.img,
       password: hasPass 
    })
   
        const savedUser = await newUser.save()
        res.json(savedUser)
        console.log("User has been registered")

    }catch(err){res.status(500).json("Error")}

})
//LOGIN
router.post("/login", async (req, res) =>{
    try {
    const user = await User.findOne({ username: req.body.username });
    if(!user) {return console.log("Not registered!")};
    const checkPassword = await bcrypt.compare(req.body.password, user.password)
    if(!checkPassword) {return console.log("Wrong credentials!")}
 
        
        const { password, ...others } = user._doc;
        const token = jwt.sign(
            {
              id: user._id,
              isAdmin: user.isAdmin,
            },
            process.env.KEY,
            {expiresIn:"3d"}
          );
      

        res.status(200).json({...others, token});
        console.log("User has been loged")
        console.log(token)
        console.log(others)
      
    }catch(err){return console.log("Greska kod logina")}
})

module.exports = router;