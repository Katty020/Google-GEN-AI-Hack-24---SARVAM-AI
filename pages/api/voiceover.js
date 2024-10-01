const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY; // Replace with your actual API key
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
    const { text } = req.body;
  
    try {
      const chatSession = model.startChat({
        generationConfig,
        history: [],
      });
  
      const result = await chatSession.sendMessage(`Generate a voiceover for the following text: ${text}`);
      const voiceoverUrl = await result.response.text(); // Assuming the response contains a URL
  
      if (!voiceoverUrl) {
        throw new Error('Voiceover URL is empty');
      }
  
      res.status(200).json({ voiceoverUrl });
    } catch (error) {
      console.error('Error in /api/voiceover:', error.response ? error.response.data : error.message);
      res.status(500).json({ error: 'Voiceover generation failed', details: error.message });
    }
  }
