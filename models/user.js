let mongoose = require("mongoose");
let schema = mongoose.Schema;

let userSchema = new schema({
    name: 
    {type: String,
    required: true},

    email:
    {type: String,
    required: true},

    password:
    {type: String,
    required: true}
    
}, {timestamp : true});
let userObj = mongoose.model("userModel" ,userSchema, "userReactCollection")
module.exports = userObj;
