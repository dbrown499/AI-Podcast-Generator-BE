const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { GoogleGenerativeAI } = require("@google/generative-ai");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.get("/", (req, res) => {
  res.send("Welcome To My Podcast Generator");
});

const textGeneratorController = require("./controllers/textGeneratorController.js")(genAI);
app.use("/text-generator", textGeneratorController);

module.exports = app;
