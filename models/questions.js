const mongoose =require("mongoose");

const questionSchema=new mongoose.Schema({
    question:{type:String,required:true},
    answer: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Answer"
            }
    ],
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    }

      
});
module.exports = mongoose.model("Question", questionSchema);