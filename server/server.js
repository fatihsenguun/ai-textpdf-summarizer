import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import fetch from "node-fetch";
import { InferenceClient } from "@huggingface/inference";


import fs from "fs";
import { PdfReader } from "pdfreader";
import multer from "multer";
const upload = multer({ dest: 'uploads/' })


dotenv.config();


const app = express();


const client = new InferenceClient(process.env.HF_API_KEY);
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("server is running")
})
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));







app.post("/api/chat", async (req, res) => {
    try {


        const { prompt } = req.body;



        const safePrompt = prompt
            .replace(/[`"'\\]/g, " ")
            .replace(/\n/g, " ")
            .replace(/\s+/g, " ")
            .trim();

        const structuredPrompt = `You are an AI that MUST respond in strict JSON format only.Summarize the text in a detailed and complete way. Include all major points and avoid excluding any essential information. Do NOT add extra commentary or text. Return a JSON with the following fields:"header": "title written in a few words", "summary": "A detailed summary of the text",  "questions": ["Question1", "Question2", "Question3", "Question4", "Question5"] Text:` + prompt



        const chatCompletion = await client.chatCompletion({
            model: "openai/gpt-oss-20b:groq",
            messages: [
                {
                    role: "user",
                    content: structuredPrompt
                },
            ],
        });

        const content = chatCompletion?.choices?.[0]?.message?.content || "{}";
        let data;
        try {
            data = JSON.parse(content);
        } catch {
            data = { summary: content, questions: [] };
        }

        res.json(data);
    } catch (error) {
        console.error(error);


    }
})
app.post("/api/chat-pdf", upload.single('pdfFile'), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: "Select PDF!" });
    }
    const pdfPath = req.file.path;
    let pdfText = "";

    new PdfReader().parseFileItems(pdfPath, async (err, item) => {
        if (err) {
            console.error(" parse error:", err);
            return res.status(500).json({ error: "Parse Error" });
        } else if (!item) {

            console.log(pdfText);
            fs.unlinkSync(pdfPath);
            try {

                const structuredPrompt = `You are an AI that MUST respond in strict JSON format only.Summarize the text in a detailed and complete way. Include all major points and avoid excluding any essential information. Do NOT add extra commentary or text. Return a JSON with the following fields:"header": "title written in a few words", "summary": "A detailed summary of the text",  "questions": ["Question1", "Question2", "Question3", "Question4", "Question5"] Text:` + pdfText



                const chatCompletion = await client.chatCompletion({
                    model: "openai/gpt-oss-20b:groq",
                    messages: [
                        {
                            role: "user",
                            content: structuredPrompt
                        },
                    ],
                });

                const content = chatCompletion?.choices?.[0]?.message?.content || "{}";
                let data;
                try {
                    data = JSON.parse(content);
                } catch {
                    data = { summary: content, questions: [] };
                }

                res.json(data);

            } catch (error) {
                console.error("Pars Summarize Error" + error)
            }





        }
        else if (item.text) {
            pdfText += item.text + " ";
        }
    });
});




