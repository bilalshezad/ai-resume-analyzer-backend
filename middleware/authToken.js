const jwt = require("jsonwebtoken");
require('dotenv').config()

const authToken = async(req , res , next)=>{
  const header = req.headers.authorization;
  if(!header){
    return res.status(401).json({message : 'No Token'})
  }
  const token = header.split(' ')[1];
  try {
      const decoded = jwt.verify(token , process.env.SECRET_KEY);
      req.user = {id : decoded.id};
      next();
    } catch (error) {
      return res.status(401).json({message : "no token"})
    }
}
module.exports = authToken;