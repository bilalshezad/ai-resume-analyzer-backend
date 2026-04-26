const mongoose = require("mongoose");

const ResumeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    originalText: {
      type: String,
      required: true,
      trim: true,
    },

    correctedText: {
      type: String,
      required: true,
    },

    score: {
      type: Number,
      min: 0,
      max: 100,
      required: true,
    },

    atsScore: {
      type: Number,
      min: 0,
      max: 100,
      required: true,
    },

    suggestions: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true, // createdAt & updatedAt
  }
);

const Resume =  mongoose.model('Resume'  , ResumeSchema);
module.exports = {Resume}