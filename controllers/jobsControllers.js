const mongoose = require('mongoose')
require('dotenv').config();
const {Jobs} = require('../models/Jobs');
const { GoogleGenerativeAI } = require('@google/generative-ai'); 
const genAi = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAi.getGenerativeModel({
  model: "gemini-2.5-flash"
});
const {Resume} = require('../models/Resume');

const addJobs = async(req , res)=>{
  const {company , position , jobDescription , status , notes} = req.body;
  try {
    const resume = await Resume.findOne({userId : req.user.id});
    if(!resume){
     return res.status(400).json({
      message : 'Resume not found. Please analyze resume first.'
     })
    }
    const resumetext = resume.correctedText;
    const prompt = `Compare the following resume and job description.Return ONLY a number from 0 to 100 representing the match percentage Resume ${resumetext} jobDescription ${jobDescription}`
    const result = await model.generateContent(prompt);
    const aiText = result.response.text()
    const matchPercentage = parseInt(aiText.match(/\d+/)?.[0] || 0); 
    const job = await Jobs.create({
      userId : req.user.id,
      company,
      position,
      jobDescription,
      status,
      notes,
      matchPercentage,
    })
    await job.save();
    res.json({
      success : true, job,
      message : "Job added"
    })
    console.log(job)
  } catch (error) {
    res.json({
      status : 400,
      success : false,
      error
    })
    console.log(error)
  }
}
const getjobs = async(req , res)=>{
  try {
    const job = await Jobs.find({userId : req.user.id})
    res.json({
      message :"job Updated",
    job 
    })
    console.log(job)
  } catch (error) {
    console.log(error)
  }
} 
const updateJobs = async(req  , res)=>{
  try {
    const job = await Jobs.findByIdAndUpdate(req.params.id, req.body ,{
      new : true
    })
    console.log(job);
    res.json({job})
  } catch (error) {
    console.log(error)
  }
}
const deleteJobs = async(req , res)=>{
  try {
    const job = await Jobs.findByIdAndDelete(req.params.id);
    res.json({
      message : "Job Has been deleted",
      job
    })
    console.log("This is the job that has been deleted" , job)
  } catch (error) {
    console.log(error)
  }
}
module.exports = {addJobs , getjobs , updateJobs , deleteJobs}