Explicação da estrutura de pastas para backend e frontend no padrão Clean Architecture:

---

**Backend**

```
backend/
  src/
    domain/
      entities/       # Entidades do domínio (regras de negócio centrais)
      repositories/   # Interfaces para acesso a dados (contratos)
      use-cases/      # Casos de uso que implementam regras e orquestram entidades
    application/
      services/       # Serviços da aplicação (ex: envio de e-mails)
      dtos/           # Data Transfer Objects - formato dos dados de entrada/saída
    infrastructure/
      db/             # Implementação concreta de acesso a dados (ex: ORM)
      routes/         # Definição das rotas HTTP
      controllers/    # Controladores que recebem requisições e chamam casos de uso
    index.ts          # Ponto de entrada da aplicação (servidor, middlewares, rotas)
```

---

**Frontend**

```
frontend/
  src/
    components/      # Componentes React reutilizáveis (botões, cards, inputs)
    hooks/           # Custom hooks para lógica reutilizável de estado e efeitos
    pages/           # Páginas Next.js que viram rotas da aplicação
    services/        # Comunicação com APIs e manipulação de dados
    store/           # Estado global (Redux, Context API, Zustand, etc)
    styles/          # Arquivos de estilos (CSS, SCSS, styled-components)
```
