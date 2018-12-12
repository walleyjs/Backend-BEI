const mongoose =require("mongoose");

const answerSchema=new mongoose.Schema({
    answer:{type:String,required:true},
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    response:{type:Boolean,default:false},
    comment:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "comment"
        }
    ]
});
module.exports=mongoose.model("Answer",answerSchema);