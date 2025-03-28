const express = require("express");
const textToSpeech = require("@google-cloud/text-to-speech"); 

const textGenerator = () => {
    const router = express.Router();

    router.post('/', async (req, res) => {
        try {
            const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" + process.env.GEMINI_API_KEY, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    contents: [
                        {
                            parts: [
                                req.body
                            ]
                        }
                    ]
                })
            });

            const data = await response.json();
            

            const generatedText = data.candidates[0].content.parts[0].text || "No text generated";



            // Step 2: Convert generated text to audio using Text-to-Speech API
            const client = new textToSpeech.TextToSpeechClient();

            const request = {
                input: { text: generatedText },
                voice: { languageCode: "en-US", ssmlGender: "NEUTRAL" },
                audioConfig: { audioEncoding: "MP3" },
            };

            const [ttsResponse] = await client.synthesizeSpeech(request);

            // Step 3: Stream the audio file directly to the client
            res.set({
                'Content-Type': 'audio/mpeg',
                'Content-Disposition': 'inline; filename="output.mp3"',
            });
            res.send(ttsResponse.audioContent);
        } catch (error) {
            console.error("Error generating content or converting to audio:", error);
            res.status(500).json({ error: "Failed to generate content or convert to audio" });
        }
    });

    return router;
};


module.exports = textGenerator;