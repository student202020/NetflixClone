const express = require("express");
const verify = require("../verifyToken")
const List = require("../models/List");

const router = express.Router()

//CREATE
router.post("/", verify, async (req, res) => {
    if (req.user.isAdmin) {
      const newList = new List(req.body);
      try {
        const savedList = await newList.save();
        res.status(201).json(savedList);
      } catch (err) {
        res.status(500).json("greska kod kreiranja liste");
      }
    } else {
      res.status(403).json("You are not allowed!");
    }
  });
  //DELETE
  router.delete("/:id", verify, async (req, res) => {
    if (req.user.isAdmin) {
     
      try {
        await List.findByIdAndDelete(req.params.id);
        res.status(201).json("Deleted");
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(403).json("You are not allowed!");
    }
  });
  //GET RANDOM
  router.get("/",  async (req, res) => {
    const typeQuery = req.query.type;
    const genreQuery = req.query.genre;
    let list = [];
    try {
      if (typeQuery) {
        if (genreQuery) {
          list = await List.aggregate([
            { $sample: { size: 10 } },
            { $match: { type: typeQuery, genre: genreQuery } },
          ]);
        } else {
          list = await List.aggregate([
            { $sample: { size: 10 } },
            { $match: { type: typeQuery } },
          ]);
        }
      } else {
        list = await List.aggregate([{ $sample: { size: 10 } }]);
      }
      res.status(200).json(list);
    } catch (err) {
      res.status(500).json(err);
    }
  });
module.exports = router;