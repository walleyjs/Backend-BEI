const express=require("express");
var router=express.Router({mergeParams:true});
const mongoose = require("mongoose");
let Answer = require("../models/answer");
let Question=require("../models/questions");
let questionRoute=require("./questions");


// router.post("/:id",(req,res)=>{
//         let answer=req.body.answer;
//         let author=req.body.author;
//         let response=req.body.response;
// });

router.post("/:id",(req,res)=>{
        let answer=req.body.answer;
        let author=req.body.author;
        let response=req.body.response;
        // console.log("======owk post question ans err==")
    Question.findById(req.params.id,(err,question)=>{
        
        if (err) {
            console.log("======post question ans err==");
            console.log(err);
            res.redirect("/question/" + question._id);
            

        } else {
        
            let anscont={
                answer:answer,
                author:author,
                response:response
            }
            Answer.create(anscont,(err,ans)=>{
                if (err) {
                    console.log(err);
                    console.log("===========post ans err========");                    
                    res.redirect("/question/" + question._id)
                } else {
                    ans.author.username=req.user.username;
                    ans.author.id=req.user._id;
                    ans.save();
                    question.answer.push(ans._id);
                    question.save();
                    console.log("=======answer saved========");
                    res.redirect("/question/"+ question._id);
                }
            });
        }
    });
});
module.exports=router;