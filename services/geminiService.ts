import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { GEMINI_MODEL, SYSTEM_INSTRUCTION } from "../constants";

// Ensure API key is available
if (!process.env.API_KEY) {
  console.error("Missing API_KEY in environment variables");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// We keep a reference to the chat session instance
let chatSession: Chat | null = null;

export const initializeChat = (): Chat => {
  chatSession = ai.chats.create({
    model: GEMINI_MODEL,
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
    },
  });
  return chatSession;
};

export const getChatSession = (): Chat => {
  if (!chatSession) {
    return initializeChat();
  }
  return chatSession;
};

export const sendMessageStream = async (
  message: string,
  onChunk: (text: string) => void
): Promise<void> => {
  const chat = getChatSession();

  try {
    const resultStream = await chat.sendMessageStream({ message });

    for await (const chunk of resultStream) {
      // Cast to GenerateContentResponse to access the .text property safely per SDK guidelines
      const c = chunk as GenerateContentResponse;
      if (c.text) {
        onChunk(c.text);
      }
    }
  } catch (error) {
    console.error("Error sending message:", error);
    throw error;
  }
};

export const resetChat = () => {
  chatSession = null;
};