// const { GoogleGenerativeAI } = require("@google/generative-ai");
// require("dotenv").config();

// // const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
// // const model = genAI.getGenerativeModel({ model: "models/gemini-1.5-pro"});
// // console.log(model);

// // async function listModels() {
// //     try {
// //         const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=$AIzaSyCvWi1mR0GOm1mJuz-Oj74xoOQBulDY18Y");
// //         const data = await response.json();
// //         console.log("Available Models:", data);
// //     } catch (error) {
// //         console.error("Error listing models:", error);
// //     }
// // }

// // listModels();

// async function generateContent() {
//     try {
//         const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" + process.env.GEMINI_API_KEY, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({
//                 contents: [
//                     {
//                         parts: [
//                             {
//                                 text: "how are you?"
//                             }
//                         ]
//                     }
//                 ]
//             })
//         });

//         const data = await response.json();
//         console.log(data);
//     } catch (error) {
//         console.error("Error generating content:", error);
//     }
// }

// generateContent();

