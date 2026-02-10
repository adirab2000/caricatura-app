# ✅ Checklist de Testes Pré-Evento

## 🎯 Objetivo

Garantir que tudo funcione perfeitamente no dia da apresentação.
**Tempo estimado de testes:** 30-60 minutos

---

## 📅 Quando Fazer os Testes

- **7 dias antes:** Testes iniciais (funcionalidade)
- **3 dias antes:** Testes de carga (simular 20-100 pessoas)
- **1 dia antes:** Teste final no local (com projetor/WiFi real)
- **30 min antes do evento:** Teste rápido de sanidade

---

## 🧪 FASE 1: Testes Locais (Antes do Deploy)

### ✅ Instalação e Setup

- [ ] `npm install` rodou sem erros
- [ ] `.env.local` criado com `GEMINI_API_KEY`
- [ ] `npm run dev` inicia sem erros
- [ ] Abre no navegador: http://localhost:3000
- [ ] Página carrega sem erros no console (F12)

### ✅ Funcionalidade - Upload de Foto

- [ ] Botão "Escolher foto" abre seletor de arquivos
- [ ] Aceita foto do celular (JPEG/PNG)
- [ ] Aceita foto da webcam
- [ ] Preview da foto aparece corretamente
- [ ] Fotos grandes (>5MB) funcionam ou dão erro claro
- [ ] Fotos pequenas (<100KB) funcionam
- [ ] Orientação da foto está correta (não fica de lado)

### ✅ Funcionalidade - Opções

- [ ] 4 botões aparecem após upload
- [ ] Pode selecionar qualquer opção
- [ ] Botão selecionado muda de visual (highlight)
- [ ] Pode mudar de opção antes de gerar
- [ ] Botão "Trocar foto" volta pro início
- [ ] Botão "Gerar caricatura" fica desabilitado até selecionar opção

### ✅ Funcionalidade - Geração

- [ ] Loading aparece ao gerar ("Criando sua caricatura...")
- [ ] Chamada pra API não trava o navegador
- [ ] Resultado aparece após 10-30 segundos
- [ ] Descrição da caricatura é exibida (ou imagem, se DALL-E)
- [ ] Botão "Criar outra" funciona (reset completo)
- [ ] Não há vazamento de memória (pode gerar 5x seguidas)

### ✅ Responsividade

- [ ] Funciona em celular (iPhone/Android)
- [ ] Funciona em tablet
- [ ] Funciona em desktop
- [ ] Layout não quebra em nenhuma tela
- [ ] Botões são grandes o suficiente pra tocar com dedo
- [ ] Texto é legível em todas as telas

---

## 🌐 FASE 2: Testes no Vercel (Após Deploy)

### ✅ Deploy e Configuração

- [ ] Deploy completou sem erros
- [ ] Site abre na URL do Vercel
- [ ] HTTPS está funcionando (cadeado verde)
- [ ] `GEMINI_API_KEY` está configurada no Vercel
- [ ] Sem erros no console do Vercel (Deployments → Build Logs)

### ✅ Funcionalidade em Produção

- [ ] Upload funciona na URL pública
- [ ] Geração de caricatura funciona
- [ ] Resultado aparece corretamente
- [ ] Tempos de resposta são aceitáveis (<30s)
- [ ] Não há erros 500/404
- [ ] Error handling está funcionando (testa com API key errada pra ver)

### ✅ Performance

- [ ] Site carrega em <3 segundos (primeira vez)
- [ ] Site carrega em <1 segundo (segunda vez - cache)
- [ ] Imagens são otimizadas (Next.js faz isso automaticamente)
- [ ] Não há warnings no Lighthouse (F12 → Lighthouse → Mobile)

---

## 📱 FASE 3: Testes no Celular Real

### ✅ QR Code

