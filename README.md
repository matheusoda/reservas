# Reservas

Este é um projeto fullstack que usa **React** no front-end, **Node.js** com **TypeScript** e **Prisma** no back-end, e utiliza **PostgreSQL** como banco de dados, tudo rodando em um ambiente Dockerizado.

## Índice
- [Sobre o Projeto](#sobre-o-projeto)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Pré-requisitos](#pré-requisitos)
- [Instalação e Configuração](#instalação-e-configuração)
- [Uso](#uso)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Licença](#licença)

---

## Sobre o Projeto

> Este projeto visa gerenciar reservas e o cardápio de um restaurante, oferecendo uma interface interativa para os usuários realizarem reservas de mesas e personalizarem pedidos.

## Tecnologias Utilizadas

- **React** - Front-end
- **Node.js** com **TypeScript** - Back-end
- **Prisma** - ORM para interagir com o banco de dados
- **PostgreSQL** - Banco de dados
- **Docker** - Para a containerização do ambiente

## Pré-requisitos

Para rodar o projeto localmente, você precisará ter instalado:

- **Docker** e **Docker Compose**
- **Node.js** (>= 14.x)
- **npm** ou **yarn**

## Instalação e Configuração

### 1. Clone o repositório

```bash
git clone https://github.com/matheusoda/reservas
cd reservas
```

### 2. Instale dependências de back-end 

Criar arquivo .env na pasta backend, e nela colocar as seguintes variáveis com os dados correspondentes.

```bash
DATABASE_URL="postgresql://postgres:postgres@db:5432/reservedb"
PORT=5000
JWT_SECRET="a244262e7e94c78fe911322cacde31da36ba10bb7cdd9d13c469fe9e3f6a56cc"
```

Acesse a pasta backend e execute o comando:
```bash
npm install
```

Após instaladas é necessário rodar as migrations com o comando:
```bash
npx prisma migrate dev
```

Em seguida é necessário realizar a inserção dos dados básicos rodando o comando:
```bash
npm run seed
```

### 3. Instale dependências de front-end 

acesse a pasta frontend
```bash
npm install
```

### 4. Executando docker

```bash
docker-compose up --build
```

## Uso
Com o Docker em execução, você pode acessar:

Front-end: http://localhost:3000
Back-end: http://localhost:5000


## Estrutura do projeto
```bash
reservas/
│
├── frontend/              # Código do front-end em React
│   ├── src/
│   └── public/
│
├── backend/              # Código do back-end em Node.js e Prisma
│   ├── src/
│   ├── prisma/
│   └── migrations/
│
└── docker-compose.yml   # Arquivo de configuração do Docker Compose
```

## Licença

MIT License

Copyright (c) [2024] [Matheus Yuji Oda Kagohara]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
