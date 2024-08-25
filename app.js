const express = require('express');
const mongoose = require('mongoose');
const morgan = require("morgan");
const BlogPost = require("./models/blogPost.js");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes.js");
// const jwt = require("jsonwebtoken");
// const cookieParser = require("cookie-parser");
const app = express();

const PORT = 3099;
const USERNAME = "anshkg";
const PASSWORD = "kg7983";
const MERNDB = "mernDB";
const URLDB = `mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.7ehonii.mongodb.net/${MERNDB}?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.connect(URLDB)
.then(result =>{
    console.log("Database connected");
    app.listen(PORT, ()=>{
        console.log("Server is running on port",PORT);
    })
}).catch(err=>{
    console.log("There is error",err);
})
console.log("Connecting to database");

app.use(morgan("dev"));
app.use(express.json());
app.use(cors());
app.use(cookieParser());
// for(let i=0; i<=; i++){
//     let blog ={
//         title : "title"+i,
//         content : "content"+i,
//         sector : "sector"+i,
//         author: "author"+i
//     }
    // BlogPost.create(blog)
    // .then(result =>{
    //     console.log("Created Successfully");
    // }).catch(err=>{
    //     console.log("There is error"+err.message);
    // })
// }

app.get("/", (req,res) =>{
    res.send("Home Page");
})
app.get("/blogs",(req,res) =>{
    BlogPost.find().then((blog) =>{
        res.status(200).json(blog);
    })
    .catch((err) =>{
        // res.send(err.message);
        res.status(404).json(err.message);
    })
})
app.get("/blogs/:id",(req,res) =>{
    BlogPost.findById(req.params.id)
    .then((blog) =>{
        // res.send("Specfic blog");
        // console.
        res.json(blog);
    }).catch(err =>{
        // console.log(err.message);
        res.status(404).json(err.message);
    })
})
// app.get("/blogs/:title",(req,res) =>{
//     const title = req.params.title;
//     BlogPost.find({title:title})
//     .then((blog) =>{
//         // res.send("Specfic blog");
//     }).catch(err =>{
//         console.log(err.message);
//     })
// })
app.post("/blogs", (req,res) =>{
    const blog = req.body;
    BlogPost.create(blog)
    .then((blog) =>{
        res.send("Blog created successfully");
        // res.json(blog)
    }).catch(err =>{
        res.status(404).send(err.message);
    })
})
app.delete("/blogs/:id", (req,res) =>{
    BlogPost.findByIdAndDelete(req.params.id)
    .then((result) =>{
        res.send("Delete the blog succesfully")
    }).catch(err =>{
        res.send("Error in Deleting");
    })
})


//authRoutes
app.use("/auth" , authRoutes);
