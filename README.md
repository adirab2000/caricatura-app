# 🎨 Caricatura de Inovação

Aplicação web para gerar caricaturas personalizadas usando IA, desenvolvida para demonstração de cultura de inovação no Rendimento.

## 🎯 O que faz

1. Usuário envia uma foto
2. Escolhe uma das 4 áreas de inovação
3. IA gera uma caricatura personalizada em estilo editorial
4. Resultado em ~30 segundos

## 🚀 Setup Rápido (5 minutos)

### 1. Pré-requisitos

- Node.js 18+ instalado
- Conta Google (para API do Gemini)

### 2. Obter API Key do Gemini

1. Acesse: https://makersuite.google.com/app/apikey
2. Faça login com sua conta Google
3. Clique em "Create API Key"
4. Copie a chave gerada

**IMPORTANTE:** O tier gratuito do Gemini tem limites generosos:
- 60 requisições por minuto
- Sem custo até usar bastante

### 3. Instalar dependências

```bash
# Na pasta do projeto
npm install
```

### 4. Configurar variáveis de ambiente

```bash
# Copie o arquivo de exemplo
cp .env.example .env.local

# Edite o arquivo .env.local e adicione sua API key
GEMINI_API_KEY=sua_chave_aqui
```

### 5. Rodar localmente

```bash
npm run dev
```

Acesse: http://localhost:3000

## 📱 Testar no celular (mesma rede WiFi)

1. Descubra seu IP local:
   ```bash
   # Windows
   ipconfig

   # Mac/Linux
   ifconfig | grep inet
   ```

2. No celular, acesse: `http://SEU_IP:3000`
   - Exemplo: `http://192.168.1.10:3000`

3. Teste o fluxo completo

## 🌐 Deploy no Vercel (10 minutos)

### Opção A: Via Interface (mais fácil)

1. Acesse: https://vercel.com
2. Faça login com sua conta GitHub
3. Clique em "Add New..." → "Project"
4. Selecione o repositório do projeto
5. Em "Environment Variables", adicione:
   - Key: `GEMINI_API_KEY`
   - Value: sua chave do Gemini
6. Clique em "Deploy"
7. Aguarde 2-3 minutos
8. Pronto! Você terá uma URL tipo: `https://seu-projeto.vercel.app`

### Opção B: Via CLI

```bash
# Instalar Vercel CLI
npm i -g vercel

# Fazer login
vercel login

# Deploy
vercel

# Adicionar variável de ambiente
vercel env add GEMINI_API_KEY

# Deploy de produção
vercel --prod
```

## 🔗 Conectar domínio próprio (Namecheap)

Você já tem domínio no Namecheap. Para conectar:

### No Vercel:

1. Vá no projeto → Settings → Domains
2. Adicione: `caricatura.seudominio.com`
3. Vercel vai te dar um registro DNS

### No Namecheap:

1. Acesse seu domínio → Advanced DNS
2. Adicione um registro CNAME:
   - **Host**: `caricatura`
   - **Value**: `cname.vercel-dns.com`
   - **TTL**: Automatic
3. Salve

Aguarde 5-10 minutos e acesse: `https://caricatura.seudominio.com`

## 📸 Gerar QR Code

Depois de fazer deploy:

1. Acesse: https://qr-code-generator.com
2. Cole a URL do seu site
3. Customize (opcional):
   - Adicione logo do Rendimento
   - Escolha cores
4. Baixe em alta resolução (PNG, 1000x1000px)
5. Use no PowerPoint da apresentação

## ⚠️ IMPORTANTE: Sobre geração de imagens

**A versão atual usa Gemini apenas para ANÁLISE da foto.**

Para gerar IMAGENS reais, você tem 3 opções:

### Opção 1: DALL-E 3 (Recomendado para qualidade)

**Custo:** ~$0.04/imagem = $4 para 100 pessoas

**Setup:**
1. Crie conta: https://platform.openai.com
2. Adicione crédito ($5-10)
3. Gere API Key
4. Descomente o código alternativo em `app/api/generate/route.ts`
5. Adicione `OPENAI_API_KEY` no Vercel

### Opção 2: Stable Diffusion (Barato e rápido)

**Custo:** ~$0.005/imagem = $0.50 para 100 pessoas

**Setup:**
1. Crie conta: https://replicate.com
2. Pegue API token
3. Use o modelo: `stability-ai/sdxl`

### Opção 3: Manter Gemini (Grátis mas sem imagem)

Útil para:
- Testar o fluxo completo
- Demonstrar a experiência do usuário
- MVP sem custo

## 🎯 Fluxo de uso no evento

1. Projete o QR Code no telão
2. Peça para líderes escanearem
3. Cada um abre no próprio celular
4. Enviam foto + escolhem opção
5. Recebem caricatura em ~30s
6. (Opcional) Projete algumas caricaturas no telão

## 🔧 Troubleshooting

### Erro: "GEMINI_API_KEY não configurada"
→ Você esqueceu de adicionar a variável de ambiente

### Erro: "Rate limit exceeded"
→ Muitas requisições simultâneas. Gemini tem limite de 60/min

### Erro: "Image too large"
→ O upload tem limite de 4MB. Redimensione a foto antes

### Site lento ou travando
→ Vercel free tier aguenta bem, mas se tiver MUITO acesso simultâneo (>100), considere upgrade

## 📊 Custos estimados

- **Infraestrutura:** R$ 0 (Vercel free tier)
- **Gemini API:** R$ 0 (tier free)
- **Domínio:** Você já tem
- **DALL-E 3 (opcional):** ~$4-10 (só se usar)

**Total:** Entre R$ 0 e R$ 60 (se usar DALL-E)

## 🎬 Para o "print do processo"

Se você for tirar prints para mostrar na apresentação:

1. **Print do código** (VS Code com syntax highlight)
2. **Print da UI no celular** (use simulador Chrome DevTools)
3. **Print do Vercel Deploy** (mostra a simplicidade)
4. **Print do resultado final** (caricatura gerada)

Dica: Use um tema clean no VS Code (GitHub Light) para os prints ficarem melhores.

## 📝 Próximos passos

1. Rode localmente e teste
2. Faça deploy no Vercel
3. Teste com seu celular
4. Gere o QR Code
5. Tire os prints
6. No dia do evento, só abre e funciona!

---

**Dúvidas?** Releia este README ou consulte a documentação oficial:
- Next.js: https://nextjs.org/docs
- Vercel: https://vercel.com/docs
- Gemini: https://ai.google.dev/docs
