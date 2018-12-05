const express=require("express");
var router=express.Router({mergeParams:true});
const mongoose = require("mongoose");
let Question = require("../models/questions");
router.get("/", (req, res) => {
    res.send("question");
});

module.exports=router;