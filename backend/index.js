const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post('/api/chat', async (req, res) => {
  const { message, userProfile } = req.body;
  
  // SYSTEM PROMPT: Ini yang bikin Teman Dengar beda dari ChatGPT biasa
  const systemPrompt = `Kamu adalah Teman Dengar. Sahabat yang hangat dan empati. 
  User adalah ${userProfile.status}, hobi ${userProfile.hobbies.join(', ')}. 
  Gunakan gaya bahasa ${userProfile.communicationStyle}. 
  Balas maksimal 3 kalimat dan akhiri dengan 1 pertanyaan terbuka.`;

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});
  const result = await model.generateContent([systemPrompt, message]);
  const response = await result.response;
  
  res.json({ text: response.text() });
});

app.listen(3000, () => console.log('Backend running on port 3000'));
