export const getPrompt = (option: number): string => {
  const basePrompt = `
Caricatura cartoon VIBRANTE estilo infográfico brasileiro corporativo.

VISUAL:
- Cartoon colorido, alegre, expressivo
- Cabeça 40% maior, traços faciais EXAGERADOS mas reconhecíveis
- Cores VIBRANTES saturadas (azul royal, laranja, verde limão, roxo, amarelo)
- Fundo BRANCO, contornos grossos
- Pessoa dos ombros pra cima, SORRINDO, olhando pro espectador

ELEMENTOS OBRIGATÓRIOS:
- 3-4 balões de fala coloridos com frases em PORTUGUÊS
- 6-8 ícones coloridos ao redor (foguete, lâmpada, gráficos, raio, troféu)
- Setas, elementos gráficos dinâmicos

SEMELHANÇA CRÍTICA:
- PRESERVE características faciais únicas: formato rosto, olhos, cabelo, barba
- Mantenha tom de pele, cor cabelo, traços étnicos
- Inclua óculos, acessórios marcantes se houver
- Pessoa deve ser RECONHECÍVEL mesmo exagerada
`;

  const variations = {
    1: `FOCO: Simplificar processos
Balões: "Menos é mais!", "Clareza gera agilidade!", "Pensar fora da caixa!"
Ícones: tesoura, fluxo, check marks, pasta
Cores: AZUL ROYAL, VERDE LIMÃO, CINZA`,

    2: `FOCO: Acelerar entregas
Balões: "Velocidade com qualidade!", "Entregas que importam!", "Não tenham medo!"
Ícones: foguete, cronômetro, raio, setas ascendentes, troféu
Cores: LARANJA VIBRANTE, AMARELO, VERMELHO`,

    3: `FOCO: Melhores decisões
Balões: "Dados guiam, intuição decide!", "Clareza estratégica!", "Pensar fora da caixa!"
Ícones: lupa, gráficos, bússola, lâmpada, cérebro, alvo
Cores: ROXO, AZUL ESCURO, DOURADO`,

    4: `FOCO: Conectar pessoas
Balões: "Juntos vamos além!", "Colaboração multiplica!", "Não tenham medo!"
Ícones: rede, mãos dadas, ponte, balões conversa, coração
Cores: AZUL TURQUESA, VERDE ÁGUA, CORAL`,
  };

  return basePrompt + (variations[option as keyof typeof variations] || variations[1]);
};

export const systemInstruction = `Especialista em caricaturas corporativas vibrantes brasileiras. Estilo infográfico moderno + apresentação profissional. SEMPRE semelhança com pessoa real (mesmo exagerando) + português brasileiro. Resultado alegre, inspirador, profissional.`;
