const express = require('express');
const {User } = require("../models/userModel");
const mongoose = require('mongoose');
require('dotenv').config()
const jsonWebToken = require("jsonwebtoken")
const bcrypt = require("bcrypt");

const registerUser = async (req, res) => {
try {
  const { name, email, password } = req.body;
const exists = await User.findOne({ email });
if (exists) return res.status(400).json({ success: false, message: 'User exists' });
if(!name || !email || !password){
    res.status(400).json({message :"enter all the detils", success:false})
  }
const hashed = await bcrypt.hash(password, 10);
const user = await User.create({ name, email, password: hashed });
res.json({ message: 'User created' , success : true});
} catch (err) { res.status(500).json({ error: err.message }); }
};
const loginUser =  async(req , res)=>{
  try { 
    const {email , password } = req.body;
    const user = await User.findOne({email});
    if(!user){
      res.status(400).json({ success : false ,message : "user not found"})
    }
    const OK =await bcrypt.compare(password , user.password);
    if(!OK){
      res.status(400).json({ success : false, message : "Password is incorrect"})
    }
    const token = jsonWebToken.sign({id : user.id} , process.env.SECRET_KEY ,{ expiresIn: '7d' })
    res.json({
      token,
      message : "Successfully login",
      success : true,
      username : user.name,
      userId : user.id,
      userEmail :user.email
    })
    // console.log(user.name)
  } catch(error) {
    console.log(error)
     res.status(500).json({ message: "Server error" });
  }
}

module.exports = {registerUser , loginUser};