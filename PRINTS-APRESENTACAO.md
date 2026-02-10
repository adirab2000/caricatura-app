# 📸 Guia de Prints para Apresentação

## 🎯 Objetivo

Você vai **tirar prints do processo** para mostrar na apresentação:
- "Criei isso em 30 minutos com IA"
- Demonstrar simplicidade
- Desmistificar tecnologia

---

## 🖼️ Prints Essenciais (em ordem cronológica)

### 1. **PROMPT INICIAL** → Mostra o "pedido" pra IA

**O que printar:**
- Conversa com o Claude/ChatGPT onde você pede pra criar o app
- Ou print do Cursor/Copilot gerando código

**Como fazer:**
```
Prompt sugerido:
"Crie uma aplicação Next.js onde o usuário:
1. Faz upload de uma foto
2. Escolhe entre 4 opções (simplificar, acelerar, decidir, conectar)
3. Recebe uma caricatura gerada por IA
Use Tailwind CSS e integre com Gemini API."
```

**Onde usar no PPT:**
- Slide: "Como começamos"
- Mostra que IA entende instrução simples

---

### 2. **CÓDIGO GERADO** → Mostra a IA trabalhando

**O que printar:**
- VS Code com código do `page.tsx` aberto
- Ou arquivo `route.ts` (backend)

**Configurações ideais:**
- Tema claro (GitHub Light Theme)
- Zoom 150-175% (para projeção)
- Syntax highlighting ativado
- Esconder sidebar (mais espaço pro código)

**Atalho no VS Code:**
```
View → Appearance → Zen Mode (ou Ctrl+K Z)
```

**Onde usar no PPT:**
- Slide: "Do pedido ao código em minutos"
- Não precisa ser legível 100%, é só pra mostrar "tem código aqui"

---

### 3. **TERMINAL RODANDO** → Mostra que funciona

**O que printar:**
- Terminal com `npm run dev`
- Mensagem: "Ready on http://localhost:3000"

**Como fazer:**
1. Abra o terminal integrado do VS Code
2. Rode `npm run dev`
3. Aguarde aparecer "Ready"
4. Print full screen

**Onde usar no PPT:**
- Slide: "Rodando localmente em segundos"

---

### 4. **UI NO NAVEGADOR** → Mostra o visual

**O que printar:**
- Tela inicial (upload de foto)
- Tela de opções (com 4 botões)
- Tela de resultado

**Como fazer:**
1. Abra Chrome DevTools (F12)
2. Clique no ícone de celular (Ctrl+Shift+M)
3. Escolha "iPhone 12 Pro" (ou similar)
4. Navegue pelo app
5. Print cada tela

**Configurações:**
- Largura: 375px (mobile)
- Background branco
- URL bar escondida

**Onde usar no PPT:**
- Slide: "Interface pronta e responsiva"
- Ou 3 slides seguidos (cada tela)

---

### 5. **VERCEL DEPLOY** → Mostra a publicação

**O que printar:**
- Tela do Vercel durante o deploy
- Ou tela final "Congratulations 🎉"
- Ou dashboard com a URL do site

**Como fazer:**
1. Durante o deploy, print a tela "Building..."
2. Quando terminar, print "Ready"
3. Print a URL gerada

**Onde usar no PPT:**
- Slide: "Deploy em 2 minutos"
- Mostra URL pública funcionando

---

### 6. **CELULAR REAL** → Mostra o uso final

**O que printar:**
- Foto do celular escaneando o QR Code
- Ou screenshot do celular com o app aberto

**Como fazer (2 opções):**

**Opção A: Screenshot do celular**
1. Abra o site no seu celular
2. Tire screenshot de cada etapa
3. Use aplicativo de mockup (ex: Previewed.app)
4. Gera imagem do celular com screenshot dentro

**Opção B: Foto do celular físico**
1. Projete o QR Code na TV/monitor
2. Tire foto do seu celular escaneando
3. Ou foto do app aberto no celular na sua mão

**Onde usar no PPT:**
- Slide: "Pronto para usar"
- Último slide antes do "Agora é com vocês"

---

## 🎨 Prints OPCIONAIS (se tiver tempo)

### 7. **GITHUB REPOSITORY**
- Print do código no GitHub (mostra versionamento)

### 8. **LOGS DO GEMINI**
- Print do console mostrando chamada da API (mostra integração real)

### 9. **ANALYTICS**
- Se testar antes com amigos, print "10 pessoas já usaram"

### 10. **COMPARAÇÃO**
- Print "antes" (tela em branco) vs "depois" (app funcionando)

---

## 📐 Especificações Técnicas dos Prints

### Resolução
- **Mínimo:** 1920x1080 (Full HD)
- **Ideal:** 2560x1440 (2K) ou maior
- **Formato:** PNG (não JPEG, para texto ficar nítido)

### Como tirar print em alta qualidade