- [ ] QR Code foi gerado
- [ ] QR Code aponta pra URL correta
- [ ] Celular consegue escanear o QR Code
- [ ] Abre diretamente no navegador (não pede app)
- [ ] QR Code funciona com câmera nativa do iOS
- [ ] QR Code funciona com câmera nativa do Android

### ✅ Experiência Mobile

Teste com **pelo menos 3 celulares diferentes:**

- [ ] iPhone (Safari)
- [ ] Android (Chrome)
- [ ] Android antigo ou iOS antigo (se público tiver)

**Checklist por celular:**

- [ ] Site carrega corretamente
- [ ] Upload da câmera funciona
- [ ] Upload da galeria funciona
- [ ] Todos os botões são clicáveis
- [ ] Texto é legível sem zoom
- [ ] Layout não quebra
- [ ] Resultado final aparece
- [ ] Pode criar múltiplas caricaturas seguidas

### ✅ Conectividade

Teste em diferentes condições:

- [ ] WiFi rápido (100+ Mbps)
- [ ] WiFi lento (5-10 Mbps)
- [ ] 4G
- [ ] 3G (se público tiver conexão ruim)

**Tempos aceitáveis:**
- Upload da foto: <5s
- Geração: <30s
- Total: <1 minuto

---

## 👥 FASE 4: Teste de Carga (Simular Evento Real)

### ✅ Teste com 5 Pessoas Simultâneas

**Como fazer:**
1. Peça ajuda de 5 amigos/colegas
2. Todos acessam ao mesmo tempo
3. Todos fazem upload e geram caricatura

**Checklist:**
- [ ] Todos conseguem acessar
- [ ] Ninguém tem erro de timeout
- [ ] Tempo de geração não aumenta muito
- [ ] Não há rate limit do Gemini (60 req/min)
- [ ] Server não cai

### ✅ Teste com 10-20 Pessoas Simultâneas

**Como fazer:**
1. Crie um grupo no WhatsApp com 10-20 pessoas
2. Envie o link
3. Peça pra todos acessarem ao mesmo tempo (ex: 14h00 em ponto)

**Checklist:**
- [ ] Todos conseguem acessar
- [ ] Maioria consegue gerar caricatura (<30s)
- [ ] Se alguém tiver erro, tem retry ou mensagem clara
- [ ] Vercel não dá erro de "Function Timeout"

### ✅ Se Passar de 60 Requisições/Minuto (Rate Limit)

**Sinais:**
- Erro: "429 Too Many Requests"
- Algumas pessoas não conseguem gerar

**Soluções:**
- Dividir em grupos (ex: "mesa 1 primeiro, depois mesa 2")
- Adicionar retry automático no código
- Migrar pra DALL-E 3 (menos restritivo)

---

## 🏢 FASE 5: Teste no Local do Evento (1 dia antes)

### ✅ Infraestrutura do Local

- [ ] WiFi do local funciona
- [ ] WiFi é rápido o suficiente (teste speed test)
- [ ] Projetor/telão está funcionando
- [ ] Laptop conecta no projetor sem problemas
- [ ] QR Code é legível quando projetado
  - Teste escanear do fundo da sala
  - Se não funcionar, aumente o tamanho no slide

### ✅ Apresentação

- [ ] Slides estão no laptop
- [ ] Prints estão em boa qualidade
- [ ] Slide do QR Code está pronto
- [ ] Testei projetar o QR Code e escanear
- [ ] Anotações/roteiro estão prontas

### ✅ Plano B

- [ ] Se WiFi cair: você tem 4G no celular pra hotspot?
- [ ] Se site cair: você tem prints do resultado pra mostrar?
- [ ] Se ninguém conseguir escanear: URL está escrita no slide?

---

## ⏱️ FASE 6: Teste Final (30 min antes do evento)

### ✅ Last Minute Check

