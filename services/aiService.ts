import { GoogleGenAI } from "@google/genai";
import { supabase } from "../lib/supabase";

const geminiKey = import.meta.env.VITE_GEMINI_API_KEY || '';
const openAIKey = import.meta.env.VITE_OPENAI_API_KEY || '';

// Initialize Gemini client 
const geminiClient = geminiKey ? new GoogleGenAI({ apiKey: geminiKey }) : null;

export const generateOfferCopy = async (productName: string, customKey?: string): Promise<string> => {

    // 1. Try Custom API Key (from Admin Panel - stored in DB) - Direct Client-Side Call
    // This is useful if the user wants to input their own key temporarily
    if (customKey && customKey.startsWith('sk-')) {
        console.log("Using Custom Key from Admin...");
        return await callOpenAIDirectly(productName, customKey);
    }

    // 2. Try Supabase Edge Function (Secure Server-Side Call)
    // This uses the key stored in Supabase Vault (Secrets), not visible to browser
    try {
        console.log("Calling Supabase Edge Function...");
        const { data, error } = await supabase.functions.invoke('generate-copy', {
            body: { productName }
        });

        if (error) {
            console.warn("Supabase Edge Function failed:", error);
            // Fallthrough to next methods
        } else if (data?.text) {
            return data.text;
        }
    } catch (err) {
        console.warn("Error invoking Edge Function:", err);
    }

    // 3. Try Local Env Key (Dev Mode only)
    if (openAIKey) {
        console.log("Using local .env key...");
        return await callOpenAIDirectly(productName, openAIKey);
    }

    // 4. Fallback to Gemini
    return await callGeminiFallback(productName);
};

// Helper: Direct OpenAI Call (Client-Side)
async function callOpenAIDirectly(productName: string, apiKey: string): Promise<string> {
    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
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
        console.error("Direct OpenAI Call Error:", error);
        return await callGeminiFallback(productName); // Try Gemini if OpenAI fails
    }
}

// Helper: Gemini Fallback
async function callGeminiFallback(productName: string): Promise<string> {
    if (geminiKey && geminiClient) {
        try {
            const response = await geminiClient.models.generateContent({
                model: 'gemini-1.5-flash',
                contents: [{
                    role: 'user',
                    parts: [{ text: `Write a short, punchy, high-conversion marketing headline (in Portuguese/Brazil) for a supermarket offer for the product: "${productName}". Use emojis. Keep it under 150 characters.` }]
                }],
                config: {
                    systemInstruction: "You are a specialized retail copywriter for Brazilian supermarkets and pharmacies. You write aggressive, exciting sales copy.",
                    temperature: 0.8,
                }
            });

            // @ts-ignore
            let text = typeof response.text === 'function' ? response.text() : response.text;
            if (!text && response.candidates && response.candidates.length > 0) {
                // @ts-ignore
                text = response.candidates[0].content.parts[0].text;
            }
            return text || "Confira esta oferta especial!";
        } catch (error: any) {
            console.error("Gemini Error:", error);
            if (error.status === 429 || error.message?.includes('429')) {
                return "Cota excedida. Tente mais tarde.";
            }
        }
    }

    // Ultimate Fallback
    await new Promise(resolve => setTimeout(resolve, 500));
    return `🔥 OFERTAS: ${productName} pelo menor preço! Corra e aproveite! 🛒`;
}
