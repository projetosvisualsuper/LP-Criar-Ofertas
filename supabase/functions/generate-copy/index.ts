import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
    // Handle CORS
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders })
    }

    try {
        const { productName } = await req.json()
        const openAiKey = Deno.env.get('OPENAI_API_KEY')

        if (!openAiKey) {
            throw new Error('Chave da OpenAI não configurada no servidor (Secret ausente)')
        }

        // Call OpenAI API
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${openAiKey}`
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [
                    {
                        role: "system",
                        content: "You are a specialized retail copywriter for Brazilian supermarkets and pharmacies. You write aggressive, exciting sales copy. Responda apenas com a frase da oferta, sem aspas."
                    },
                    {
                        role: "user",
                        content: `Crie uma chamada curta e vendedora para oferta de supermercado do produto: "${productName}". Use emojis. Máximo 150 caracteres.`
                    }
                ],
                temperature: 0.7,
                max_tokens: 150
            })
        })

        const data = await response.json()

        if (data.error) {
            throw new Error(`OpenAI Error: ${data.error.message}`)
        }

        const text = data.choices[0].message.content

        return new Response(JSON.stringify({ text }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })

    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })
    }
})
