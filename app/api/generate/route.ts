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
    const finalPrompt = `Create a CLEAN, MODERN and PROFESSIONAL CARICATURE ILLUSTRATION.

STYLE:
- Editorial cartoon style (not childish, not mascot)
- Clean lines, flat colors, minimal shading
- Professional, elegant, friendly look
- White or very light background
- Focus on the person’s face and expression

PERSON (must resemble the real person):
Name: ${name}
Role: ${role}

PHYSICAL FEATURES (MUST be preserved accurately):
${personDescription}

COMPOSITION RULES (VERY IMPORTANT):
1. Central bust portrait (head and shoulders only)
2. Maximum of 2 or 3 simple visual icons TOTAL
3. Icons must be subtle, abstract and secondary
4. NO decorative text, NO fake words, NO random phrases
5. Do NOT invent slogans, buzzwords or nonsense text
6. No speech bubbles unless explicitly described below
7. The face is the hero — icons must never compete with it

TEXT RULES:
- The ONLY text allowed is:
  • Name: "${name}"
  • Role: "${role}"
- Text must be clean, readable and minimal
- Do not add any other words, labels or phrases

GOAL:
Create a high-quality professional caricature that clearly resembles the real person,
suitable for a corporate leadership or innovation event.
`;


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
