/*
 📄 File: src/app/api/chat/route.ts
 🧠 Description:
 This file defines a POST API route for a chat endpoint using the Groq SDK.
 It should accept an array of messages from the client, prepend a system message,
 call the Groq model, and return the assistant's response to the frontend.

 🧩 What to do in this file:
 Write code in the section below (marked with "!!!! ADD RELAVANT SEARCH CODE HERE !!!!") to 
 implement the Search in the VectorDB. Use MongoDB vector db & Xenova/all-MiniLM-L6-v2 embedding model.
*/

import { Pipeline, pipeline } from "@xenova/transformers";
import Groq from "groq-sdk";
import { MongoClient } from "mongodb";

const groq = new Groq();

let embedderModel: ReturnType<Pipeline> | null = null;
const getEmbedder = async () => {
  if (!embedderModel) {
    embedderModel = await pipeline(
      "feature-extraction",
      "Xenova/all-MiniLM-L6-v2"
    );
  }
  return embedderModel;
};

export const POST = async (req: Request) => {
  try {
    // Get the message from HTTP request
    const { messages } = await req.json();
    if (!messages) {
      return Response.json({ error: "Messages are Missing" }, { status: 400 });
    }

    /* !!!! ADD RELAVANT SEARCH CODE HERE !!!! */

    // Create a System Message
    const systemMessages = {
      role: "system",
      content:
        "You are a helpful AI assistant. Keep responses concise and friendly",
    };
    const chatMessages = [systemMessages, ...messages];

    // Get response from groq
    const chatOutput = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: chatMessages,
    });
    const reply = chatOutput.choices[0]?.message?.content || "";

    // Return to frontend
    return Response.json({ reply }, { status: 200 });
  } catch (err) {
    // Error Occured return 500 status code
    console.error("Error Occurred:", err);
    return Response.json({ error: "Error Occured" }, { status: 500 });
  }
};
