require("dotenv").config({ path: "./.env" });

async function checkModels() {
  try {
     const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${process.env.GEMINI_API_KEY}`);
     const data = await response.json();
     if (data.models) {
        console.log("Models found:", data.models.map(m => m.name));
     } else {
        console.log("Response:", JSON.stringify(data, null, 2));
     }
  } catch (error) {
    console.error("Error:", error.message);
  }
}

checkModels();
