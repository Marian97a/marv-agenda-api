# Projeto B — MARV Agenda API

[![CI](https://github.com/Marian97a/marv-agenda-api/actions/workflows/ci.yml/badge.svg)](https://github.com/Marian97a/marv-agenda-api/actions/workflows/ci.yml)

API REST para gerenciamento de agendamentos, desenvolvida como projeto final da trilha Full Cycle do programa Geração Tech 26 — Ceará.

Permite cadastrar, consultar, confirmar e cancelar agendamentos utilizando Node.js, TypeScript e PostgreSQL.

## Nível do projeto

**Intermediário — Projeto individual.**

Utiliza arquitetura em camadas, separação de responsabilidades, padrão Repository, injeção de dependência, testes automatizados, documentação OpenAPI e observabilidade.

## Tecnologias utilizadas

- Node.js 22, TypeScript, Express
- PostgreSQL 16, Docker e Docker Compose
- Vitest, Supertest
- Pino / Pino HTTP, Prometheus (`prom-client`), Grafana k6
- Swagger / OpenAPI

## Funcionalidades

- Gerenciamento completo de agendamentos (cadastro, listagem, consulta, confirmação e cancelamento).
- Validação de dados, regras de negócio e prevenção de conflitos de horários.
- Persistência em PostgreSQL.

## Pré-requisitos

- Node.js 22+ e npm
- Docker Desktop com Docker Compose
- Git

## Instalação e configuração

1. **Clonar e instalar:**
   ```bash
   git clone https://github.com/Marian97a/marv-agenda-api.git
   cd marv-agenda-api
   npm install
   ```

2. **Variáveis de ambiente (`.env`):**
   ```powershell
   Copy-Item .env.example .env
   ```
   Ajuste as credenciais locais conforme necessário (não compartilhe dados sensíveis):
   ```dotenv
   PORT=3000
   DB_HOST=localhost
   DB_PORT=5433
   DB_USER=marv_user
   DB_PASSWORD=marv_local_password
   DB_NAME=marv_agenda
   ```

3. **Execução via Docker:**
   Inicie a aplicação e o PostgreSQL 16 de forma integrada:
   ```bash
   docker compose up --build -d
   ```
   Para verificar o status e os logs:
   ```bash
   docker compose ps
   docker compose logs api --tail=50
   ```
   Acesse a API em `http://localhost:3000`. Para parar os serviços sem perder dados: `docker compose down` (ou reinicie com `docker compose up -d`).

   *(Opcional) Para rodar apenas o banco no Docker e a API localmente via hot-reloading:*
   ```bash
   docker compose up -d postgres
   npm run dev
   ```

## Endpoints e Documentação

Principais rotas disponíveis (`/health`, `/appointments`, `/metrics`, `/api-docs`):

| Método | Endpoint | Descrição |
|---|---|---|
| GET | `/health` | Verificação de saúde da API |
| POST / GET | `/appointments` | Criar ou listar agendamentos |
| GET / PATCH | `/appointments/:id(...)` | Consultar, confirmar ou cancelar |
| GET | `/metrics` | Métricas Prometheus |
| GET | `/api-docs` | Swagger / OpenAPI (`docs/openapi.yaml`) |

## Testes, Qualidade e Observabilidade

- **Testes:** `npm test`, `npm run test:watch`, `npm run typecheck`, `npm run build` (Cobertura mínima configurada em Statements/Functions/Lines de 70% e Branches de 55%).
- **Observabilidade:** Logs estruturados via Pino e métricas (`http_requests_total`, `http_request_duration_seconds`) em `/metrics`. Consulte `docs/slo.md`.
- **Desempenho:** Testes de carga com Grafana k6 (`docker run ... load-test.js`). Detalhes em `docs/desempenho.md`.
- **CI/CD:** GitHub Actions configurado em `.github/workflows/ci.yml`.

## Estrutura, Decisões e Autor

- **Estrutura:** Organizado em `src/{application,domain,infrastructure,routes}`, `tests/` e `docs/`.
- **ADRs e IA:** Decisões arquiteturais em `docs/adr/0001-arquitetura-e-persistencia.md` e registros de uso de IA em `docs/ia.md`.
- **Autor:** Desenvolvido individualmente para a trilha Full Cycle — Geração Tech 26, Ceará.