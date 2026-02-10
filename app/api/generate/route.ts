import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { getPrompt, systemInstruction } from '@/lib/prompts';

// Inicializa o Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(req: NextRequest) {
  try {
    const { imageBase64, option, name, role } = await req.json();

    if (!imageBase64 || !option || !name || !role) {
      return NextResponse.json(
        { error: 'Imagem, opção, nome e área são obrigatórios' },
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

INFORMAÇÕES DA PESSOA:
- Nome: ${name}
- Área/Cargo: ${role}

CARACTERÍSTICAS FÍSICAS DA PESSOA NA FOTO:
${personDescription}

IMPORTANTE:
- Inclua o NOME "${name}" em um badge/placa elegante na parte inferior da caricatura
- Inclua o cargo "${role}" logo abaixo do nome (fonte menor)
- Os balões de fala devem estar em PORTUGUÊS BRASILEIRO
- A caricatura deve PARECER com a pessoa da foto (preservando características únicas)

Crie uma caricatura vibrante, colorida e profissional incorporando TODAS as diretrizes acima.`;

    // ETAPA 3: Gera imagem com DALL-E 3
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({
        success: true,
        description: finalPrompt,
        message: 'DALL-E 3 não configurado',
        note: 'Adicione OPENAI_API_KEY nas variáveis de ambiente para gerar imagens reais.'
      });
    }

    const dalleResponse = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'dall-e-3',
        prompt: finalPrompt,
        n: 1,
        size: '1024x1024',
        quality: 'standard'
      })
    });

    if (!dalleResponse.ok) {
      const error = await dalleResponse.json();
      throw new Error(error.error?.message || 'Erro ao gerar imagem com DALL-E 3');
    }

    const dalleData = await dalleResponse.json();
    const imageUrl = dalleData.data[0].url;

    return NextResponse.json({
      success: true,
      imageUrl: imageUrl,
      description: personDescription,
      message: 'Caricatura gerada com sucesso!',
      model: 'dall-e-3'
    });

  } catch (error: any) {
    console.error('Erro ao gerar caricatura:', error);
    return NextResponse.json(
      { error: error.message || 'Erro ao processar a imagem' },
      { status: 500 }
    );
  }
}
