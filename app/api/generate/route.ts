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

    // ETAPA 1: Analisa a foto com Gemini 2.5 Flash
    const analyzeModel = genAI.getGenerativeModel({
      model: 'gemini-2.5-flash'
    });

    const base64Data = imageBase64.replace(/^data:image\/\w+;base64,/, '');

    const analysisResult = await analyzeModel.generateContent([
      {
        inlineData: {
          mimeType: 'image/jpeg',
          data: base64Data
        }
      },
      {
        text: 'Descreva as características físicas principais desta pessoa em 2-3 frases: formato do rosto, cabelo, traços marcantes, expressão. Seja objetivo e descritivo.'
      }
    ]);

    const personDescription = analysisResult.response.text();

    // ETAPA 2: Gera prompt detalhado para a caricatura
    const promptBase = getPrompt(option);
    const finalPrompt = `${systemInstruction}

${promptBase}

CARACTERÍSTICAS DA PESSOA NA FOTO:
${personDescription}

Crie uma caricatura editorial sofisticada incorporando estas características da pessoa real, seguindo todas as diretrizes de estilo acima.`;

    // ETAPA 3: Tenta gerar imagem com Gemini 2.5 Flash Image (Nano Banana)
    try {
      const imageModel = genAI.getGenerativeModel({
        model: 'gemini-2.5-flash-image'
      });

      const imageResult = await imageModel.generateContent(finalPrompt);

      // Se retornar imagem, processa
      const response = imageResult.response;

      // Tenta extrair URL ou base64 da imagem
      // (O formato exato depende da resposta da API)
      const imageUrl = response.text(); // Pode ser URL ou base64

      return NextResponse.json({
        success: true,
        imageUrl: imageUrl,
        description: personDescription,
        message: 'Caricatura gerada com sucesso!',
        model: 'gemini-2.5-flash-image'
      });

    } catch (imageError: any) {
      // Se falhar, retorna descrição textual
      console.warn('Gemini Image falhou, retornando descrição:', imageError.message);

      return NextResponse.json({
        success: true,
        description: finalPrompt,
        message: 'Descrição da caricatura gerada',
        note: `Modelo gemini-2.5-flash-image não disponível. Erro: ${imageError.message}`,
        fallback: true
      });
    }

  } catch (error: any) {
    console.error('Erro ao gerar caricatura:', error);
    return NextResponse.json(
      { error: error.message || 'Erro ao processar a imagem' },
      { status: 500 }
    );
  }
}
