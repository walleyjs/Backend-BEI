const express=require("express");
var router=express.Router({mergeParams:true});
const mongoose = require("mongoose");
let Answer = require("../models/answer");
let Comment = require("../models/comment");
let middleware=require("../middleware");
router.post("/:ansid", middleware.isLoggedIn,(req, res) => {
    let comment=req.body.comment;
    let author=req.body.author;
    Answer.findById(req.params.ansid,(err,ans)=>{
        if (err) {
            console.log(err);
        } else {
            let commentCont = {
                comment: comment,
                author: author,   
            };
            Comment.create(commentCont,(err,comment)=>{
                comment.author.username=req.user.username;
                comment.author.id=req.user._id;
                comment.save();
                ans.comment.push(comment._id);
                ans.save();
                res.redirect("/answer/"+req.params.id+"/"+ans._id);
            });
        }
    });
    
});

module.exports = router;
