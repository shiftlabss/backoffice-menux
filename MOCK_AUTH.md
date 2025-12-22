# 🔐 Sistema de Autenticação Mock

Este projeto possui um sistema de autenticação que pode funcionar em **dois modos**:

## 🎭 Modo Mock (Sem Backend)

Perfeito para:
- ✅ Deploy no Vercel sem precisar de backend
- ✅ Demonstrações e apresentações
- ✅ Desenvolvimento frontend sem depender do backend

### Como Ativar

No arquivo `.env.local` ou `.env.production`:

```env
VITE_USE_MOCK_AUTH=true
```

### Credenciais Mock

```
Email: admin@admin.com
Senha: admin
```

### Como Funciona

1. O login é validado apenas no frontend
2. Não faz chamadas para API
3. Armazena um token fake no localStorage
4. Simula um delay de rede (500ms)
5. Retorna um usuário mockado

---

## 🔌 Modo API Real (Com Backend)

Para usar com o backend FastAPI rodando:

### Como Ativar

No arquivo `.env.local`:

```env
VITE_USE_MOCK_AUTH=false
VITE_API_URL=http://localhost:8000
```

### Como Funciona

1. Faz chamada real para `/api/auth/login`
2. Recebe token JWT do backend
3. Valida credenciais no banco de dados
4. Armazena token real no localStorage

---

## 📦 Deploy no Vercel

### Opção 1: Deploy com Mock (Recomendado para MVP)

1. Certifique-se que `.env.production` tem:
   ```env
   VITE_USE_MOCK_AUTH=true
   ```

2. Faça commit e push:
   ```bash
   git add .
   git commit -m "Deploy com autenticação mock"
   git push
   ```

3. No Vercel:
   - Conecte seu repositório
   - Deploy automático! ✨
   - Qualquer pessoa pode acessar com `admin@admin.com` / `admin`

### Opção 2: Deploy com Backend Real

1. Configure `.env.production`:
   ```env
   VITE_USE_MOCK_AUTH=false
   VITE_API_URL=https://sua-api-backend.com
   ```

2. Faça deploy do backend em:
   - Render (grátis)
   - Railway (grátis)
   - Fly.io (grátis)

3. Configure a URL da API no `.env.production`

---

## 🔄 Alternando Entre Modos

### Desenvolvimento Local

**Com Backend:**
```bash
# .env.local
VITE_USE_MOCK_AUTH=false
VITE_API_URL=http://localhost:8000
```

**Sem Backend (Mock):**
```bash
# .env.local
VITE_USE_MOCK_AUTH=true
```

### Produção (Vercel)

Edite `.env.production` conforme necessário.

---

## 🎨 Indicador Visual

Quando em modo mock, a tela de login mostra um banner amarelo:

```
🔓 Modo Demo (sem backend)
Use: admin@admin.com / admin
```

---

## 📝 Código Relevante

### AuthContext.jsx

```javascript
const useMockAuth = import.meta.env.VITE_USE_MOCK_AUTH === 'true';

if (useMockAuth) {
    // Login mockado
    if (email === 'admin@admin.com' && password === 'admin') {
        // Retorna usuário fake
    }
} else {
    // Login real com API
    const response = await api.post('/auth/login', { email, password });
}
```

### Login.jsx

```javascript
{import.meta.env.VITE_USE_MOCK_AUTH === 'true' && (
    <div className="bg-amber-50">
        🔓 Modo Demo (sem backend)
    </div>
)}
```

---

## ⚠️ Importante

- ✅ **Backend permanece intacto** - Nada foi deletado
- ✅ **Fácil alternar** - Basta mudar variável de ambiente
- ✅ **Seguro para MVP** - Deixa claro que é modo demo
- ❌ **Não usar em produção real** - Apenas para demonstrações

---

## 🚀 Comandos Úteis

```bash
# Testar localmente com mock
npm run dev

# Build para produção (usa .env.production)
npm run build

# Preview do build de produção
npm run preview
```

---

## 🎯 Resumo

| Modo | Backend Necessário | Deploy | Credenciais |
|------|-------------------|--------|-------------|
| Mock | ❌ Não | ✅ Vercel | `admin@admin.com` / `admin` |
| API Real | ✅ Sim | 🔧 Vercel + Render/Railway | Do banco de dados |

---

Pronto! Agora você pode fazer deploy no Vercel sem se preocupar com backend! 🎉
