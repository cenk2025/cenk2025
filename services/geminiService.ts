import { GoogleGenAI, GenerateContentResponse } from '@google/genai';
import { ChatMessage, ChatRole } from '../types';

let ai: GoogleGenAI | null = null;
const model = 'gemini-2.5-flash';

// Helper function to initialize the AI module
const getAiInstance = (): GoogleGenAI => {
    if (ai) {
        return ai;
    }

    const API_KEY = process.env.API_KEY;
    if (!API_KEY) {
        console.error("CRITICAL: Gemini API key not found. The application will not be able to connect to the AI service. Ensure the API_KEY environment variable is set.");
        throw new Error("API-avainta ei ole määritetty. Ota yhteyttä sivuston ylläpitoon.");
    }
    ai = new GoogleGenAI({ apiKey: API_KEY });
    return ai;
};


export const getGeminiResponse = async (history: ChatMessage[], newMessage: string): Promise<string> => {
    try {
        const aiInstance = getAiInstance();

        // Use the new chat session creation method
        const chat = aiInstance.chats.create({
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
         if (error instanceof Error && error.message.includes("API-avainta")) {
            return error.message;
        }
        // Reset the instance if there's an error
        ai = null; 
        return "Pahoittelut, mutta tekoälyavustajassa on tällä hetkellä tekninen ongelma. Yritä hetken päästä uudelleen.";
    }
};