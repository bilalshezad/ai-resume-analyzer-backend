require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai'); 
const genAi = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAi.getGenerativeModel({
  model: "gemini-2.5-flash"
});
const mongoose = require('mongoose');
const {Resume} = require('../models/Resume');
// const { handleError } = require('../../frontend/app/src/utils');

const analyzeResume = async (req, res) => {

// Your API Key

// Use correct FREE model

  try {
    const { resumeText } = req.body;

    const prompt = `
You are an AI resume analyzer. Analyze the following resume and return ONLY a valid JSON object with the following fields:

{
  "score": number,
  "atsScore": number,
  "suggestions": ["string", "string"],
  "correctedContent": "string"
}

Important:
- RETURN ONLY JSON. No explanation, no markdown.
- Do NOT use \\n. Use normal plain text inside the JSON fields.
- JSON must be valid and parsable.
no JSON.
No extra text,
no explantaion.
JSOM must be  directly parsable

Resume:
${resumeText}`;
    const result = await model.generateContent(prompt);
    const aiText = result.response.text();
    
    // Try to parse JSON
    let final;
    try {
      final = JSON.parse(aiText);
    } catch (err) {
      return res.status(400).json({
        success : false,
        error: "AI returned invalid JSON",
        raw: aiText
      });
    }
const userId = req.user.id;

   await Resume.findOneAndDelete({ userId });

    // ⭐ CREATE NEW ONE
    const saved = await Resume.create({
      userId : userId,
      originalText: resumeText,
      correctedText: final.correctedContent,
      score: final.score,
      atsScore: final.atsScore,
      suggestions: final.suggestions
    });

    res.json({
      success: true,
      message: "Resume analyzed successfully",
      final: saved
    });

  } catch (error) {
    console.error("ANALYZE ERROR →", error);
res.status(500).json({ error: "Server Error", details: error.message  , success : false});
  }
};

const getResumeResult = async (req, res) => {
  try {
    const userId = req.user.id;

    // Latest resume result lao
    const resume = await Resume.findOne({ userId : userId }).sort({ createdAt: -1 });

    if (!resume) {
      return res.json({ success: true, data: null });
    }

    res.json({ success: true, data: resume });

  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

module.exports = {analyzeResume , getResumeResult} ;