import { GoogleGenAI } from "@google/genai";

const geminiKey = import.meta.env.VITE_GEMINI_API_KEY || '';
const openAIKey = import.meta.env.VITE_OPENAI_API_KEY || '';

// Initialize Gemini client 
const geminiClient = geminiKey ? new GoogleGenAI({ apiKey: geminiKey }) : null;

export const generateOfferCopy = async (productName: string): Promise<string> => {
    // 1. Try OpenAI First if Key exists
    if (openAIKey) {
        try {
            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${openAIKey}`
                },
                body: JSON.stringify({
                    model: "gpt-3.5-turbo", // Cost-effective and fast
                    messages: [
                        {
                            role: "system",
                            content: "You are a specialized retail copywriter for Brazilian supermarkets and pharmacies. You write aggressive, exciting sales copy."
                        },
                        {
                            role: "user",
                            content: `Write a short, punchy, high-conversion marketing headline (in Portuguese/Brazil) for a supermarket offer for the product: "${productName}". Use emojis. Keep it under 150 characters.`
                        }
                    ],
                    temperature: 0.8,
                    max_tokens: 150
                })
            });

            if (!response.ok) {
                const err = await response.json();
                throw new Error(err.error?.message || 'Erro na API da OpenAI');
            }

            const data = await response.json();
            return data.choices[0].message.content || "Oferta Especial!";
        } catch (error: any) {
            console.error("OpenAI Error:", error);
            return `Erro OpenAI: ${error.message}`;
        }
    }

    // 2. Fallback to Gemini
    if (geminiKey && geminiClient) {
        try {
            const response = await geminiClient.models.generateContent({
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

            // @ts-ignore
            let text = typeof response.text === 'function' ? response.text() : response.text;

            // Handle safety filters
            if (!text && response.candidates && response.candidates.length > 0) {
                // @ts-ignore
                text = response.candidates[0].content.parts[0].text;
            }

            return text || "Confira esta oferta especial!";
        } catch (error: any) {
            console.error("Gemini Error:", error);
            // Specific handling for quota errors
            if (error.status === 429 || error.message?.includes('429')) {
                return "Erro: Cota do Google Gemini excedida. Tente mais tarde ou use uma chave OpenAI.";
            }
            return `Erro Gemini: ${error.message || "Falha na conexão"}`;
        }
    }

    // 3. No Keys Configured
    console.warn("Nenhuma chave API encontrada (Gemini ou OpenAI).");
    await new Promise(resolve => setTimeout(resolve, 800));
    return `🔥 OFERTAS: ${productName} pelo menor preço! Corra e aproveite! 🛒`;
};
