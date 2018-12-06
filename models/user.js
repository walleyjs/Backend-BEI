const mongoose =require("mongoose");
var passportLocalMongoose=require("passport-local-mongoose");
const userSchema=new mongoose.Schema({
    username:{type:String,required:true},
    password:String

});
userSchema.plugin(passportLocalMongoose);
module.exports=mongoose.model("User",userSchema);