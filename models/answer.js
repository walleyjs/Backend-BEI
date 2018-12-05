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
    response:{type:Boolean,default:false}
});
module.export=mongoose.model("Answer",answerSchema);