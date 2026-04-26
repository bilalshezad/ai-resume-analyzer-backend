const express = require('express');
const authToken = require('../middleware/authToken');
const { addJobs, getjobs, updateJobs, deleteJobs } = require('../controllers/jobsControllers');
const Router = express.Router();

Router.post('/add/job', authToken , addJobs );
Router.get("/add/job", authToken , getjobs );
Router.post("/add/job/:id", authToken , updateJobs);
Router.delete("/add/job/:id", authToken , deleteJobs);

module.exports = Router 