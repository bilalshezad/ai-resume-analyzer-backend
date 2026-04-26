const express = require("express");
const env = require('dotenv')
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const resumeRoutes = require('./routes/resumeRoutes');
const jobRoutes = require('./routes/jobsRoutes');
// const authToken = require("./middleware/authToken");
const cors = require('cors');
const app = express();
app.use(cors())
 
 const corsOptions = {
  origin: [
    "http://localhost:3000", // local dev
    "https://ai-powered-resume-and-job-tracker-k.vercel.app" // replace with your deployed frontend URL
  ],
  credentials: true
};
app.use(cors(corsOptions));
// middleware
app.use(express.json());

// routes
app.use("/user", userRoutes);
app.use("/user" ,resumeRoutes);
app.use('/user' , jobRoutes);
app.get('/' , (req , res)=>{
  res.json({
    activeStatus :true,
    error : false,
  })
})
// database connection
mongoose.connect(process.env.DB)
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

// server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
