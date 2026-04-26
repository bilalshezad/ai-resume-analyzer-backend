const express = require('express')
const authToken = require('../middleware/authToken');
const { analyzeResume, getResumeResult } = require('../controllers/resumeController');
const Router =  express.Router();

Router.post('/resume/analyze' ,authToken, analyzeResume)
Router.get('/resume/get' , authToken,  getResumeResult)
module.exports = Router;