**Windows:**
```
Win + Shift + S → Seleciona área
OU
Use Snipping Tool (ferramenta nativa)
```

**Mac:**
```
Cmd + Shift + 4 → Seleciona área
OU
Cmd + Shift + 3 → Tela inteira
```

**Chrome (para prints de site):**
```
F12 → Ctrl+Shift+P → "Capture full size screenshot"
(Pega página inteira, mesmo que tenha scroll)
```

---

## 🎯 Montagem no PowerPoint

### Slide sugerido 1: "Do Zero ao Deploy em 30 Minutos"

Layout:
```
┌─────────────────────────────────────┐
│  TÍTULO: "Do Zero ao Deploy"        │
├─────────────────────────────────────┤
│  [Print 1: Prompt]     →            │
│  [Print 2: Código]     →            │
│  [Print 3: Terminal]   →            │
│  [Print 5: Vercel]                  │
└─────────────────────────────────────┘
```

### Slide sugerido 2: "Interface e Experiência"

Layout:
```
┌─────────────────────────────────────┐
│  TÍTULO: "Simples e Funcional"      │
├─────────────────────────────────────┤
│  [3 prints da UI lado a lado]       │
│  Upload → Opções → Resultado        │
└─────────────────────────────────────┘
```

### Slide sugerido 3: "Pronto Para Usar"

Layout:
```
┌─────────────────────────────────────┐
│  TÍTULO: "Agora é Com Vocês"        │
├─────────────────────────────────────┤
│        [QR CODE GRANDE]              │
│                                      │
│  "Escaneie e crie sua caricatura"   │
│   caricatura.seudominio.com         │
└─────────────────────────────────────┘
```

---

## 🎬 Ordem Narrativa Sugerida

**Storytelling para apresentação:**

1. **Contexto** (verbal)
   - "Precisávamos de uma experiência interativa"
   - "Algo que qualquer líder pudesse usar"

2. **Processo** (mostrar prints)
   - Print 1: "Pedi pra IA criar isso"
   - Print 2: "Ela gerou o código"
   - Print 3: "Rodei localmente"
   - Print 4: "Interface pronta"
   - Print 5: "Deploy em 2 minutos"

3. **Resultado** (mostrar celular/QR)
   - Print 6: "Agora está funcionando"
   - Projetar QR Code
   - "Vocês podem usar agora"

4. **Mensagem** (verbal)
   - "Se criamos isso em 30 min com IA"
   - "Imagine o que vocês podem fazer no dia a dia"
   - "IA não é técnica, é ferramenta cotidiana"

---

## 💡 Dicas de Design no PPT

### Cores
- Fundo escuro (melhor contraste pra prints)
- Ou fundo branco com bordas nos prints

### Setas/Anotações
- Use setas para mostrar fluxo (Print 1 → Print 2 → Print 3)
- Círculos vermelhos para destacar partes importantes do código
- Números (1, 2, 3) para ordem cronológica

### Texto
- **Fonte:** Sans-serif (Montserrat, Roboto, ou Arial)
- **Tamanho mínimo:** 24pt (para ser legível de longe)
- **Contraste:** Preto sobre branco ou branco sobre azul escuro

### Animações
- Evite animações complexas (distrai)
- Use "Aparecer" simples se quiser mostrar prints um por um

---

## 📋 Checklist de Prints

Antes da apresentação, confirme que tem:

- [ ] Print do prompt/pedido inicial
- [ ] Print do código gerado (VS Code)
- [ ] Print do terminal rodando (`npm run dev`)
- [ ] Print da tela inicial (upload)
- [ ] Print da tela de opções (4 botões)
- [ ] Print da tela de resultado
- [ ] Print do Vercel deploy
- [ ] Foto/screenshot do celular usando
- [ ] QR Code em alta resolução (separado)
- [ ] Todos os prints estão em PNG
- [ ] Todos os prints têm boa resolução (>1920x1080)
- [ ] Testei projetar os slides (tudo legível?)

---

## 🚀 Timing Sugerido na Apresentação

**Total: 2-3 minutos de "prints"**

- 0:00-0:30 → Contexto verbal
- 0:30-1:30 → Mostrar prints do processo (1-5)
- 1:30-2:00 → Mostrar resultado no celular (print 6)
- 2:00-2:30 → Projetar QR Code
- 2:30+ → Pessoas usando (ao vivo!)

---

## 🎯 Mensagem Principal

Os prints servem para mostrar:

✅ **Rapidez** → 30 minutos do zero ao deploy
✅ **Simplicidade** → IA entende pedido simples
✅ **Praticidade** → Funciona de verdade (não é conceito)
✅ **Acessibilidade** → Se eu fiz, você pode fazer

**Não é sobre o código. É sobre destravar o uso de IA.**

---

**Pronto! Com esses prints, sua apresentação vai ter impacto visual e credibilidade.** 📸✨
