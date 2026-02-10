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

    // Usa Gemini 2.5 Flash - modelo mais recente (Junho 2025) com suporte a imagens
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.5-flash'
    });

    const base64Data = imageBase64.replace(/^data:image\/\w+;base64,/, '');
    const prompt = getPrompt(option);

    const result = await model.generateContent([
      {
        text: `INSTRUÇÕES DO SISTEMA:
${systemInstruction}

Analise esta foto e descreva como seria a caricatura ideal desta pessoa.

Use o estilo e as diretrizes abaixo:
${prompt}

Retorne apenas a descrição final da caricatura, em português, de forma clara e objetiva.`
      },
      {
        inlineData: {
          mimeType: 'image/jpeg',
          data: base64Data
        }
      }
    ]);

    const description = result.response.text();

    return NextResponse.json({
      success: true,
      description,
      message: 'Caricatura gerada com sucesso!',
      note: 'Versão de demonstração. Para produção, integrar com DALL·E ou Stable Diffusion.'
    });

  } catch (error: any) {
    console.error('Erro ao gerar caricatura:', error);
    return NextResponse.json(
      { error: error.message || 'Erro ao processar a imagem' },
      { status: 500 }
    );
  }
}
