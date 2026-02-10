# 🏗️ Arquitetura do Sistema

## 📐 Visão Geral

```
┌─────────────────────────────────────────────────────────────┐
│                        USUÁRIO                               │
│                    (Celular/Desktop)                         │
└────────────────────────┬────────────────────────────────────┘
                         │
                         │ 1. Escaneia QR Code
                         │ 2. Abre no navegador
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                   FRONTEND (Next.js)                         │
│                 https://seu-app.vercel.app                   │
├─────────────────────────────────────────────────────────────┤
│  Componentes:                                                │
│  • Upload de Foto                                            │
│  • 4 Botões de Opção                                         │
│  • Loading State                                             │
│  • Exibição do Resultado                                     │
└────────────────────────┬────────────────────────────────────┘
                         │
                         │ 3. POST /api/generate
                         │    { imageBase64, option }
                         ▼
┌─────────────────────────────────────────────────────────────┐
│              BACKEND (Next.js API Route)                     │
│                    /api/generate/route.ts                    │
├─────────────────────────────────────────────────────────────┤
│  1. Recebe foto (base64) + opção (1-4)                      │
│  2. Valida entrada                                           │
│  3. Monta prompt baseado na opção                            │
│  4. Chama Gemini API                                         │
│  5. Retorna resultado                                        │
└────────────────────────┬────────────────────────────────────┘
                         │
                         │ 4. Chamada API
                         │    { prompt, image }
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                  GEMINI API (Google)                         │
│                  generativeai.google.com                     │
├─────────────────────────────────────────────────────────────┤
│  • Analisa a foto                                            │
│  • Gera descrição da caricatura                              │
│  • (Ou gera imagem, se disponível)                           │
└────────────────────────┬────────────────────────────────────┘
                         │
                         │ 5. Retorna resultado
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                    USUÁRIO                                   │
│              (Vê a caricatura gerada)                        │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔄 Fluxo de Dados Detalhado

### **1. Upload da Foto**

```javascript
// app/page.tsx
const handleImageUpload = (e) => {
  const file = e.target.files[0];
  // Converte pra base64
  reader.readAsDataURL(file);
  // Salva no state
  setSelectedImage(base64String);
  // Avança pro próximo step
  setStep('options');
}
```

**Formato dos dados:**
```
File (JPEG/PNG) → Base64 String
"data:image/jpeg;base64,/9j/4AAQSkZJRg..."
```

---

### **2. Seleção da Opção**

```javascript
// app/page.tsx
const handleOptionSelect = (optionId) => {
  // 1, 2, 3, ou 4
  setSelectedOption(optionId);
}
```

**Mapeamento:**
- 1 → Simplificar processos
- 2 → Acelerar entregas
- 3 → Tomar melhores decisões
- 4 → Conectar pessoas

---

### **3. Geração da Caricatura**

```javascript
// app/page.tsx
const handleGenerate = async () => {
  const response = await fetch('/api/generate', {
    method: 'POST',
    body: JSON.stringify({
      imageBase64: selectedImage,  // String base64
      option: selectedOption        // Número 1-4
    })
  });

  const data = await response.json();
  // { success, description, imageUrl? }
}
```

---

### **4. Processamento no Backend**

```javascript
// app/api/generate/route.ts
export async function POST(req) {
  // 1. Extrair dados
  const { imageBase64, option } = await req.json();

  // 2. Validar
  if (!imageBase64 || !option) return error;

  // 3. Pegar prompt específico
  const prompt = getPrompt(option); // lib/prompts.ts

  // 4. Chamar Gemini
  const model = genAI.getGenerativeModel({
    model: 'gemini-2.0-flash-exp'
  });

  const result = await model.generateContent([
    { inlineData: { data: base64Data } },
    prompt
  ]);

  // 5. Retornar resultado
  return NextResponse.json({
    success: true,
    description: result.text()
  });
}
```

---

### **5. Exibição do Resultado**

```javascript
// app/page.tsx
setResult(data);
setStep('result');

// Renderiza:
// - Descrição da caricatura (ou imagem)
// - Botão "Criar outra"
// - Botão "Baixar" (se tiver imagem)
```

---

## 🧩 Componentes do Sistema

### **Frontend (React/Next.js)**

**Estrutura de States:**
```typescript
step: 'upload' | 'options' | 'processing' | 'result'
selectedImage: string | null  // Base64
selectedOption: number | null // 1-4
result: { success, description, imageUrl? } | null
error: string | null
```

**Componentes principais:**
1. `<ImageUpload>` - Input de foto
2. `<OptionButtons>` - 4 botões de escolha
3. `<LoadingSpinner>` - Feedback durante geração
4. `<ResultDisplay>` - Exibe caricatura gerada

---

### **Backend (API Route)**

**Input:**
```json
{
  "imageBase64": "data:image/jpeg;base64,...",
  "option": 2
}
```

**Output (sucesso):**
```json
{
  "success": true,
  "description": "Caricatura mostrando...",
  "message": "Caricatura gerada com sucesso!",
  "imageUrl": "https://..." (opcional)
}
```

**Output (erro):**
```json
{
  "error": "Descrição do erro"
}
```

---

### **Prompts (lib/prompts.ts)**

**Estrutura:**
```typescript
getPrompt(option: number): string

