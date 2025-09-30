import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { ChatMessage, ChatRole } from '../types';

// NOTE: ai is initialized lazily to prevent app crash if API_KEY is missing on load.
let ai: GoogleGenAI | null = null;
const model = 'gemini-2.5-flash';

export const getGeminiResponse = async (history: ChatMessage[], newMessage: string): Promise<string> => {
    try {
        if (!ai) {
            const API_KEY = process.env.API_KEY;
            if (!API_KEY) {
                console.error("CRITICAL: Gemini API key not found. The application will not be able to connect to the AI service. Ensure the API_KEY environment variable is set.");
                return "API-avainta ei ole määritetty. Ota yhteyttä sivuston ylläpitoon.";
            }
            ai = new GoogleGenAI({ apiKey: API_KEY });
        }

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
        // Reset the instance if there's an error, maybe the key was invalid.
        ai = null; 
        return "Pahoittelut, mutta tekoälyavustajassa on tällä hetkellä tekninen ongelma. Yritä hetken päästä uudelleen.";
    }
};
