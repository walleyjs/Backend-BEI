const mongoose =require("mongoose");

const userSchema=new mongoose.Schema({
    username:{type:String,required:true},
    password:String

});
module.export=mongoose.model("User",userSchema);