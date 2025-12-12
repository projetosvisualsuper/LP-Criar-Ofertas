# Tutorial: Implantando Função de Borda (Edge Function) Segura no Supabase

Para garantir a segurança máxima da sua chave da OpenAI em produção, você deve usar uma Supabase Edge Function.
Abaixo está o passo a passo para configurar.

## 1. Login no Supabase
Como a instalação global falhou, vamos usar o `npx` que já vem com seu Node.js. É mais fácil e não precisa instalar nada antes.

Execute:
```bash
npx supabase login
```

## 2. Criar a Função
Na raiz do seu projeto, rode:
```bash
npx supabase functions new generate-copy
```
Isso criará uma pasta `supabase/functions/generate-copy/index.ts`.

## 4. Código da Função
Substitua o conteúdo de `supabase/functions/generate-copy/index.ts` por:

```typescript
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
      throw new Error('Chave da OpenAI não configurada no servidor')
    }

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
    })

    const data = await response.json()
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
```

## 5. Salvar sua Chave como Segredo (Secret)
Nunca coloque a chave no código. Salve-a no cofre seguro do Supabase:

```bash
npx supabase secrets set OPENAI_API_KEY=sk-sua-chave-aqui
```

## 6. Implantar (Deploy)
Envie a função para o servidor do Supabase:

```bash
npx supabase functions deploy generate-copy --no-verify-jwt
```
*Nota: `--no-verify-jwt` permite chamar a função sem estar logado no app, se desejar. Caso queira proteger, remova essa flag e envie o token de sessão do usuário no frontend.*

## 7. Usar no Frontend
Agora você pode atualizar o `aiService.ts` para chamar essa função em vez de chamar a OpenAI diretamente.

```typescript
// Exemplo de chamada:
const { data, error } = await supabase.functions.invoke('generate-copy', {
  body: { productName: 'Picanha' }
})
```
