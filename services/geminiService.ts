import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { ChatMessage, ChatRole } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn("Gemini API key not found. Please set the API_KEY environment variable.");
}

// Correct initialization with named parameter
const ai = new GoogleGenAI({ apiKey: API_KEY! });

const model = 'gemini-2.5-flash';

export const getGeminiResponse = async (history: ChatMessage[], newMessage: string): Promise<string> => {
    if (!API_KEY) {
        console.error("CRITICAL SECURITY WARNING: API_KEY is exposed on the client-side. This is not secure and should be handled by a backend proxy in a production environment.");
        return "API-avainta ei ole määritetty. Ota yhteyttä sivuston ylläpitoon.";
    }

    try {
        // Use the new chat session creation method
        const chat = ai.chats.create({
          model,
          // Map history to the correct format
          history: history.map(msg => ({
              role: msg.role === ChatRole.USER ? 'user' : 'model',
              parts: [{ text: msg.text }]
          })),
          config: {
            systemInstruction: `Olet Voon Assist, ystävällinen ja avulias tekoälyassistentti markkinointitoimisto Voonille. Vastaa lyhyesti ja ytimekkäästi suomeksi. Auta käyttäjiä ymmärtämään Voonin palveluita (Sosiaalinen media, Outbound/Inbound-kampanjat, Kokonaisvaltaiset markkinointiratkaisut) ja ehdota heille yhteydenottoa lisätietoja varten. Älä vastaa kysymyksiin, jotka eivät liity markkinointiin tai Vooniin.`,
          },
        });

        // Use the correct method to send a message
        const response: GenerateContentResponse = await chat.sendMessage({ message: newMessage });
        
        // Use the direct .text accessor
        return response.text;

    } catch (error) {
        console.error("Error calling Gemini API:", error);
        return "Pahoittelut, mutta tekoälyavustajassa on tällä hetkellä tekninen ongelma. Yritä hetken päästä uudelleen.";
    }
};