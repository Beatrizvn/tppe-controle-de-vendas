# TPPE - Controle de Vendas


## 📄 Documentação

1. [UML](docs/UML%20-%20DIAGRAMA%20DE%20CLASSES.png)
2. [História de Usuário](docs/HistoriaDeUsuario.md)

---

Este é um projeto fullstack usando:

- 🔙 **Backend**: Node.js + Express + TypeScript
- 🐘 **Banco de Dados**: PostgreSQL (via Docker)
- 🌐 **Frontend**: Next.js + React + TypeScript
- 🧪 **Testes**: Jest + Supertest

---

## 📦 Pré-requisitos

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- [Docker + Docker Compose](https://docs.docker.com/compose/)

---

## ⚙️ Como rodar

### 🐳 Backend + Banco de Dados

```bash
docker compose up --build
```

O backend roda em `http://localhost:3001`

Banco estará disponível em `localhost:5432`

### Rodar testes:

```bash
docker compose run backend npm run test

```

---

### 3. Frontend (Next.js)

```bash
cd frontend
npm install
npm run dev
```

O frontend roda em `http://localhost:3000`

---

## 💡 Conexão externa (DBeaver, etc.)

Use estas credenciais para conectar ao PostgreSQL:

- Host: `localhost`
- Porta: `5432`
- Usuário: `postgres`
- Senha: `postgres`
- Banco: `tppe`
