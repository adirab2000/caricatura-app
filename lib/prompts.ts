export const getPrompt = (option: number): string => {
  const basePrompt = `
Crie uma caricatura ilustrada em estilo cartoon sofisticado e moderno, representando um líder de inovação.

ESTILO VISUAL:
- Cartoon editorial sofisticado (estilo The New Yorker meets corporate illustration)
- Exagero leve nas proporções (cabeça ligeiramente maior, traços marcantes)
- Paleta de cores moderna e profissional (evitar cores muito saturadas)
- Linhas limpas e definidas
- Fundo minimalista com 1-2 elementos geométricos sutis

COMPOSIÇÃO:
- Retrato 3/4 do líder em pose confiante mas acessível
- 1 símbolo visual relacionado à área de inovação escolhida (integrado de forma elegante)
- 2 balões de fala curtos com frases impactantes (máximo 5 palavras cada)
- Layout tipo pôster moderno

IMPORTANTE:
- NADA de elementos sci-fi, robôs, circuitos, ou visuais futuristas clichês
- Foco na humanização da liderança + inovação prática
- Tom inspirador mas realista
- Qualidade editorial/corporativa

`;

  const variations = {
    1: `
FOCO ESPECÍFICO: Simplificar processos

Elementos visuais:
- Símbolo: Diagrama de fluxo simplificado ou tesoura cortando burocracia
- Balões: "Menos é mais" e "Clareza gera agilidade"
- Expressão: Determinação serena
- Paleta: Azuis e cinzas com toques de verde menta
`,
    2: `
FOCO ESPECÍFICO: Acelerar entregas

Elementos visuais:
- Símbolo: Seta ascendente ou cronômetro estilizado
- Balões: "Velocidade com qualidade" e "Entregas que importam"
- Expressão: Energia controlada e foco
- Paleta: Laranjas vibrantes e cinzas com toques de amarelo
`,
    3: `
FOCO ESPECÍFICO: Tomar melhores decisões

Elementos visuais:
- Símbolo: Bússola ou lente de aumento sobre dados
- Balões: "Dados guiam, intuição decide" e "Clareza estratégica"
- Expressão: Contemplação estratégica
- Paleta: Roxos e azuis escuros com toques dourados
`,
    4: `
FOCO ESPECÍFICO: Conectar pessoas

Elementos visuais:
- Símbolo: Rede de nós conectados ou ponte entre pontos
- Balões: "Juntos vamos além" e "Colaboração multiplica"
- Expressão: Abertura e empatia
- Paleta: Azuis turquesa e verdes com toques de coral
`,
  };

  return basePrompt + (variations[option as keyof typeof variations] || variations[1]);
};

export const systemInstruction = `
Você é um gerador especializado de caricaturas corporativas de alta qualidade.
Seu objetivo é criar ilustrações que inspirem líderes e equipes, evitando clichês visuais.
Foque em representações humanas, acessíveis e profissionais.
`;
