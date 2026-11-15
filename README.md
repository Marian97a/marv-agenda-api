# Projeto B — MARV Agenda

[![CI](https://github.com/Marian97a/marv-agenda-api/actions/workflows/ci.yml/badge.svg)](https://github.com/Marian97a/marv-agenda-api/actions/workflows/ci.yml)

Sistema de gerenciamento de agendamentos desenvolvido como projeto final da trilha Full Cycle do programa **Geração Tech 26 — Ceará**.

A solução permite cadastrar, consultar, confirmar e cancelar agendamentos por meio de uma API REST, com persistência em PostgreSQL e uma interface web para gerenciamento.

## Aplicação publicada

- **Frontend:** https://marv-agenda-web.onrender.com
- **API REST:** https://marv-agenda-api.onrender.com
- **Documentação Swagger:** https://marv-agenda-api.onrender.com/api-docs
- **Health Check:** https://marv-agenda-api.onrender.com/health
- **Métricas Prometheus:** https://marv-agenda-api.onrender.com/metrics

## Nível do projeto

**Intermediário — Projeto individual.**

O projeto utiliza arquitetura em camadas, separação de responsabilidades, padrão Repository, injeção de dependência, testes automatizados, documentação OpenAPI e práticas de observabilidade.

## Tecnologias utilizadas

**Backend**
- Node.js 22
- TypeScript
- Express
- PostgreSQL 16

**Frontend**
- React
- TypeScript
- Vite
- React Router
- Lucide React
- CSS responsivo

**Infraestrutura e qualidade**
- Docker e Docker Compose
- Vitest e Supertest
- Pino e Pino HTTP
- Prometheus (`prom-client`)
- Grafana k6
- Swagger / OpenAPI
- GitHub Actions
- Render

## Funcionalidades

- Cadastro de agendamentos.
- Listagem de todos os agendamentos.
- Consulta de agendamento por identificador.
- Confirmação de agendamentos.
- Cancelamento de agendamentos.
- Validação dos dados recebidos.
- Prevenção de conflitos de horários.
- Persistência dos dados em PostgreSQL.
- Dashboard com indicadores de agendamentos.
- Filtros por situação.
- Interface responsiva para desktop, tablet e celular.
- Notificações de sucesso e erro nas operações.

## Arquitetura

O backend foi organizado em camadas para separar as responsabilidades e facilitar a manutenção:

- **Domain:** entidades e regras fundamentais do negócio.
- **Application:** casos de uso e interfaces necessárias à aplicação.
- **Infrastructure:** persistência, banco de dados e implementações técnicas.
- **Routes:** definição das rotas HTTP e integração com os casos de uso.

O padrão Repository permite desacoplar as regras de negócio da implementação de persistência. A injeção de dependência facilita os testes utilizando repositórios em memória.

O frontend foi desenvolvido separadamente, consumindo a API REST por meio de serviços HTTP.

## Estrutura do projeto

```text
marv-agenda-api/
├── src/
│   ├── application/
│   ├── domain/
│   ├── infrastructure/
│   ├── routes/
│   ├── app.ts
│   └── server.ts
├── tests/
├── docs/
│   ├── adr/
│   ├── openapi.yaml
│   ├── ia.md
│   ├── slo.md
│   └── desempenho.md
├── .github/
│   └── workflows/
├── Dockerfile
├── docker-compose.yml
├── .env.example
└── README.md
```

Repositório do frontend: https://github.com/Marian97a/marv-agenda-web

## Pré-requisitos

Para executar o ambiente local:

- Node.js 22 ou superior.
- npm.
- Docker Desktop com Docker Compose.
- Git.

## Instalação e configuração

### 1. Clonar o repositório

```bash
git clone https://github.com/Marian97a/marv-agenda-api.git
cd marv-agenda-api
npm install
```

### 2. Configurar as variáveis de ambiente

Crie o arquivo `.env` a partir do exemplo:

**PowerShell:**

```powershell
Copy-Item .env.example .env
```

Configure as credenciais locais conforme necessário:

```dotenv
PORT=3000
DB_HOST=localhost
DB_PORT=5433
DB_USER=marv_user
DB_PASSWORD=marv_local_password
DB_NAME=marv_agenda
```

Os valores acima são exemplos para o ambiente local. Não compartilhe credenciais reais nem publique o arquivo `.env`.

### 3. Executar com Docker Compose

Inicie a aplicação e o PostgreSQL:

```bash
docker compose up --build -d
```

Verifique os serviços:

```bash
docker compose ps
```

Consulte os logs da API:

```bash
docker compose logs api --tail=50
```

A API estará disponível em:

http://localhost:3000

Para interromper os serviços sem remover os dados persistidos:

```bash
docker compose down
```

### 4. Executar a API localmente (opcional)

Para iniciar somente o banco de dados pelo Docker e executar a API em modo de desenvolvimento:

```bash
docker compose up -d postgres
npm run dev
```

## Endpoints da API

| Método | Endpoint | Descrição |
|---|---|---|
| GET | `/health` | Verificação de saúde da API |
| POST | `/appointments` | Criar agendamento |
| GET | `/appointments` | Listar agendamentos |
| GET | `/appointments/:id` | Consultar agendamento |
| PATCH | `/appointments/:id/confirm` | Confirmar agendamento |
| PATCH | `/appointments/:id/cancel` | Cancelar agendamento |
| GET | `/metrics` | Expor métricas Prometheus |
| GET | `/api-docs` | Documentação Swagger |

A documentação detalhada das rotas, parâmetros e respostas está disponível no Swagger.

## Testes e qualidade

O projeto possui testes automatizados unitários e de integração utilizando Vitest e Supertest.

Principais comandos:

```bash
npm test
npm run test:watch
npm run typecheck
npm run build
```

A cobertura possui limites mínimos configurados:

- Statements: 70%.
- Functions: 70%.
- Lines: 70%.
- Branches: 55%.

## Observabilidade

A aplicação utiliza:

- **Pino:** geração de logs estruturados em JSON.
- **Pino HTTP:** registro de informações das requisições.
- **Prometheus:** coleta de métricas HTTP.
- **SLO:** documentação dos objetivos de serviço.

As métricas são disponibilizadas em `/metrics`, incluindo:

- `http_requests_total`
- `http_request_duration_seconds`

Mais informações em `docs/slo.md`.

## Testes de desempenho

Foram realizados testes de carga utilizando Grafana k6.

Os resultados e as condições de execução estão documentados em:

`docs/desempenho.md`

Os testes ajudam a observar o comportamento da API sob carga, sem representar uma garantia de desempenho em qualquer ambiente de produção.

## CI/CD

O projeto utiliza GitHub Actions para executar verificações automatizadas no repositório.

O fluxo de integração contínua está configurado em:

`.github/workflows/ci.yml`

O backend e o frontend são mantidos em repositórios separados e publicados no Render.

## Documentação e decisões técnicas

- **ADR:** decisões arquiteturais em `docs/adr/0001-arquitetura-e-persistencia.md`.
- **Uso de IA:** registros e informações sobre utilização de inteligência artificial em `docs/ia.md`.
- **SLO:** objetivos e métricas de serviço em `docs/slo.md`.
- **Desempenho:** resultados dos testes de carga em `docs/desempenho.md`.
- **OpenAPI:** especificação das rotas em `docs/openapi.yaml`.

## Autor

Projeto individual desenvolvido para a trilha Full Cycle do programa Geração Tech 26 — Ceará.