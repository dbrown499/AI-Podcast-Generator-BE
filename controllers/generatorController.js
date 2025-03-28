const express = require("express");

const generator = (genAI) => {
    const router = express.Router();

    router.get('/', async (req, res) => {
        try {
            const model = genAI.getGenerativeModel({ model: "gemini-pro" });
            const result = await model.generateContent("Tell me a fun fact.");
            res.json({ funFact: result.response.text() });
        } catch (error) {
            console.error("Error generating text:", error);
            res.status(500).json({ error: "Failed to generate text" });
        }
    });

    return router;
};

module.exports = generator;