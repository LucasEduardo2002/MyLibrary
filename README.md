# MyLibrary API

API RESTful para gerenciamento de biblioteca pessoal, desenvolvida com NestJS, Prisma ORM e autenticação JWT.

## 📋 Descrição

MyLibrary é uma aplicação backend que permite aos usuários gerenciar sua biblioteca pessoal de livros. Cada usuário pode cadastrar, listar, atualizar e remover livros de sua coleção, com autenticação e autorização completas.

## 🚀 Tecnologias

- **[NestJS](https://nestjs.com/)** - Framework Node.js progressivo
- **[Prisma](https://www.prisma.io/)** - ORM moderno para Node.js e TypeScript  
- **[MySQL](https://www.mysql.com/)** - Banco de dados relacional
- **[JWT](https://jwt.io/)** - Autenticação via JSON Web Tokens
- **[bcrypt](https://www.npmjs.com/package/bcrypt)** - Criptografia de senhas
- **[Passport](http://www.passportjs.org/)** - Middleware de autenticação

## 📁 Estrutura do Projeto

```
mylibrary/
├── prisma/
│   ├── migrations/          # Migrations do banco de dados
│   └── schema.prisma        # Schema do Prisma
├── src/
│   ├── auth/               # Módulo de autenticação
│   │   ├── dto/           # Data Transfer Objects
│   │   ├── auth.controller.ts
│   │   ├── auth.service.ts
│   │   ├── auth.module.ts
│   │   └── jwt.strategy.ts
│   ├── books/             # Módulo de livros
│   │   ├── dto/
│   │   ├── books.controller.ts
│   │   ├── books.service.ts
│   │   └── books.module.ts
│   ├── users/             # Módulo de usuários
│   │   ├── dto/
│   │   ├── users.controller.ts
│   │   ├── users.service.ts
│   │   └── users.module.ts
│   ├── prisma/            # Módulo Prisma
│   │   ├── prisma.service.ts
│   │   └── prisma.module.ts
│   ├── app.module.ts      # Módulo raiz
│   └── main.ts            # Entry point
└── package.json
```

## 🔧 Instalação

### Pré-requisitos

- Node.js (v18 ou superior)
- MySQL (v8 ou superior)
- npm ou yarn

### Passos

1. **Clone o repositório**
```bash
git clone <url-do-repositorio>
cd mylibrary
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure as variáveis de ambiente**

Crie um arquivo `.env` na raiz do projeto:

```env
DATABASE_URL="mysql://usuario:senha@localhost:3306/mylibrary"
JWT_SECRET="sua_chave_secreta_jwt_aqui"
```

4. **Execute as migrations do banco de dados**
```bash
npx prisma migrate deploy
```

5. **Gere o Prisma Client**
```bash
npx prisma generate
```

## 🏃 Executando a Aplicação

### Modo Desenvolvimento
```bash
npm run start:dev
```

### Modo Produção
```bash
npm run build
npm run start:prod
```

A API estará disponível em `http://localhost:3000`

## 📡 Endpoints da API

### Autenticação

#### POST `/auth`
Realiza login e retorna token JWT

**Request Body:**
```json
{
  "email": "usuario@email.com",
  "password": "senha123"
}
```

**Response:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

### Usuários

#### POST `/users`
Cria um novo usuário

**Request Body:**
```json
{
  "name": "João Silva",
  "email": "joao@email.com",
  "password": "senha123"
}
```

#### GET `/users`
Lista todos os usuários

#### GET `/users/:id`
Busca um usuário específico

#### PATCH `/users/:id`
Atualiza dados de um usuário

#### DELETE `/users/:id`
Remove um usuário

---

### Livros
**🔒 Todas as rotas requerem autenticação JWT**

Para acessar as rotas de livros, inclua o token no header:
```
Authorization: Bearer seu_token_jwt_aqui
```

#### POST `/books`
Adiciona um livro à biblioteca

**Request Body:**
```json
{
  "name": "1984",
  "author": "George Orwell",
  "bookGenres": "Ficção, Distopia",
  "pages": 416
}
```

#### GET `/books/me`
Lista todos os livros do usuário autenticado

#### PATCH `/books/:id`
Atualiza informações de um livro

**Request Body:**
```json
{
  "name": "1984 - Edição Especial",
  "pages": 450
}
```

#### DELETE `/books/:id`
Remove um livro da biblioteca

---

## 🗄️ Modelo de Dados

### User
```prisma
model User {
  id        Int      @id @default(autoincrement())
  name      String
  email     String   @unique
  password  String
  book      Book[]
}
```

### Book
```prisma
model Book {
  id          Int      @id @default(autoincrement())
  name        String
  bookGenres  String?
  author      String?
  pages       Int?
  userId      Int
  user        User     @relation(fields: [userId], references: [id])
}
```

## 🔐 Autenticação e Segurança

- **Senhas**: Criptografadas com bcrypt (10 salt rounds)
- **Tokens JWT**: Validade de 7 dias
- **Autorização**: Cada usuário acessa apenas seus próprios livros
- **Validação**: Verificação de propriedade antes de modificar/deletar livros

## 🛠️ Scripts Disponíveis

```bash
npm run start          # Inicia a aplicação
npm run start:dev      # Modo desenvolvimento com watch
npm run start:prod     # Modo produção
npm run build          # Compila o projeto
npm run format         # Formata código com Prettier
npm run lint           # Executa ESLint
npm run test           # Executa testes
npm run test:cov       # Testes com cobertura
```

## 📝 Prisma Commands

```bash
npx prisma migrate dev        # Cria e aplica nova migration
npx prisma migrate deploy     # Aplica migrations em produção
npx prisma generate           # Gera Prisma Client
npx prisma studio             # Abre interface visual do banco
```

## 🐛 Tratamento de Erros

A API retorna respostas apropriadas para erros comuns:

- **400 Bad Request**: Dados inválidos ou faltando
- **401 Unauthorized**: Token JWT ausente ou inválido
- **403 Forbidden**: Tentativa de acessar recursos de outro usuário
- **404 Not Found**: Recurso não encontrado
- **409 Conflict**: Email já cadastrado

## 🚧 Melhorias Futuras

- [ ] Implementar refresh tokens
- [ ] Adicionar validação com class-validator
- [ ] Implementar rate limiting
- [ ] Adicionar testes unitários e e2e
- [ ] Documentação com Swagger/OpenAPI
- [ ] Paginação para listagem de livros
- [ ] Upload de capas de livros
- [ ] Sistema de categorias e tags

## 📄 Licença

Este projeto é privado e não possui licença pública.

## 👤 Autor

Desenvolvido como parte do projeto MyLibrary.

---

**Nota:** Certifique-se de configurar corretamente as variáveis de ambiente antes de executar a aplicação.
