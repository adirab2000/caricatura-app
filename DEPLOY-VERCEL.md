# 🚀 Deploy no Vercel - Passo a Passo Detalhado

## Por que Vercel?

- ✅ **Gratuito** para projetos pequenos/médios
- ✅ **Zero configuração** para Next.js (detecta automaticamente)
- ✅ **Deploy em 2 minutos** (literalmente)
- ✅ **SSL grátis** (HTTPS automático)
- ✅ **CDN global** (site rápido em qualquer lugar)
- ✅ Você já tem experiência com Vercel

---

## 📋 Pré-requisitos

- [x] Conta no GitHub (você já tem)
- [x] Código no GitHub (vamos fazer isso agora)
- [x] Conta no Vercel (ou criar agora)
- [x] API Key do Gemini (pegamos antes)

---

## 1️⃣ Subir código pro GitHub (5 minutos)

### Opção A: Via GitHub Desktop (mais fácil)

1. Abra GitHub Desktop
2. File → Add Local Repository
3. Escolha a pasta `caricatura-app`
4. Clique em "Publish repository"
5. **Importante:** Deixe DESMARCADO "Keep this code private" (ou marque, tanto faz)
6. Clique em "Publish repository"

### Opção B: Via terminal (mais rápido)

```bash
cd caricatura-app

# Inicializar Git
git init

# Adicionar arquivos
git add .

# Commit inicial
git commit -m "Initial commit - Caricatura de Inovação"

# Criar repositório no GitHub (você vai precisar estar logado no gh CLI)
# OU crie manualmente em github.com e depois:

# Adicionar remote
git remote add origin https://github.com/SEU_USUARIO/caricatura-app.git

# Push
git branch -M main
git push -u origin main
```

✅ **Pronto!** Código está no GitHub.

---

## 2️⃣ Deploy no Vercel (2 minutos)

### Acessar Vercel

1. Acesse: https://vercel.com
2. Clique em "Sign Up" (se não tiver conta)
3. Escolha "Continue with GitHub"
4. Autorize o Vercel a acessar seus repositórios

### Importar Projeto

1. No dashboard do Vercel, clique em **"Add New..."** → **"Project"**

2. Você verá sua lista de repositórios do GitHub

3. Encontre **"caricatura-app"** e clique em **"Import"**

4. Na tela de configuração:
   - **Framework Preset:** Next.js (já vem selecionado automaticamente)
   - **Root Directory:** `./` (deixe como está)
   - **Build Command:** `npm run build` (já vem preenchido)
   - **Output Directory:** `.next` (já vem preenchido)

5. **IMPORTANTE:** Expandir "Environment Variables"
   - Key: `GEMINI_API_KEY`
   - Value: Cole sua API Key do Gemini
   - Environment: Production ✅ (deixe marcado)

6. Clique em **"Deploy"**

### Aguardar Deploy

Você verá uma tela com:
- ✅ Building
- ✅ Deploying
- ✅ Ready

**Tempo:** 2-3 minutos

---

## 3️⃣ Testar o Site

1. Quando terminar, Vercel mostra: **"Congratulations! 🎉"**

2. Clique em **"Visit"** ou copie a URL

3. URL será algo como: `https://caricatura-app-xxx.vercel.app`

4. **Teste agora:**
   - Abra no celular
   - Tire uma foto (selfie)
   - Escolha uma opção
   - Veja se funciona

---

## 4️⃣ Configurar Domínio Próprio (Opcional, 5 minutos)

Se você quiser usar: `caricatura.seudominio.com`

### No Vercel:

1. No projeto, vá em **Settings** → **Domains**
2. Adicione: `caricatura.seudominio.com`
3. Vercel vai pedir pra adicionar um registro DNS

### No Namecheap:

1. Acesse namecheap.com → Minha conta → Domain List
2. Clique em **"Manage"** no seu domínio
3. Vá em **"Advanced DNS"**
4. Clique em **"Add New Record"**
5. Preencha:
   - **Type:** CNAME Record
   - **Host:** caricatura
   - **Value:** cname.vercel-dns.com
   - **TTL:** Automatic
6. Salve

### Aguardar propagação:

- Pode levar de 5 minutos a 48 horas (geralmente 10-30 min)
- Vercel vai mostrar quando estiver pronto

