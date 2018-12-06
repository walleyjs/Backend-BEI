const express=require("express");
const router=express.Router({mergeParams:true});
const mongoose=require("mongoose");
var passport=require("passport");
let User =require("../models/user");

router.get("/signup",(req,res)=>{
    res.render("users/userSignup.ejs");
});
router.post("/signup",(req,res)=>{
var newUser = new User({username:req.body.username});
User.register(newUser,req.body.password,(err,user)=>{
    if (err) {
        console.log(err);
        return res.redirect("/user/signup");
    } else {
        passport.authenticate("local")(req,res,()=>{
        res.redirect("/");
                });
            }
        });
    });
    router.get("/login",(req,res)=>{
    res.render("users/userLogin.ejs");
});
router.post("/login",passport.authenticate("local",{
    successRedirect:"/",
    failureRedirect:"/user/login"
}),(req,res)=>{

});
module.exports=router;