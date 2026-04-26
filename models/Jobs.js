const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  userId : {
    type: mongoose.Schema.Types.ObjectId,
    required : true
  },
  company: String,
  position: String,
  jobDescription: String,
  status: {
  type: String,
    enum: ["Applied", "Interviewing", "Rejected", "Offered"],
    default: "Applied"
    },
  notes: String,
  matchPercentage: {
  type: Number,
  default: 0
}
})
 
const Jobs = mongoose.model('Jobs' , jobSchema);
module.exports = {Jobs}