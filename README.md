# Flood Shelter API — Backend

API REST para gerenciamento de abrigos de emergência em situações de enchente. Desenvolvida com Node.js, Express e PostgreSQL.

## 1. Apresentação da Ideia

Esse é o meu projeto. A ideia surgiu a partir do desafio sobre enchentes no Brasil. Pensando nesse cenário, decidi focar no problema de **falta de informação sobre abrigos disponíveis**, onde pessoas deslocadas não conseguem encontrar rapidamente um local seguro para se abrigar.

## 2. Problema Escolhido

### Caso 1 — Falta de Informação sobre Abrigos

Durante enchentes, muitas pessoas precisam sair de suas casas rapidamente e não sabem onde encontrar abrigos disponíveis ou se ainda há vagas. A informação existe, mas está espalhada e desatualizada, dificultando decisões em momentos críticos.

## 3. Solução Proposta

Uma API REST que centraliza informações sobre abrigos de emergência, permitindo:

- Cadastrar e atualizar abrigos com capacidade, ocupação e necessidades
- Consultar abrigos com filtros por status, cidade e acessibilidade
- Calcular automaticamente o status do abrigo com base na ocupação
- Manter persistência dupla: PostgreSQL como banco principal e JSON como backup local

### Lógica de Status

O status é calculado automaticamente via trigger no banco de dados:

| Ocupação | Status |
| ---------- | -------- |
| Menos de 80% da capacidade | `available` |
| Entre 80% e 99% | `critical` |
| 100% | `full` |

## 4. Estrutura do Sistema

### Front-end

Aplicação Vue.js (Vite) que exibe lista de abrigos, permite cadastro e filtragem por status, cidade e acessibilidade.

### Back-end

API REST em **Node.js + Express** organizada em camadas:

```text
back-end/
├── server.js                        # Entrada do servidor
├── src/
│   ├── app.js                       # Express, middlewares e rotas
│   ├── config/
│   │   └── database.js              # Pool de conexão PostgreSQL
│   ├── models/
│   │   └── shelter.js               # Queries e lógica de dados
│   ├── controllers/
│   │   └── shelterController.js     # Handlers das requisições
│   ├── routes/
│   │   └── shelterRoutes.js         # Definição das rotas
│   ├── middleware/
│   │   └── validation.js            # Validação com express-validator
│   └── persistence/
│       └── jsonPersistence.js       # Backup em arquivo JSON
├── database/
│   ├── migrations.sql               # Criação da tabela e triggers
│   └── seed.sql                     # Dados iniciais de exemplo
└── data/
    └── shelters.json                # Backup local (gerado automaticamente)
```

## Endpoints da API

Base URL: `http://localhost:3000`

| Método | Rota | Descrição |
| -------- | ------ | ----------- |
| `GET` | `/health` | Health check da API |
| `GET` | `/api/shelters` | Lista todos os abrigos (aceita filtros) |
| `GET` | `/api/shelters/:id` | Retorna um abrigo pelo ID |
| `POST` | `/api/shelters` | Cadastra novo abrigo |
| `PATCH` | `/api/shelters/:id` | Atualiza dados de um abrigo |
| `DELETE` | `/api/shelters/:id` | Remove um abrigo |

### Filtros — `GET /api/shelters`

| Parâmetro | Tipo | Descrição |
| ----------- | ------ | ----------- |
| `search` | string | Busca por nome, cidade ou endereço |
| `status` | string | `available`, `critical` ou `full` |
| `accepts_pets` | boolean | `true` filtra abrigos que aceitam pets |
| `accepts_elderly` | boolean | `true` filtra abrigos que aceitam idosos |
| `accepts_disabled` | boolean | `true` filtra abrigos com acessibilidade para PCD |

### Campos do abrigo

