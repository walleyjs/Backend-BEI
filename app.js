const express=require('express');
const app=express();
const bodyParser=require("body-parser");
const mongoose=require("mongoose");
let User=require("./models/user");
let Question=require("./models/questions");
let questionRoute=require("./Routes/questions");
let userRoute=require("./Routes/user");
mongoose.connect("mongodb://localhost/dscProj",{ useNewUrlParser: true });
app.set("views engine", "ejs");
app.set("views", "views");
app.set("port", process.env.Port || 5000);
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
// app.use(()=>{   questionRoute});
// app.use(() => { userRoute});
app.use("/question",questionRoute);
app.use("/user", userRoute);
app.get("/",(req,res)=>{
    res.send("home");
});
const server=app.listen(app.get("port"),()=>{
    console.log("you are listening to port "+ app.get("port"));
});