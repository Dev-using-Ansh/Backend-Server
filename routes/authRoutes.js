const {Router} = require("express");
const bodyParser = require("body-parser");
// const jwt = require("jsonwebtoken");
const User = require("./../models/user.js");
const router = Router();

router.get("/login" ,(req,res) =>{
    const error = req.query.error;
    res.send("You are on login page");
});

router.get("/signup", (req,res) =>{
    const error = req.query.error;
    res.send("You are on sign up page");
})

router.get("/logout", (req,res) =>{
    res.send("You are on logout page");
})
router.use(bodyParser.urlencoded());
router.post("/signup" , (req,res) =>{
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const user = new User({name,email,password});

    user.save()
    .then(user =>{
        console.log("User created succussfully");

        // const token = getToken(user.email, user.name);
        console.log(user.name);
        res.redirect("/blogs");
    }).catch(err =>{
        console.log(err);
        res.redirect("/auth/signup");
    })
})
router.post("/login", (req,res) =>{
    const {email ,password} = req.body;
    console.log(req.body);

    User.findOne( {email} )
    .then(user =>{
        if(!user) {
            // res.redirect("auth/login");
            res.status(400).send("User not found")
        }
        else if(user.password !== password){
            res.status(400).send("Incorrect password");
        }
        else{
            console.log("User logged in");
            res.status(200).send("login successfully");
            // res.redirect("/blogs");
        }
    }).catch(err =>{
        console.log(err);
        res.redirect("auth/login");
    })
})
module.exports = router;