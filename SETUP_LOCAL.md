# 🚀 Guia de Configuração Local - Menux Backoffice

Este guia vai te ajudar a rodar o projeto Menux Backoffice localmente.

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** (versão 18 ou superior) - [Download](https://nodejs.org/)
- **Python** (versão 3.9 ou superior) - [Download](https://www.python.org/)
- **PostgreSQL** (opcional, pode usar SQLite para desenvolvimento) - [Download](https://www.postgresql.org/)

## 🔧 Configuração Passo a Passo

### 1️⃣ Configurar o Frontend

```bash
# Instalar dependências do frontend
npm install

# Iniciar o servidor de desenvolvimento
npm run dev
```

O frontend estará disponível em: **http://localhost:5173**

---

### 2️⃣ Configurar o Backend

#### Criar ambiente virtual Python

```bash
# Navegar para a pasta backend
cd backend

# Criar ambiente virtual
python3 -m venv venv

# Ativar ambiente virtual
# No macOS/Linux:
source venv/bin/activate
# No Windows:
# venv\Scripts\activate

# Instalar dependências
pip install -r requirements.txt
```

#### Configurar variáveis de ambiente

Crie um arquivo `.env` na **raiz do projeto** (não dentro da pasta backend):

```bash
# Voltar para a raiz do projeto
cd ..

# Criar arquivo .env
touch .env
```

Adicione o seguinte conteúdo ao arquivo `.env`:

```env
# Ambiente
ENVIRONMENT=development

# Banco de dados (SQLite para desenvolvimento local)
DATABASE_URL=sqlite:///./menux.db

# Segurança
SECRET_KEY=dev-local-secret-key-change-in-production

# CORS (permitir frontend local)
CORS_ORIGINS=http://localhost:5173,http://localhost:3000
```

> **Nota**: Para usar PostgreSQL em vez de SQLite, altere a `DATABASE_URL` para:
> ```
> DATABASE_URL=postgresql://usuario:senha@localhost:5432/menux_db
> ```

#### Inicializar o banco de dados

```bash
# Voltar para a pasta backend (se necessário)
cd backend

# Criar as tabelas do banco de dados
python setup_db.py

# (Opcional) Popular o banco com dados de demonstração
python seed_demo_database.py
```

#### Iniciar o servidor backend

```bash
# Certifique-se de estar na pasta backend com o ambiente virtual ativado
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

O backend estará disponível em: **http://localhost:8000**

Documentação da API: **http://localhost:8000/api/docs**

---

### 3️⃣ Verificar se está funcionando

1. **Frontend**: Abra http://localhost:5173 no navegador
2. **Backend**: Abra http://localhost:8000/health no navegador
3. **API Docs**: Abra http://localhost:8000/api/docs para ver a documentação interativa

---

## 🎯 Comandos Úteis

### Frontend
```bash
npm run dev          # Iniciar servidor de desenvolvimento
npm run build        # Build para produção
npm run preview      # Preview do build de produção
npm run lint         # Verificar código
```

### Backend
```bash
# Dentro da pasta backend, com venv ativado:
uvicorn main:app --reload                    # Servidor com hot-reload
python seed_demo_database.py                 # Popular banco com dados demo
python create_admin.py                       # Criar usuário admin
python check_user.py                         # Verificar usuários existentes
```

---

## 🔑 Credenciais Padrão

Após executar o seed do banco de dados, você pode fazer login com:

- **Email**: `admin@admin.com`
- **Senha**: `admin`

> **Nota MVP**: As senhas são armazenadas em texto simples para facilitar o desenvolvimento. Isso é apenas para MVP e não deve ser usado em produção.

---

## 🐛 Solução de Problemas

### Erro: "Module not found"
```bash
# Reinstalar dependências do frontend
rm -rf node_modules package-lock.json
npm install
```

### Erro: "No module named 'fastapi'"
```bash
# Certifique-se de que o ambiente virtual está ativado
source backend/venv/bin/activate  # macOS/Linux
# Reinstalar dependências
pip install -r backend/requirements.txt
```

### Erro de CORS
Verifique se o arquivo `.env` está na raiz do projeto e contém:
```env
CORS_ORIGINS=http://localhost:5173,http://localhost:3000
```

### Banco de dados não inicializa
```bash
# Deletar banco antigo e recriar
rm menux.db
cd backend
python setup_db.py
python seed_demo_database.py
```

---

## 📁 Estrutura do Projeto

```
backoffice-menux/
├── src/                    # Código fonte do frontend (React)
├── backend/                # Código fonte do backend (FastAPI)
│   ├── app/               # Aplicação FastAPI
│   ├── main.py            # Ponto de entrada do backend
│   └── requirements.txt   # Dependências Python
├── database/              # Scripts SQL
├── public/                # Arquivos públicos
├── package.json           # Dependências Node.js
└── .env                   # Variáveis de ambiente (criar)
```

---

## 🚀 Próximos Passos

1. ✅ Instalar dependências do frontend
2. ✅ Instalar dependências do backend
3. ✅ Criar arquivo `.env`
4. ✅ Inicializar banco de dados
5. ✅ Iniciar backend
6. ✅ Iniciar frontend
7. ✅ Fazer login e explorar!

---

## 📞 Suporte

Se encontrar algum problema, verifique:
- Logs do terminal do frontend
- Logs do terminal do backend
- Console do navegador (F12)

Boa sorte! 🎉
