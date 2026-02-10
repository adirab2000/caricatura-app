# 🚀 COMECE AQUI - Guia Rápido

## 📦 O que você tem agora

Uma **aplicação web completa** para gerar caricaturas de inovação usando IA.

**Stack:** Next.js + Tailwind CSS + Gemini API + Vercel

**Tempo de setup:** 15-30 minutos

**Custo:** R$ 0 (100% gratuito usando tier free)

---

## 🎯 Próximos Passos (Ordem Recomendada)

### **1. Ler o README** (5 min)
📄 Arquivo: `README.md`

O que tem:
- Visão geral do projeto
- Setup local em 5 minutos
- Como obter API Key do Gemini
- Deploy no Vercel
- Gerar QR Code

**Comece por aqui se você quer entender o todo.**

---

### **2. Configurar Localmente** (10 min)

```bash
# 1. Entrar na pasta
cd caricatura-app

# 2. Instalar dependências
npm install

# 3. Configurar API Key
cp .env.example .env.local
# Edite .env.local e adicione sua GEMINI_API_KEY

# 4. Rodar
npm run dev

# 5. Abrir
# http://localhost:3000
```

**Teste tudo localmente antes de fazer deploy.**

---

### **3. Fazer Deploy** (10 min)
📄 Arquivo: `DEPLOY-VERCEL.md`

Passo a passo completo:
1. Subir código pro GitHub
2. Conectar no Vercel
3. Configurar variável de ambiente
4. Deploy automático
5. Obter URL pública

**Siga esse guia quando estiver pronto pra publicar.**

---

### **4. Gerar QR Code** (2 min)

Depois do deploy:
1. Acesse: https://www.qr-code-generator.com
2. Cole sua URL do Vercel
3. Baixe em alta resolução
4. Adicione no PowerPoint

---

### **5. Tirar Prints** (15 min)
📄 Arquivo: `PRINTS-APRESENTACAO.md`

Guia completo de:
- Quais prints tirar
- Como tirar (qualidade, configurações)
- Onde usar no PPT
- Ordem narrativa

**Use isso para preparar sua apresentação.**

---

### **6. Testar Tudo** (30-60 min)
📄 Arquivo: `CHECKLIST-TESTES.md`

Checklist completo:
- Testes locais
- Testes em produção
- Teste no celular
- Teste de carga (simular evento)
- Teste no local do evento

**Faça isso 2-3 dias antes do evento.**

---

## 📁 Estrutura de Arquivos

```
caricatura-app/
├── README.md                    ← Comece aqui (visão geral)
├── COMECE-AQUI.md              ← Este arquivo (guia rápido)
├── DEPLOY-VERCEL.md            ← Guia de deploy
├── PRINTS-APRESENTACAO.md      ← Guia de prints pro PPT
├── CHECKLIST-TESTES.md         ← Checklist de testes
│
├── app/
│   ├── page.tsx                ← Interface principal
│   ├── layout.tsx              ← Layout do app
│   ├── globals.css             ← Estilos globais
│   └── api/
│       └── generate/
│           └── route.ts        ← Backend (chama Gemini)
│
├── lib/
│   └── prompts.ts              ← Prompts das 4 variações
│
├── package.json                ← Dependências
├── .env.example                ← Exemplo de variáveis de ambiente
└── .gitignore                  ← Arquivos ignorados pelo Git
```

---

## ⚡ Quick Start (Se Tiver Pressa)

**5 comandos, 15 minutos:**

```bash
# 1. Instalar
npm install

# 2. Criar .env.local e adicionar GEMINI_API_KEY
cp .env.example .env.local
# (Editar manualmente)

# 3. Rodar
npm run dev

# 4. Testar
# Abrir http://localhost:3000 e fazer upload de foto

# 5. Deploy
# Seguir DEPLOY-VERCEL.md
```

---

## 🎯 Cronograma Sugerido (7 dias)

### **Dia 1 (hoje):**
- ✅ Ler README
- ✅ Setup local
- ✅ Testar funcionamento básico

### **Dia 2:**
- Deploy no Vercel
- Obter API Key do Gemini
- Testar em produção

### **Dia 3:**
- Gerar QR Code
- Tirar prints do processo
- Começar apresentação

### **Dia 4-5:**
- Testes com amigos/colegas
- Refinar apresentação
- Preparar slides

### **Dia 6:**
- Teste no local (se possível)
- Checklist completo
- Backup de tudo

### **Dia 7 (evento):**
- Teste final 30 min antes
- Apresentação
- 🎉

---

## 💰 Custos (Resumo)

| Item | Custo |
|------|-------|
| Next.js | R$ 0 (open source) |
| Vercel (hosting) | R$ 0 (free tier) |
| Gemini API | R$ 0 (tier free) |
| Domínio | Você já tem |
| **TOTAL** | **R$ 0** |

**Se quiser upgrade:**
- DALL-E 3: ~$4-10 (só se quiser imagens reais)
- Vercel Pro: $20/mês (só se >100 pessoas simultâneas)

---

## 🆘 Ajuda Rápida

### "Não sei programar direito"
→ Tudo bem! Siga o README passo a passo. Cada comando está explicado.

### "Deu erro ao rodar"
→ Verifique:
1. Node.js instalado? (`node -v`)
2. Na pasta certa? (`cd caricatura-app`)
3. Instalou dependências? (`npm install`)
4. Criou .env.local? (com GEMINI_API_KEY)

### "Como obter API Key do Gemini?"
→ Acesse: https://makersuite.google.com/app/apikey
→ Faça login → "Create API Key" → Copie

### "Site não funciona no celular"
→ Certifique-se que:
1. Celular está na mesma rede WiFi
2. Use IP local (não localhost)
3. Ou já fez deploy (use URL do Vercel)

### "Preciso de DALL-E 3?"
→ Não, é opcional. Gemini funciona, mas só retorna descrição (não imagem).
→ Se quiser imagens reais, use DALL-E 3 (veja código comentado em `route.ts`).

---

## 🎯 O Que Cada Arquivo Faz

### **Código da Aplicação:**

**`app/page.tsx`** (mais importante)
→ Interface do usuário (upload, botões, resultado)

**`app/api/generate/route.ts`**
→ Backend que chama o Gemini

**`lib/prompts.ts`**
→ Prompts das 4 variações (simplificar, acelerar, decidir, conectar)

**`app/globals.css`**
→ Estilos (cores, botões, cards)

### **Documentação:**

**`README.md`**
→ Guia completo do projeto

**`DEPLOY-VERCEL.md`**
→ Como fazer deploy (passo a passo detalhado)

**`PRINTS-APRESENTACAO.md`**
→ Quais prints tirar e como usar no PPT

**`CHECKLIST-TESTES.md`**
→ O que testar antes do evento

---

## 🚀 Mensagem Final

**Você tem tudo que precisa.**

Este projeto foi criado para ser:
- ✅ **Simples** de entender
- ✅ **Rápido** de configurar
- ✅ **Gratuito** de rodar
- ✅ **Impactante** de apresentar

**Próximo passo:** Abra o `README.md` e siga os passos.

**Dúvida?** Todos os guias têm seção de troubleshooting.

**Boa sorte na apresentação!** 🎯✨

---

**P.S.:** Lembre-se da mensagem central:

> "Se criamos isso em 30 minutos com IA, imagine o que você pode fazer no dia a dia."

**Não é sobre o código. É sobre destravar o uso de IA.** 🚀
