const express=require("express");
var router=express.Router({mergeParams:true});
const mongoose = require("mongoose");
let Question = require("../models/questions");
let User = require("../models/user");
router.get("/", (req, res) => {
    Question.find({},(err,question)=>{
        if (err) {
            console.log(err);
            console.log("=========question get err========");
        } else {
            res.render("questions/post.ejs");
        }
    });
});
router.post("/",(req,res)=>{
    let question=req.body.question;
    let author={
        id:req.user._id,
        username:req.user.username
    };
    let questions={
        question:question,
        author:author
    };
    Question.create(questions,(err,result)=>{
        if (err) {
            console.log(err);
            console.log("========question post err=======");
            res.redirect("/question");
        } else {
            res.redirect("/question");
            console.log(result);

        }
        
    });
});

module.exports=router;