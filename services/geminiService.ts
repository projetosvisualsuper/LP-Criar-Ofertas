import { GoogleGenAI } from "@google/genai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY || '';

// Initialize client only if key exists to avoid immediate errors
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export const generateOfferCopy = async (productName: string): Promise<string> => {
  if (!apiKey || !ai) {
    console.warn("VITE_GEMINI_API_KEY not found. Returning mock data.");
    // Simulate delay for realism
    await new Promise(resolve => setTimeout(resolve, 1000));
    return `🔥 OFERTA: ${productName} com preço incrível! Aproveite antes que acabe o estoque! 🛒`;
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-1.5-flash',
      contents: [
        {
          role: 'user',
          parts: [
            { text: `Write a short, punchy, high-conversion marketing headline (in Portuguese/Brazil) for a supermarket offer for the product: "${productName}". Use emojis. Keep it under 150 characters.` }
          ]
        }
      ],
      config: {
        systemInstruction: "You are a specialized retail copywriter for Brazilian supermarkets and pharmacies. You write aggressive, exciting sales copy.",
        temperature: 0.8,
      }
    });

    // Check if response structure matches GoogleGenAI SDK v1 (simplified access)
    // Or typical .response.text() method
    // @ts-ignore - Dynamic handling for different SDK versions
    let text = typeof response.text === 'function' ? response.text() : response.text;

    // Handle case where text might be null if safety filters blocked it
    if (!text && response.candidates && response.candidates.length > 0) {
      // @ts-ignore
      text = response.candidates[0].content.parts[0].text;
    }

    return text || "Confira esta oferta especial!";
  } catch (error: any) {
    console.error("Error generating copy:", error);
    // Return specific error for visibility if needed, or stick to generic
    // For now, let's make it alert the user to check console if they are admin
    return `Erro: ${error.message || "Falha na conexão com IA"}. Verifique o Console.`;
  }
};