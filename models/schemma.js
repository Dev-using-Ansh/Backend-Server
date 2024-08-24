let mongoose = require('mongoose');
let schema = mongoose.Schema;
let blogSchema = new schema({
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    sector:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    },
},{timestamp:true})
const blogObj = mongoose.model("blogModel",blogSchema,"blogCollection");
module.exports = blogObj;