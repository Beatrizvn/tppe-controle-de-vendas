# TPPE - Controle de Vendas


## 📄 Documentação

1. [UML](docs/UML%20-%20DIAGRAMA%20DE%20CLASSES.png)
2. [História de Usuário](docs/HistoriaDeUsuario.md)

---

Este é um projeto fullstack usando:

- 🔙 **Backend**: Node.js + Express + TypeScript 
- 🐘 **Banco de Dados**: PostgreSQL
- 🌐 **Frontend**: Next.js + React + TypeScript
- 🧪 **Testes**: Jest + Supertest

---

## 📦 Pré-requisitos

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- [Docker + Docker Compose](https://docs.docker.com/compose/)

---

## ⚙️ Como rodar

### 🐳 Backend + Banco de Dados + Testes

```bash
docker compose up --build
```

O backend roda em `http://localhost:3001`

Banco estará disponível em `localhost:5432`

O Testes vão aparecer assim no console:

```bash
tppe_backend   | > jest
tppe_backend   | 
tppe_backend   | PASS tests/hello.test.ts (15.482 s)
tppe_backend   |   Basic test
tppe_backend   |     ✓ should pass (14 ms)
tppe_backend   | 
tppe_backend   | Test Suites: 1 passed, 1 total
tppe_backend   | Tests:       1 passed, 1 total
tppe_backend   | Snapshots:   0 total
tppe_backend   | Time:        19.072 s
tppe_backend   | Ran all test suites.
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
