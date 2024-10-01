const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };
  
  export default async function handler(req, res) {
    const { text, targetLang } = req.body;
  
    try {
      const chatSession = model.startChat({
        generationConfig,
        history: [],
      });
  
      const result = await chatSession.sendMessage(`Translate the following text to ${targetLang}: ${text}`);
      const translatedText = await result.response.text();
  
      res.status(200).json({ translatedText });
    } catch (error) {
      console.error('Error in /api/translate:', error.response ? error.response.data : error.message);
      res.status(500).json({ error: 'Translation failed' });
    }
  }