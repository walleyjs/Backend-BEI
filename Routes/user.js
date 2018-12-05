const express=require("express");
const router=express.Router({mergeParams:true});
const mongoose=require("mongoose");
let User =require("../models/user");

router.get("/",(req,res)=>{
    User.register()
});

module.exports=router;