- [ ] Site ainda está no ar (acessa a URL)
- [ ] Faz um teste completo (foto + opção + resultado)
- [ ] QR Code funciona (escaneia do seu celular)
- [ ] Slides estão abertos no laptop
- [ ] Laptop está carregado (ou conectado na tomada)
- [ ] Celular está carregado (pra emergências)
- [ ] Você tem a URL decorada ou anotada (pra ditar se precisar)

---

## 🚨 Troubleshooting - Problemas Comuns

### Problema: "Site não carrega"

**Possíveis causas:**
- [ ] WiFi do evento está ruim → Use 4G
- [ ] Vercel está fora do ar → Improvável, mas cheque status.vercel.com
- [ ] DNS não propagou → Use URL direta do Vercel (.vercel.app)

**Solução rápida:**
- Tenha a URL do Vercel (.vercel.app) como backup

---

### Problema: "QR Code não escaneia"

**Possíveis causas:**
- [ ] Projetor tem baixa resolução → Aumente o tamanho do QR no slide
- [ ] Iluminação da sala → Apague as luzes perto do telão
- [ ] QR Code está borrado → Gere novamente em maior resolução

**Solução rápida:**
- Coloque a URL por extenso no slide
- Ou compartilhe no chat/WhatsApp do grupo

---

### Problema: "Erro ao gerar caricatura"

**Possíveis causas:**
- [ ] API Key expirou → Gere nova no Google AI Studio
- [ ] Rate limit do Gemini → Aguarde 1 minuto e tente de novo
- [ ] Foto muito grande → Comprimir antes de enviar

**Solução rápida:**
- Adicione retry automático (código já preparado)
- Ou peça pra pessoa tirar nova foto (menor)

---

### Problema: "Muita gente ao mesmo tempo"

**Sinais:**
- Site lento pra todos
- Erros de timeout
- Algumas pessoas não conseguem

**Solução rápida:**
- Divida em grupos: "Mesas 1-5 agora, mesas 6-10 depois"
- Ou deixe as pessoas usarem durante o intervalo

---

## 📊 Métricas de Sucesso

### ✅ Mínimo Aceitável (MVP)

- [ ] 70% das pessoas conseguem gerar caricatura
- [ ] Tempo médio <2 minutos por pessoa
- [ ] Zero crashes do site
- [ ] Feedback geral positivo

### ✅ Ideal (Excelente)

- [ ] 90%+ das pessoas conseguem gerar
- [ ] Tempo médio <1 minuto
- [ ] Zero problemas técnicos
- [ ] Pessoas comentam: "Nossa, foi fácil!"

---

## 📝 Log de Testes (Preencha)

### Teste Local (Data: __/__/____)

```
✅ Funcionalidade básica
✅ Upload de fotos
✅ Geração de caricatura
⚠️ [Se houver problemas, anote aqui]
```

### Teste em Produção (Data: __/__/____)

```
✅ Deploy funcionando
✅ QR Code escaneável
✅ Teste com 5 pessoas
⚠️ [Se houver problemas, anote aqui]
```

### Teste no Local (Data: __/__/____)

```
✅ WiFi funcionando
✅ Projetor OK
✅ QR Code legível
⚠️ [Se houver problemas, anote aqui]
```

---

## 🎯 Checklist Final (Dia do Evento)

**30 minutos antes:**

- [ ] Site no ar
- [ ] QR Code funciona
- [ ] Slides prontos
- [ ] Laptop carregado
- [ ] Celular carregado
- [ ] Você testou 1x completo
- [ ] Você está calmo e preparado 😊

---

## 🚀 Plano de Contingência

Se tudo der errado:

**Plano B: Modo Apresentação Apenas**
- Mostre os prints do processo
- Demonstre no seu celular (projetar tela)
- Explique como funcionaria
- Compartilhe URL pro pessoal testar depois

**Mensagem:** "Tecnologia é assim, às vezes falha. Mas o importante é: isso existe, funciona, e vocês podem usar depois."

---

**Pronto! Seguindo esse checklist, você estará 99% preparado.** 🎯✅
