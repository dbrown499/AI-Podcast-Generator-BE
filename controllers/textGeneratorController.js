
// const express = require("express");
// const textToSpeech = require("@google-cloud/text-to-speech"); 

// const textGenerator = () => {
//     const router = express.Router();
//     const ttsClient = new textToSpeech.TextToSpeechClient();


//     router.post('/', async (req, res) => {
//         try {
//             const { text } = req.body;
//             if (!text) return res.status(400).json({ error: "No transcript provided." });

// /////////THIS GENERATES AN AI RESPONSE TO THE REQUEST///////////////////
//             // const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" + process.env.GEMINI_API_KEY, {
//             //     method: 'POST',
//             //     headers: {
//             //         'Content-Type': 'application/json'
//             //     },
//             //     body: JSON.stringify({
//             //         contents: [
//             //             {
//             //                 parts: [
//             //                     {
//             //                         text
//             //                     }
//             //                 ]
//             //             }
//             //         ]
//             //     })
//             // });

//             // const data = await response.json();
//             // const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text || "No text generated";



//             // Step 2: Convert generated text to audio using Text-to-Speech API
//             const client = new textToSpeech.TextToSpeechClient();

//             const request = {
//                 input: { text },
//                 // input: { text: generatedText },
//                 voice: { languageCode: "en-US", ssmlGender: "NEUTRAL" },
//                 audioConfig: { audioEncoding: "MP3" },
//             };

//             const [ttsResponse] = await client.synthesizeSpeech(request);

//             // Step 3: Stream the audio file directly to the client
//             res.set({
//                 'Content-Type': 'audio/mpeg',
//                 'Content-Disposition': 'inline; filename="output.mp3"',
//             });
//             res.send(ttsResponse.audioContent);
//         } catch (error) {
//             console.error("Error generating content or converting to audio:", error);
//             res.status(500).json({ error: "Failed to generate content or convert to audio" });
//         }
//     });

//     return router;
// };


// module.exports = textGenerator;

const express = require("express");
const textToSpeech = require("@google-cloud/text-to-speech");
const stringSimilarity = require("string-similarity");

const textProcessor = () => {
    const router = express.Router();
    const ttsClient = new textToSpeech.TextToSpeechClient();

    const validateTranscriptFormat = (text) => {
        // Extract transcript segments using regex
        const segments = text.match(/\[\d{2}:\d{2}(:\d{2})?\]\s*Speaker\s?\d+:\s*.+/g) || [];

        console.log(segments)
        if (segments.length === 0) return false; // No valid segments found

        const expectedFormatExample = "[00:01:23] Speaker 1: Sample text here";

        for (const segment of segments) {
            const similarity = stringSimilarity.compareTwoStrings(segment, expectedFormatExample);
            if (similarity < 0.1) { // Adjust threshold if needed
                return false;
            }
        }

        return true;
    };

    router.post("/", async (req, res) => {
        try {
            const { text } = req.body;
            if (!text) return res.status(400).json({ error: "No transcript provided." });

            // Validate transcript format
            if (!validateTranscriptFormat(text)) {
                return res.status(400).json({ error: "Invalid transcript format." });
            }

            // Extract speakers and dialogues
            const segments = text.match(/\[\d{2}:\d{2}(:\d{2})?\]\s*Speaker\s?\d+:\s*.+/g) || [];

            if (segments.length === 0) return res.status(400).json({ error: "No valid transcript found." });

            const speechParts = [];

            for (const segment of segments) {
                // Extract speaker and dialogue
                const match = segment.match(/\[\d{2}:\d{2}(:\d{2})?\]\s*(Speaker\s?\d+):\s*(.+)/);
                if (!match) continue;

                const speaker = match[2]; // e.g., "Speaker 1"
                const dialogue = match[3]; // Extracted dialogue text

                // Assign different voices based on the speaker
                const voiceConfig = speaker.includes("1")
                    ? { languageCode: "en-US", name: "en-US-Wavenet-D", ssmlGender: "MALE" }  // Speaker 1 = Male
                    : { languageCode: "en-US", name: "en-US-Wavenet-F", ssmlGender: "FEMALE" }; // Speaker 2 = Female

                // Generate speech for this part
                const request = {
                    input: { text: dialogue },
                    voice: voiceConfig,
                    audioConfig: { audioEncoding: "MP3" },
                };

                const [response] = await ttsClient.synthesizeSpeech(request);
                speechParts.push(response.audioContent);
            }

            // Combine audio files
            const combinedAudio = Buffer.concat(speechParts);

            res.set({
                "Content-Type": "audio/mpeg",
                "Content-Disposition": "inline; filename=output.mp3",
            });
            res.send(combinedAudio);
        } catch (error) {
            console.error("Error processing transcript:", error);
            res.status(500).json({ error: "Failed to process transcript" });
        }
    });

    return router;
};

module.exports = textProcessor;