// Retorna:
// Base prompt (estilo, composição, instruções gerais)
// + Prompt específico da opção (foco, símbolos, cores)
```

**Exemplo:**
```
Option 1: Simplificar processos
→ Símbolos: tesoura, fluxo simplificado
→ Cores: Azuis e cinzas com verde menta
→ Balões: "Menos é mais", "Clareza gera agilidade"
```

---

## 🌐 Infraestrutura

### **Vercel (Hosting)**

```
┌─────────────────────────────────────┐
│         Vercel Platform             │
├─────────────────────────────────────┤
│  • CDN Global (Edge Network)        │
│  • Serverless Functions             │
│  • Auto-scaling                     │
│  • SSL/HTTPS automático             │
│  • Deploy via Git push              │
└─────────────────────────────────────┘
```

**Regiões:**
- Edge: São Paulo, Washington, London, Tokyo, etc.
- Functions: us-east-1 (padrão)

**Limites (Free Tier):**
- Bandwidth: 100 GB/mês
- Function Execution: Ilimitado
- Function Timeout: 10s (suficiente pra Gemini)

---

### **Gemini API (Google)**

```
┌─────────────────────────────────────┐
│        Google AI Studio             │
├─────────────────────────────────────┤
│  Model: gemini-2.0-flash-exp        │
│  • Multimodal (texto + imagem)      │
│  • Fast (~5-10s de resposta)        │
│  • Tier gratuito: 60 req/min        │
└─────────────────────────────────────┘
```

**Rate Limits:**
- Requests: 60 por minuto
- Tokens: 1M por dia (mais que suficiente)

---

## 📊 Performance

### **Métricas Esperadas:**

| Etapa | Tempo | Observações |
|-------|-------|-------------|
| Carregar página | <2s | Cache após primeira vez |
| Upload foto | <1s | Depende do tamanho (max 4MB) |
| Selecionar opção | Instantâneo | Local state |
| Gerar caricatura | 10-30s | Depende do Gemini API |
| Exibir resultado | <1s | Já está na memória |
| **Total** | **15-35s** | Objetivo: <1 minuto |

---

## 🔐 Segurança

### **Dados do Usuário:**

**Foto enviada:**
- ✅ Não é salva no servidor
- ✅ Processada em memória
- ✅ Enviada pro Gemini via API (temporário)
- ✅ Não fica em banco de dados

**API Key:**
- ✅ Armazenada em variável de ambiente (server-side)
- ✅ Nunca exposta pro frontend
- ✅ Não vai pro Git (.gitignore)

**HTTPS:**
- ✅ Vercel fornece SSL automático
- ✅ Todas as requisições são criptografadas

---

## 🛠️ Tecnologias Usadas

### **Frontend:**
- **Next.js 14** (App Router)
- **React 18** (Server + Client Components)
- **Tailwind CSS** (Estilização)
- **TypeScript** (Type safety)

### **Backend:**
- **Next.js API Routes** (Serverless functions)
- **@google/generative-ai** (SDK do Gemini)

### **Infraestrutura:**
- **Vercel** (Hosting + CDN + Serverless)
- **GitHub** (Versionamento)
- **Namecheap** (Domínio - opcional)

---

## 🔄 Possíveis Extensões Futuras

### **1. Adicionar DALL-E 3**
```
Backend chama:
1. Gemini (analisa foto)
2. DALL-E 3 (gera imagem)
3. Retorna imagem real
```

### **2. Salvar Caricaturas**
```
Adicionar banco de dados:
• Supabase (free tier)
• Salva: foto + opção + resultado + timestamp
• Permite galeria de caricaturas
```

### **3. Compartilhamento Social**
```
Botões de share:
• WhatsApp
• LinkedIn
• Email
• Download PNG
```

### **4. Analytics**
```
Adicionar Google Analytics:
• Quantas pessoas usaram
• Qual opção foi mais escolhida
• Tempo médio de geração
```

---

## 📈 Escalabilidade

### **Atualmente suporta:**
- ✅ 20-100 pessoas simultâneas (limitado pelo Gemini: 60 req/min)
- ✅ Milhares de acessos por dia
- ✅ Global (CDN em múltiplas regiões)

### **Para escalar além:**

**Opção 1: Rate Limiting no Frontend**
```javascript
// Adicionar fila de requisições
// Processa 50 por minuto
// Feedback: "Você está na posição X da fila"
```

**Opção 2: Múltiplas API Keys**
```javascript
// Rotaciona entre 3-5 API keys
// Cada uma: 60 req/min
// Total: 180-300 req/min
```

**Opção 3: Migrar pra DALL-E 3**
```javascript
// Menos restritivo
// Mais caro (~$0.04/imagem)
// Mas sem rate limit tão agressivo
```

---

## 🎯 Diagrama de Decisão

```
Usuário envia foto
    ↓
Valida (tamanho OK?)
    ├─ Não → Erro: "Foto muito grande"
    └─ Sim → Salva no state
              ↓
         Mostra opções
              ↓
    Usuário escolhe (1-4)
              ↓
         Gera caricatura
              ↓
    Chama Gemini API
              ↓
    Rate limit OK?
    ├─ Não → Erro: "Tente novamente"
    └─ Sim → Processa
              ↓
         Retorna resultado
              ↓
    Tem imagem?
    ├─ Sim → Exibe imagem
    └─ Não → Exibe descrição
              ↓
         Botão "Criar outra"
              ↓
         Reset (volta ao início)
```

---

## 📝 Resumo Técnico

**Arquitetura:** Jamstack (Frontend estático + Backend serverless)

**Hosting:** Vercel (Edge network + Serverless functions)

**IA:** Gemini API (Multimodal AI da Google)

**Custo:** R$ 0 (100% free tier)

**Performance:** <30s por geração

**Escalabilidade:** 20-100 usuários simultâneos (sem mudanças)

**Segurança:** HTTPS, variáveis de ambiente, sem armazenamento

---

**Pronto! Você entende a arquitetura completa do sistema.** 🏗️✨
