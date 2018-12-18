const express=require("express");
var router=express.Router({mergeParams:true});
const mongoose = require("mongoose");
let Question = require("../models/questions");

router.get("/", (req, res) => {
    if (req.query.search) {
        const regex=new RegExp(escapeRegexp(req.query.search));
        Question.find({question:regex},(err,questions)=>{
            if (err) {
                console.log(err);
            } else {
            res.render("questions/post.ejs", {
                questions: questions
            });
                
            }
        });
    } else {
        Question.find({}, (err, questions) => {
            if (err) {
                console.log(err);
                console.log("=========question get err========");
            } else {
                res.render("questions/post.ejs", {
                    questions: questions
                });
            }
        });
    }
    
});
router.get("/askquestion",(req,res)=>{
    res.render("questions/askQuestion.ejs");
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
    Question.create(questions,(err,questions)=>{
        if (err) {
            console.log(err);
            console.log("========question post err=======");
            res.redirect("/question");
        } else {
            res.redirect("/question");
            console.log(questions);

        }
        
    });
});
router.get("/:id",(req,res)=>{
    Question.findById(req.params.id).populate("answer").exec((err,question)=>{
        if (err) {
            console.log(err);
        } else {
            res.render("questions/question.ejs",{question:question});
        }
    });
});
router.delete("/:id",(req,res)=>{
    Question.findByIdAndRemove(req.params.id,(err,delquest)=>{
        if (err) {
            console.log(err);
            console.log("===============questiondel errr=====");
        } else {
            console.log("===============questiondel deleted=====");
            console.log(delquest);
            res.redirect("/question")
        }
    });
});

function escapeRegexp(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};
module.exports=router;