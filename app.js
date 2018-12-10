const express=require('express');
const app=express();
const bodyParser=require("body-parser");
const mongoose=require("mongoose");
const passport=require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const localStrategy=require("passport-local");
const session=require("express-session");
let User=require("./models/user");
let Question=require("./models/questions");
let questionRoute=require("./Routes/questions");
let userRoute=require("./Routes/user");
mongoose.connect("mongodb://localhost/dscProj",{ useNewUrlParser: true });
app.set("views engine", "ejs");
app.set("views", "views");
app.set("port", process.env.Port || 5000);
app.use(express.static("public"));
app.use(session({resave:false,secret:"ain't got no time",saveUninitialized:false}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(bodyParser.urlencoded({extended:true}));
// app.use(()=>{   questionRoute});
// app.use(() => { userRoute});
app.use("/question",questionRoute);
app.use("/user", userRoute);
app.get("/",(req,res)=>{
    res.send("home");
    
});
const server=app.listen(app.get("port"),(req,res,next)=>{
    console.log("you are listening to port "+ app.get("port"));
    // console.log(req.user);
});