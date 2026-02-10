import { NextRequest, NextResponse } from 'next/server';
import { getPrompt, systemInstruction } from '@/lib/prompts';

export async function POST(req: NextRequest) {
  try {
    const { imageBase64, option, name, role } = await req.json();

    if (!imageBase64 || !option || !name || !role) {
      return NextResponse.json(
        { error: 'Imagem, opção, nome e área são obrigatórios' },
        { status: 400 }
      );
    }


    // ETAPA 1: Analisa a foto com GPT-4 Vision (melhor para detalhes faciais)
    const base64Data = imageBase64.replace(/^data:image\/\w+;base64,/, '');

    const visionResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: `Analise esta foto e descreva EM DETALHES as características físicas da pessoa:
- Formato exato do rosto (oval, redondo, quadrado, triangular)
- Cabelo: comprimento, cor, textura, estilo (liso/ondulado/cacheado)
- Olhos: cor, formato, tamanho, expressão
- Nariz: formato e tamanho
- Boca e sorriso: formato dos lábios, tipo de sorriso
- Pele: tom exato
- Óculos, brincos, ou acessórios visíveis
- Roupas: estilo, cor
- Expressão facial geral
- Qualquer característica marcante ou única

Seja EXTREMAMENTE DETALHADO e preciso. Use adjetivos específicos.`
              },
              {
                type: 'image_url',
                image_url: {
                  url: imageBase64
                }
              }
            ]
          }
        ],
        max_tokens: 500
      })
    });

    if (!visionResponse.ok) {
      throw new Error('Erro ao analisar imagem com GPT-4 Vision');
    }

    const visionData = await visionResponse.json();
    const personDescription = visionData.choices[0].message.content;

    // ETAPA 2: Gera prompt detalhado para a caricatura
    const promptBase = getPrompt(option);
    const finalPrompt = `Create a VIBRANT CARTOON CARICATURE in Brazilian corporate infographic style.

${promptBase}

PERSON DETAILS:
- Name: ${name}
- Role: ${role}

CRITICAL - EXACT PHYSICAL FEATURES TO PRESERVE:
${personDescription}

MANDATORY REQUIREMENTS:
1. Include name badge at bottom: "${name}"
2. Below name, include: "${role}"
3. ALL speech bubbles MUST be in BRAZILIAN PORTUGUESE (the specific phrases are already provided in the style guide above)
4. The caricature MUST look like the person described above - preserve their unique features
5. Use the exact colors specified in the style guide
6. Include all icons mentioned in the style guide

Create a vibrant, colorful, professional caricature following ALL guidelines above.`;


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
