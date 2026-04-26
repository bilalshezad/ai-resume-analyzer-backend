const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config({ path: "./.env" });

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function listModels() {
  try {
    const result = await genAI.getGenerativeModel({ model: "gemini-pro" }); // Just to init
    // Note: getGenerativeModel doesn't have listModels, it's on the genAI instance if supported, 
    // or we might need to use the REST API.
    
    // In newer SDKs, there isn't a direct listModels on genAI.
    // Let's try to just hit one that we know should work like 'gemini-1.5-flash-latest'
    const models = ["gemini-1.5-flash", "gemini-1.5-pro", "gemini-pro", "gemini-1.0-pro"];
    for (const modelName of models) {
      console.log(`Checking ${modelName}...`);
      try {
        const model = genAI.getGenerativeModel({ model: modelName });
        const response = await model.generateContent("Hello");
        console.log(`Success with ${modelName}:`, response.response.text());
        return;
      } catch (e) {
        console.error(`Failed with ${modelName}:`, e.message);
      }
    }
  } catch (error) {
    console.error("Error:", error.message);
    if (error.response) {
        console.error("Response data:", error.response.data);
    }
  }
}

listModels();
