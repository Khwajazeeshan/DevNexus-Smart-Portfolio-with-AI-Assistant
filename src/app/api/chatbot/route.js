import axios from "axios";
import { NextResponse } from "next/server";
import Resume from "@/models/Resume.model.js";
import Contact from "@/models/Contact.model.js";
import Footer from "@/models/Footer.model.js";
import About from "@/models/About.js";
import Project from "@/models/Project.model.js";
import connectDB from "@/config/connectDB";

const GROQ_API_KEY = process.env.GROQ_API_KEY;

// Axios config for Groq API
const groqAxiosConfig = () => ({
    headers: {
        Authorization: `Bearer ${GROQ_API_KEY}`,
        "Content-Type": "application/json"
    },
    timeout: 15000
});

// POST /api/chatbot/message
export async function POST(request) {
    console.log("[Chatbot] Incoming request... Starting processing.");

    let body;
    try {
        body = await request.json();
    } catch (e) {
        console.error("[Chatbot] JSON Parsing Error:", e.message);
        return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
    }

    const { message } = body;
    const API_KEY = process.env.GROQ_API_KEY;

    if (!API_KEY) {
        console.error("[Chatbot] Missing GROQ_API_KEY in environment variables.");
        return NextResponse.json({ error: "GROQ API key missing on server." }, { status: 500 });
    }

    if (!message?.trim()) {
        return NextResponse.json({ error: "Empty message received." }, { status: 400 });
    }

    try {
        await connectDB();

        // Standard relevance check
        const relevanceRegex = /zeeshan|khawaja|hi|hello|about|who|resume|experience|skill|project|contact|email|phone|link|social|education|work|bio|yourself|assistant/i;
        if (!relevanceRegex.test(message)) {
            console.log("[Chatbot] Guard: Irrelevant message ignored.");
            return NextResponse.json({ reply: "I'm only trained to answer questions about Khawaja Zeeshan's portfolio. How can I help you regarding his work?", source: "relevance_guard" });
        }

        console.log("[Chatbot] Request relevant. Fetching context...");

        // Fetch context with error handling for each
        const [about, resume, projects, contact, footer] = await Promise.all([
            About.findOne({}).lean().catch(() => null),
            Resume.findOne({}).lean().catch(() => null),
            Project.find({}).lean().catch(() => []),
            Contact.findOne({}).lean().catch(() => null),
            Footer.findOne({}).lean().catch(() => null)
        ]);

        const contextData = { about, resume, projects, contact, socialLinks: footer };
        console.log("[Chatbot] Data fetched. Social links found:", !!footer);

        const systemPrompt = `
You are Khawaja Zeeshan's personal portfolio assistant. 
Use the provided Contextual Data to answer in just 2 lines of questions precisely.
If the data is missing, reply that you don't have that information.
Be concise, professional, and friendly.
Keep formatting clean (use bullet points for lists).
If asked about projects, list Name, Tech, and Description.
`.trim();

        const endpoint = "https://api.groq.com/openai/v1/chat/completions";
        const payload = {
            model: "llama-3.1-8b-instant",
            messages: [
                { role: "system", content: systemPrompt },
                { role: "system", content: `CONTEXT DATA:\n${JSON.stringify(contextData)}` },
                { role: "user", content: message }
            ],
            temperature: 0.1,
            max_tokens: 1024
        };

        console.log("[Chatbot] Calling Groq API...");
        const response = await axios.post(endpoint, payload, {
            headers: {
                "Authorization": `Bearer ${API_KEY}`,
                "Content-Type": "application/json"
            },
            timeout: 25000
        });

        const reply = response?.data?.choices?.[0]?.message?.content || "I couldn't generate a response.";
        console.log("[Chatbot] Success: Received AI response.");

        return NextResponse.json({ reply, source: "groq" });

    } catch (err) {
        console.error("[Chatbot] FATAL ERROR:", err.message);
        
        if (axios.isAxiosError(err)) {
            console.error("[Chatbot] Groq API Response Error:", err.response?.data || err.code);
            const status = err.response?.status || 500;
            
            if (status === 429) {
                return NextResponse.json({ error: "Rate limit reached. Please try again in a few moments." }, { status: 429 });
            }
            
            return NextResponse.json({ error: "I'm having trouble connecting right now. Please try again later." }, { status });
        }

        return NextResponse.json({ error: "Something went wrong on our end. Please try again." }, { status: 500 });
    }
}
