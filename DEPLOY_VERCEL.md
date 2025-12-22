# 🚀 Deploy no Vercel - Guia Rápido

Este guia mostra como fazer deploy do Menux Backoffice no Vercel **sem precisar de backend**.

## ✅ Pré-requisitos

- Conta no GitHub
- Conta no Vercel (grátis)
- Código commitado no Git

---

## 📦 Passo a Passo

### 1️⃣ Preparar o Projeto

Certifique-se que o arquivo `.env.production` existe e contém:

```env
VITE_USE_MOCK_AUTH=true
VITE_API_URL=https://sua-api.com
```

> ✅ Já está configurado! Não precisa fazer nada.

---

### 2️⃣ Commit e Push para o GitHub

```bash
# Adicionar todos os arquivos
git add .

# Fazer commit
git commit -m "Deploy: Menux Backoffice com autenticação mock"

# Push para o GitHub
git push origin main
```

> **Nota**: Se ainda não tem repositório no GitHub, crie um primeiro:
> ```bash
> git init
> git add .
> git commit -m "Initial commit"
> git branch -M main
> git remote add origin https://github.com/seu-usuario/seu-repo.git
> git push -u origin main
> ```

---

### 3️⃣ Deploy no Vercel

#### Opção A: Via Dashboard (Mais Fácil)

1. Acesse [vercel.com](https://vercel.com)
2. Clique em **"Add New Project"**
3. Conecte sua conta do GitHub
4. Selecione o repositório do projeto
5. Configure:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
6. Clique em **"Deploy"**
7. Aguarde 1-2 minutos ⏱️
8. Pronto! 🎉

#### Opção B: Via CLI

```bash
# Instalar Vercel CLI
npm i -g vercel

# Fazer login
vercel login

# Deploy
vercel

# Deploy para produção
vercel --prod
```

---

### 4️⃣ Configurar Variáveis de Ambiente (Opcional)

Se quiser garantir que está usando mock:

1. No dashboard do Vercel, vá em **Settings** → **Environment Variables**
2. Adicione:
   - **Name**: `VITE_USE_MOCK_AUTH`
   - **Value**: `true`
   - **Environment**: Production
3. Clique em **Save**
4. Faça um novo deploy (ou aguarde o próximo commit)

---

## 🔑 Credenciais de Acesso

Após o deploy, qualquer pessoa pode acessar com:

```
Email: admin@admin.com
Senha: admin
```

> ⚠️ **Importante**: Isso é apenas para demonstração/MVP. Não use em produção real.

---

## 🎯 Verificar se Funcionou

1. Acesse a URL do Vercel (ex: `https://seu-projeto.vercel.app`)
2. Você verá a tela de login com o banner amarelo:
   ```
   🔓 Modo Demo (sem backend)
   Use: admin@admin.com / admin
   ```
3. Faça login
4. Você será redirecionado para o dashboard

---

## 🔄 Atualizações Futuras

Sempre que você fizer um commit no GitHub:

```bash
git add .
git commit -m "Sua mensagem"
git push
```

O Vercel automaticamente:
1. Detecta o push
2. Faz build do projeto
3. Faz deploy da nova versão
4. Atualiza a URL

---

## 🛠️ Troubleshooting

### Build Falhou

**Erro**: `Module not found` ou similar

**Solução**:
```bash
# Limpar e reinstalar dependências
rm -rf node_modules package-lock.json
npm install
git add .
git commit -m "Fix: reinstall dependencies"
git push
```

### Login Não Funciona

**Problema**: Não aparece o banner amarelo

**Solução**: Verifique se `.env.production` tem `VITE_USE_MOCK_AUTH=true`

### Página em Branco

**Problema**: Deploy funcionou mas página fica em branco

**Solução**: 
1. Abra o console do navegador (F12)
2. Verifique erros
3. Geralmente é problema de rota - adicione `vercel.json`:

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

> ✅ Já existe no projeto!

---

## 📊 Monitoramento

No dashboard do Vercel você pode ver:
- ✅ Status do deploy
- 📈 Analytics de acesso
- 🐛 Logs de erro
- ⚡ Performance

---

## 🎨 Customização

### Mudar URL

No Vercel dashboard:
1. **Settings** → **Domains**
2. Adicione seu domínio customizado
3. Configure DNS conforme instruções

### Adicionar Senha de Acesso

Se quiser proteger a aplicação:
1. **Settings** → **General**
2. **Password Protection** → Enable
3. Defina uma senha

---

## 🔐 Segurança

### ⚠️ Lembre-se

- ✅ Modo mock é **apenas para demonstração**
- ✅ Qualquer pessoa pode fazer login com `admin@admin.com` / `admin`
- ✅ Não há dados reais no sistema
- ❌ **Não use para produção real**

### 🚀 Para Produção Real

Quando quiser usar em produção:

1. Configure backend (Render, Railway, etc.)
2. Altere `.env.production`:
   ```env
   VITE_USE_MOCK_AUTH=false
   VITE_API_URL=https://sua-api-real.com
   ```
3. Configure banco de dados PostgreSQL
4. Faça novo deploy

---

## 📞 Suporte

Se tiver problemas:

1. Verifique logs no Vercel dashboard
2. Teste localmente com `npm run build && npm run preview`
3. Verifique se `.env.production` está correto

---

## ✨ Pronto!

Seu projeto está no ar! 🎉

**URL de exemplo**: `https://menux-backoffice.vercel.app`

Compartilhe com quem quiser - todos podem acessar com as credenciais mock!

---

**Documentação Adicional**:
- [MOCK_AUTH.md](./MOCK_AUTH.md) - Detalhes do sistema de autenticação
- [SETUP_LOCAL.md](./SETUP_LOCAL.md) - Como rodar localmente
