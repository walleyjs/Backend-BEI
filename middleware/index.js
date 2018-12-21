var Question=require('../models/questions');
var Answer = require('../models/answer');
// var Question = require('../models/comment');
var middlewareObj = {};
middlewareObj.isLoggedIn = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash("error", "you need to be logged in to do that");
    res.redirect("/user/login");
};
middlewareObj.checkQuestionOwnership = function (req, res, next) {
    if (req.isAuthenticated()) {
        Question.findById(req.params.id, function (err, question) {
            if (err) {
                console.log(err);
                req.flash("error", "question not found");
                res.redirect("/question");
            } else {
                if (question.author.id.equals(req.user._id)) {
                    next();
                } else {
                    req.flash("error", "you don't have permission to do that");
                    console.log("you don't have permission to do that");
                    res.redirect("/question/" + question._id);
                }
            }
        });
    } else {
        req.flash("error", "you need to be logged in to do that");
        console.log("you need to be logged in to do that");
        res.redirect("/question");
    }
};
module.exports=middlewareObj;