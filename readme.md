AI Podcast Generator - Backend

Overview

The backend for the AI Podcast Generator provides APIs to generate and manage AI-driven podcasts. It handles authentication, audio processing, text-to-speech generation, and storage.

Tech Stack

Node.js (Runtime)

Express.js (Framework)

PostgreSQL (Database)

Prisma (ORM)

OpenAI API (Text-to-Speech & AI processing)

Cloud Storage (For audio file hosting)

Features

✅ User authentication & authorization (JWT-based)

🎙️ Podcast script generation using AI

🔊 Text-to-speech conversion

📂 Podcast episode storage & retrieval

🌐 RESTful API design

Installation

Prerequisites

🟢 Node.js (v18+)

🟢 PostgreSQL (installed & running)

Steps

Clone the repository:

git clone https://github.com/Dbrown499/ai-podcast-backend.git
cd ai-podcast-backend

Install dependencies:

npm install

Set up environment variables in .env:

DATABASE_URL=your_database_url
OPENAI_API_KEY=your_openai_api_key
JWT_SECRET=your_secret_key
CLOUD_STORAGE_URL=your_storage_url

Run database migrations:

npx prisma migrate dev

Start the server:

npm run dev

API Endpoints

🔑 Authentication

POST /api/auth/signup - Register a new user

POST /api/auth/login - Authenticate and get a token

🎙️ Podcast Management

POST /api/podcasts/generate - Generate a new AI-powered podcast script

POST /api/podcasts/synthesize - Convert script to speech

GET /api/podcasts/:id - Retrieve a podcast episode

Contributing

Fork the repo & create a new branch.

Make changes & commit with a meaningful message.

Submit a pull request.

License

📜 MIT License