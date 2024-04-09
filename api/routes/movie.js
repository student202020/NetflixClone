const express = require("express");
const verify = require("../verifyToken")
const Movie = require("../models/Movie");

const router = express.Router()

//CREATE
router.post("/", verify, async (req, res) => {
    if (req.user.isAdmin) {
      const newMovie = new Movie(req.body);
      try {
        const savedMovie = await newMovie.save();
        res.status(201).json(savedMovie);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(403).json("You are not allowed!");
    }
  });
  

//UPDATE
router.put("/:id", verify, async(req, res) =>{
    if(req.user.isAdmin){
    try{
        const updatedMovie = await Movie.findByIdAndUpdate(req.params.id,
            {$set:req.body},
            {$new: true})
       
        res.status(200).json(updatedMovie)
    }catch(err){res.status(500).json(err)}
    
    }else{res.status(500).json("You are not allowid to do thaat!")}
    
    })
//DELETE
router.delete("/:id", verify, async(req, res) =>{
    if(req.user.isAdmin){
    try{
        await Movie.findByIdAndDelete(req.params.id)
       
        res.status(200).json("Movie has been deleted")
    }catch(err){res.status(500).json(err)}
    
    }else{res.status(500).json("You are not allowid to do thaat!")}
    
    })
//GET ONE
router.get("/:id", verify, async(req, res) =>{
  
    try{
        const movie = await Movie.findById(req.params.id)
       
        res.status(200).json(movie)
    }catch(err){res.status(500).json(err)}
    
    
    })
//GET ALL
router.get("/",  async(req, res) =>{
    //if(req.user.isAdmin){
        const query = req.query.new
    try{
        const movies = query ? await Movie.find().sort({id:-1}).limit(10) : await Movie.find()
       
        res.status(200).json(movies)
    }catch(err){res.status(500).json(err)}
    
    //}else{res.status(500).json("You are not allowid to do thaat!")}
    
    })

//GET RANDOM
router.get("/",  async (req, res) => {
  const type = req.query.type;
  let movie;
  try {
    if (type === "series") {
      movie = await Movie.aggregate([
        { $match: { isSeries: true } },
        { $sample: { size: 10 } },
      ]);
    } else {
      movie = await Movie.aggregate([
        { $match: { isSeries: false } },
        { $sample: { size: 10 } },
      ]);
    }
    res.status(200).json(movie);
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;