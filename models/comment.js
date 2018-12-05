const mongoose =require("mongoose");

const commentSchema=new mongoose.Schema({
    comment:{type:String,required:true},
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    }
});
module.export=mongoose.model("Comment",commentSchema);