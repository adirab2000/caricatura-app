export const getPrompt = (option: number): string => {
  const basePrompt = `
Crie uma CARICATURA CARTOON VIBRANTE E PROFISSIONAL de um líder de inovação, no estilo de ilustração corporativa moderna brasileira (similar a materiais de LinkedIn, infográficos empresariais coloridos).

ESTILO VISUAL OBRIGATÓRIO:
- Caricatura cartoon COLORIDA, ALEGRE e EXPRESSIVA
- Características faciais EXAGERADAS mas RECONHECÍVEIS (olhos expressivos maiores, sorriso marcante, traços distintivos amplificados)
- Cabeça proporcionalmente MAIOR que o corpo (típico de caricatura - aproximadamente 40% maior)
- Cores VIBRANTES e saturadas (azul royal, laranja vibrante, verde limão, roxo, amarelo - evite pastéis)
- Fundo BRANCO PURO ou cor sólida clara
- Contornos GROSSOS e bem definidos (estilo cartoon/infográfico)
- Sombreamento simples mas efetivo (dá volume sem perder a leveza)

ELEMENTOS VISUAIS OBRIGATÓRIOS (em português brasileiro):
- 3-4 BALÕES DE FALA coloridos com FRASES CURTAS e IMPACTANTES em português
- 6-10 ÍCONES COLORIDOS flutuando ao redor (foguete, lâmpada, gráficos, engrenagens, raios, troféu, relógio, etc.)
- Setas direcionais, linhas de movimento, elementos gráficos dinâmicos
- Pequenos detalhes temáticos (laptop, celular, documentos estilizados)
- Todos os elementos bem distribuídos criando composição equilibrada mas dinâmica

COMPOSIÇÃO:
- Pessoa CENTRALIZADA, do peito/ombros pra cima
- Pose CONFIANTE: sorrindo largamente, olhando direto pro espectador, postura aberta
- Roupas profissionais mas descontraídas (polo, camisa social, ou camiseta corporativa)
- Balões posicionados em diferentes alturas e ângulos (evite simetria perfeita)
- Ícones distribuídos organicamente ao redor da pessoa
- Sensação de movimento e energia positiva

DIRETRIZES CRÍTICAS DE SEMELHANÇA:
- ANALISE CUIDADOSAMENTE as características faciais únicas da pessoa: formato do rosto, olhos, nariz, boca, cabelo, barba/maquiagem
- PRESERVE essas características mesmo ao exagerar (cabelo longo permanece longo, barba permanece barba, etc.)
- Mantenha TOM DE PELE, COR DE CABELO e TRAÇOS ÉTNICOS fielmente
- Se a pessoa usa ÓCULOS, INCLUA na caricatura (exagerados mas presentes)
- Se tem BRINCOS, TATUAGENS visíveis, ou ACESSÓRIOS marcantes, INCLUA
- O objetivo é que qualquer pessoa que conheça a pessoa real RECONHEÇA IMEDIATAMENTE na caricatura

ATMOSFERA E TOM:
- Inspirador, otimista, energético
- Profissional mas descontraído (não corporativo rígido)
- Celebrando inovação de forma humana e acessível
- Qualidade de apresentação/material de palestras

`;

  const variations = {
    1: `
FOCO ESPECÍFICO: Simplificar processos

Frases para balões (em português):
- "Menos é mais!"
- "Vamos pensar fora da caixa!"
- "Clareza gera agilidade!"
- "Não tenham medo de arriscar!"

Ícones temáticos: tesoura cortando corrente, diagrama de fluxo simplificado, lixeira com papéis, setas diretas, check marks verdes, pasta organizada

Expressão facial: Determinada, focada, com sorriso confiante e olhar inspirador

Paleta de cores: AZUL ROYAL, VERDE LIMÃO, CINZA ESCURO, toques de BRANCO
`,
    2: `
FOCO ESPECÍFICO: Acelerar entregas

Frases para balões (em português):
- "Velocidade com qualidade!"
- "Entregas que importam!"
- "Juntos, podemos criar algo incrível!"
- "Não tenham medo de arriscar!"

Ícones temáticos: foguete decolando, cronômetro/relógio, raio/trovão, setas ascendentes, gráfico de crescimento, troféu, bandeira de chegada

Expressão facial: Energia controlada, sorriso animado, olhos brilhando com entusiasmo

Paleta de cores: LARANJA VIBRANTE, AMARELO SOL, CINZA ESCURO, toques de VERMELHO ENERGIA
`,
    3: `
FOCO ESPECÍFICO: Tomar melhores decisões

Frases para balões (em português):
- "Dados guiam, intuição decide!"
- "Clareza estratégica!"
- "Vamos pensar fora da caixa!"
- "Juntos, podemos criar algo incrível!"

Ícones temáticos: lupa, gráficos de dados, bússola, lâmpada acesa, cérebro, balança, alvo com flecha no centro, ícone de analytics

Expressão facial: Contemplativa mas acessível, sorriso sábio, olhar perspicaz e confiante

Paleta de cores: ROXO PROFUNDO, AZUL ESCURO, DOURADO/AMARELO, toques de VERDE MENTA
`,
    4: `
FOCO ESPECÍFICO: Conectar pessoas

Frases para balões (em português):
- "Juntos vamos além!"
- "Colaboração multiplica!"
- "Vamos pensar fora da caixa!"
- "Não tenham medo de arriscar!"

Ícones temáticos: rede de conexões, mãos dadas, ponte, balões de conversa, wifi/sinal, coração, grupo de pessoas estilizadas, estrelas conectadas

Expressão facial: Abertura e empatia, sorriso caloroso e acolhedor, olhar conectivo

Paleta de cores: AZUL TURQUESA, VERDE ÁGUA, CORAL VIBRANTE, toques de ROSA
`,
  };

  return basePrompt + (variations[option as keyof typeof variations] || variations[1]);
};

export const systemInstruction = `
Você é um especialista em criar caricaturas corporativas vibrantes e profissionais para o mercado brasileiro.
Seu estilo combina a energia de ilustrações de infográficos modernos com a qualidade de materiais de apresentação corporativa.
Priorize SEMPRE a semelhança com a pessoa real (mesmo ao exagerar características) e use português brasileiro em todos os textos.
O resultado deve ser alegre, inspirador e profissional - algo que a pessoa ficaria orgulhosa de compartilhar no LinkedIn.
`;
