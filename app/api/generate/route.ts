import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { getPrompt, systemInstruction } from '@/lib/prompts';

// Inicializa o Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(req: NextRequest) {
  try {
    const { imageBase64, option } = await req.json();

    if (!imageBase64 || !option) {
      return NextResponse.json(
        { error: 'Imagem e opção são obrigatórias' },
        { status: 400 }
      );
    }

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: 'API Key do Gemini não configurada' },
        { status: 500 }
      );
    }

    // Usa Gemini 2.0 Flash para geração de imagem
    // Nota: Se Gemini 2.0 não tiver geração de imagem disponível,
    // vamos usar Imagen via API separada
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.0-flash-exp'
    });

    // Remove o prefixo data:image/...;base64, se existir
    const base64Data = imageBase64.replace(/^data:image\/\w+;base64,/, '');

    // Monta o prompt baseado na opção escolhida
    const prompt = getPrompt(option);

    // IMPORTANTE: Gemini atualmente NÃO gera imagens diretamente
    // Esta implementação usa Gemini para análise + prompt refinado
    // E depois precisaria chamar Imagen ou outro serviço de geração

    // Por enquanto, vamos retornar a análise que o Gemini faz
    // e um placeholder indicando onde a geração real aconteceria

    const result = await model.generateContent([
      {
        role: "user",
        parts: [
          {
            text: `INSTRUÇÕES DO SISTEMA:
${systemInstruction}`
          },
          {
            inlineData: {
              mimeType: "image/jpeg",
              data: base64Data
            }
          },
          {
            text: `Analise esta foto e descreva como seria a caricatura ideal desta pessoa.

Use o estilo e as diretrizes abaixo:
${prompt}

Retorne apenas a descrição final da caricatura, em português, de forma clara e objetiva.`
          }
        ]
      }
    ]);

    const response = await result.response;
    const description = response.text();

    // NOTA IMPORTANTE PARA O DESENVOLVEDOR:
    // Aqui você precisaria chamar um serviço de geração de imagens como:
    // - DALL-E 3 (OpenAI)
    // - Stable Diffusion (Replicate/HuggingFace)
    // - Imagen (Google, quando disponível via API)
    //
    // Por enquanto, retornamos a descrição para demonstração

    return NextResponse.json({
      success: true,
      description: description,
      // Em produção, aqui estaria: imageUrl: <url da imagem gerada>
      message: 'Caricatura gerada com sucesso!',
      note: 'Esta é uma versão de demonstração. Para produção, integre com DALL-E 3 ou Stable Diffusion.'
    });

  } catch (error: any) {
    console.error('Erro ao gerar caricatura:', error);
    return NextResponse.json(
      { error: error.message || 'Erro ao processar a imagem' },
      { status: 500 }
    );
  }
}

// Versão alternativa usando DALL-E 3 (descomente para usar)
/*
export async function POST(req: NextRequest) {
  try {
    const { imageBase64, option } = await req.json();

    if (!imageBase64 || !option) {
      return NextResponse.json(
        { error: 'Imagem e opção são obrigatórias' },
        { status: 400 }
      );
    }

    // Primeiro, usa Gemini para analisar a foto
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });

    const base64Data = imageBase64.replace(/^data:image\/\w+;base64,/, '');

    const analysisResult = await model.generateContent([
      {
        inlineData: {
          mimeType: 'image/jpeg',
          data: base64Data
        }
      },
      'Descreva as características físicas principais desta pessoa em 2-3 frases curtas: formato do rosto, cabelo, traços marcantes. Seja objetivo.'
    ]);

    const personDescription = (await analysisResult.response).text();

    // Depois, usa DALL-E 3 para gerar a caricatura
    const dallePrompt = `${getPrompt(option)}

CARACTERÍSTICAS DA PESSOA:
${personDescription}

Crie a caricatura incorporando estas características da pessoa real.`;

    const response = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'dall-e-3',
        prompt: dallePrompt,
        n: 1,
        size: '1024x1024',
        quality: 'standard'
      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || 'Erro ao gerar imagem');
    }

    return NextResponse.json({
      success: true,
      imageUrl: data.data[0].url,
      message: 'Caricatura gerada com sucesso!'
    });

  } catch (error: any) {
    console.error('Erro ao gerar caricatura:', error);
    return NextResponse.json(
      { error: error.message || 'Erro ao processar a imagem' },
      { status: 500 }
    );
  }
}
*/