| Campo | Tipo | Obrigatório | Descrição |
| ------- | ------ | ----------- | ----------- |
| `name` | string | Sim | Nome do abrigo |
| `address` | string | Sim | Endereço completo |
| `city` | string | Sim | Cidade |
| `state` | string (2 chars) | Sim | UF (ex: `RS`) |
| `phone` | string | Sim | Telefone do abrigo |
| `capacity` | integer | Sim | Capacidade total (mínimo 1) |
| `current_occupancy` | integer | Não | Ocupação atual (padrão: `0`) |
| `accepts_pets` | boolean | Não | Aceita animais (padrão: `false`) |
| `accepts_elderly` | boolean | Não | Aceita idosos (padrão: `false`) |
| `accepts_disabled` | boolean | Não | Acessível para PCD (padrão: `false`) |
| `needs` | string[] | Não | Lista de necessidades do abrigo |
| `coordinator_name` | string | Sim | Nome do coordenador |
| `coordinator_phone` | string | Sim | Telefone do coordenador |

---

## Como Executar

### Pré-requisitos

- [Node.js](https://nodejs.org/) 18+
- [PostgreSQL](https://www.postgresql.org/) 14+

### Instalação

```bash
# 1. Instalar dependências
npm install

# 2. Configurar variáveis de ambiente
cp .env.example .env
# Edite o .env com suas credenciais do PostgreSQL
```

### Banco de Dados

**PostgreSQL** com tabela `shelters` e dois triggers automáticos:

- `set_shelter_status` — calcula o campo `status` a cada INSERT ou UPDATE
- `set_updated_at` — atualiza o campo `updated_at` a cada modificação

```bash
# Criar o banco e as tabelas
psql -U postgres -f database/migrations.sql

# Popular com dados de exemplo (opcional)
psql -U postgres -d shelters_db -f database/seed.sql
```

### Iniciar o servidor

```bash
# Modo desenvolvimento (hot reload)
npm run dev

# Modo produção
npm start
```

O servidor estará disponível em `http://localhost:3000`.

## Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com base no `.env.example`:

| Variável | Descrição | Padrão |
| ---------- | ----------- | -------- |
| `PORT` | Porta do servidor | `3000` |
| `DB_HOST` | Host do PostgreSQL | `localhost` |
| `DB_PORT` | Porta do PostgreSQL | `5432` |
| `DB_USER` | Usuário do banco | `postgres` |
| `DB_PASSWORD` | Senha do banco | — |
| `DB_NAME` | Nome do banco | `shelters_db` |

---

## Exemplos de Requisição

### GET — Listar todos os abrigos

```http
GET /api/shelters
```

**Resposta `200 OK`:**

```json
{
  "shelters": [...],
  "total": 15
}
```

### GET — Buscar com filtros

```http
GET /api/shelters?search=Porto Alegre&status=available&accepts_pets=true
```

### GET — Buscar por ID

```http
GET /api/shelters/1
```

### POST — Cadastrar abrigo

```http
POST /api/shelters
Content-Type: application/json
```

```json
{
  "name": "Escola Municipal Centro",
  "address": "Rua Principal, 100",
  "city": "Porto Alegre",
  "state": "RS",
  "phone": "(51) 3333-0000",
  "capacity": 150,
  "current_occupancy": 0,
  "accepts_pets": true,
  "accepts_elderly": true,
  "accepts_disabled": false,
  "needs": ["água potável", "cobertores"],
  "coordinator_name": "João Silva",
  "coordinator_phone": "(51) 99999-0000"
}
```

**Resposta `201 Created`:**

```json
{
  "id": 16,
  "name": "Escola Municipal Centro",
  "status": "available",
  "created_at": "2026-04-21T05:00:00.000Z"
}
```

### PATCH — Atualizar ocupação

```http
PATCH /api/shelters/1
Content-Type: application/json
```

```json
{
  "current_occupancy": 130
}
```

### DELETE — Remover abrigo

```http
DELETE /api/shelters/1
```

**Resposta `200 OK`:**

```json
{
  "message": "Shelter deleted successfully",
  "shelter": { ... }
}
```

## Tecnologias Utilizadas

| Tecnologia | Uso |
| ------------ | ----- |
| Node.js 18+ | Runtime JavaScript |
| Express 5.x | Framework HTTP |
| PostgreSQL 14+ | Banco de dados principal |
| pg | Driver PostgreSQL para Node.js |
| dotenv | Gerenciamento de variáveis de ambiente |
| cors | Liberação de Cross-Origin Resource Sharing |
| express-validator | Validação e sanitização de entradas |
| nodemon | Hot reload em desenvolvimento |