---

## 5️⃣ Configurações Avançadas (Opcional)

### Variáveis de Ambiente Adicionais

Se você decidir usar DALL-E 3:

1. No Vercel, vá em **Settings** → **Environment Variables**
2. Adicione:
   - Key: `OPENAI_API_KEY`
   - Value: sua chave OpenAI
3. **IMPORTANTE:** Depois de adicionar, você precisa fazer **Redeploy**
   - Vá em **Deployments**
   - Clique nos 3 pontinhos da última versão
   - **"Redeploy"**

### Auto-deploy

Por padrão, Vercel já faz auto-deploy quando você faz push pro GitHub:

```bash
# Qualquer mudança no código:
git add .
git commit -m "Atualização"
git push

# Vercel automaticamente faz novo deploy em 2 min
```

### Ver Logs

Se algo der errado:

1. Vá em **Deployments**
2. Clique no deployment com erro
3. Veja os **"Build Logs"**
4. Erros aparecem em vermelho

---

## 6️⃣ Gerar QR Code

Agora que seu site está no ar:

### Opção A: QR Code Generator (recomendado)

1. Acesse: https://www.qr-code-generator.com
2. Cole sua URL do Vercel
3. Customize:
   - Frame: "Bottom frame with text"
   - Texto: "Escaneie para criar sua caricatura"
   - Cores: Azul corporativo do Rendimento
4. Baixe em **alta resolução** (1000x1000px ou maior)

### Opção B: QR Grátis (mais simples)

1. Acesse: https://br.qr-code-generator.com
2. Cole a URL
3. Baixe PNG

### Usar no PowerPoint

1. Insira o QR Code no slide
2. Tamanho recomendado: **10-15cm** (para projeção)
3. Teste escaneando do celular enquanto projeta

**Dica:** Faça um slide só com:
- QR Code grande
- Texto: "Escaneie e crie sua caricatura de inovação"
- URL por extenso embaixo (caso alguém prefira digitar)

---

## 🎯 Checklist Final

Antes do evento, confira:

- [ ] Site está no ar e acessível
- [ ] Testei no meu celular (foto + opção + resultado)
- [ ] QR Code está gerado e funciona
- [ ] QR Code está no slide de apresentação
- [ ] GEMINI_API_KEY está configurada no Vercel
- [ ] Site carrega rápido (teste em 4G)
- [ ] Mensagens de erro estão claras
- [ ] Testei com 2-3 pessoas ao mesmo tempo

---

## 🔧 Troubleshooting

### Deploy falhou

**Erro comum:** `GEMINI_API_KEY is not defined`

**Solução:**
1. Vá em Settings → Environment Variables
2. Adicione a variável
3. Deployments → Redeploy

---

### Site lento

**Problema:** Vercel free tier pode ter cold starts (primeira requisição demora)

**Solução:**
1. Acesse o site 5 min antes da apresentação (para "aquecer")
2. OU faça upgrade pra Vercel Pro ($20/mês, só no mês do evento)

---

### QR Code não funciona

**Problema:** QR Code muito pequeno ou de baixa qualidade

**Solução:**
1. Gere novamente em alta resolução
2. Teste escanear do celular antes de projetar
3. Se o projetor for ruim, aumente o tamanho no slide

---

### Muita gente usando ao mesmo tempo

**Problema:** Gemini tem limite de 60 requisições/minuto

**Solução:**
1. Divida em grupos (ex: "mesa 1 primeiro, depois mesa 2")
2. OU adicione uma fila no código (mais complexo)
3. OU considere DALL-E 3 (sem limite tão agressivo)

---

## 💰 Custos

- **Vercel Free Tier:**
  - 100 GB de bandwidth
  - Serverless function executions ilimitadas
  - Suficiente para 100-1000 pessoas

- **Se ultrapassar (improvável):**
  - Vercel Pro: $20/mês
  - Pode cancelar depois do evento

---

## 📝 Próximos Passos

1. ✅ Deploy completo
2. ✅ QR Code gerado
3. → Agora: Testar com amigos/colegas
4. → Depois: Tirar prints para apresentação
5. → No dia: Só projetar e funcionar!

---

**Pronto! Seu site está no ar e pronto para o evento.** 🚀
