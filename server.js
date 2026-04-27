const express = require("express");
const env = require('dotenv')
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const resumeRoutes = require('./routes/resumeRoutes');
const jobRoutes = require('./routes/jobsRoutes');
// const authToken = require("./middleware/authToken");
const cors = require('cors');
const app = express();
 
 const corsOptions = {
  origin: [
    "https://ai-resume-analyzer-frontend-sable.vercel.app",
    "http://localhost:3000",
    "http://localhost:5173",
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
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
