import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import {OpenAI } from "openai";
import dotenv from "dotenv"
dotenv.config()

const apiKey = process.env.OPEN_API_KEY

const openai = new OpenAI({
    apiKey: apiKey
});

const app = express()
app.use(cors())
app.use(bodyParser.json())

app.get("/", (req, res) => {
    res.send("Backend is running!");
});

// app.use(cors({
//     origin: "http://127.0.0.1:5500", 
// }));

app.use(cors({
    origin: "*", 
}));

app.options("*", cors()); // Allow preflight requests for all routes
  

app.post("/call-openai", async (req, res) => {
    const { messages } = req.body;
  
    try {
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages,
      });
  
      res.json({ response: response.choices[0].message.content });
      
    } catch (error) {
      console.error("Error calling OpenAI API:", error.message);
      res.status(500).json({ error: "Error calling OpenAI API" });
    }
  });

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
