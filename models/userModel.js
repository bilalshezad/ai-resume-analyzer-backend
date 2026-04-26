const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name : {
      type : String,
      required : [true  , "please add the username"]
    },
    email : {
      type : String,
      required : [true , "add your email"]
    },
    password : {
      type : String,
      required : [true , "add your password"]
    }
  }, {
    timestamps : true,
  }
)
const User = mongoose.model("User" , UserSchema);
module.exports = {User}