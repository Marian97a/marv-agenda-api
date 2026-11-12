
# Projeto B — MARV Agenda API

[![CI](https://github.com/Marian97a/marv-agenda-api/actions/workflows/ci.yml/badge.svg)](https://github.com/Marian97a/marv-agenda-api/actions/workflows/ci.yml)

API REST para gerenciamento de agendamentos, desenvolvida como projeto final da trilha Full Cycle do programa Geração Tech 26 — Ceará.

O projeto permite cadastrar, consultar, confirmar e cancelar agendamentos, utilizando Node.js, TypeScript e PostgreSQL.

## Nível do projeto

**Intermediário — Projeto individual.**

O desenvolvimento contempla organização em camadas, princípios de separação de responsabilidades, padrão Repository, injeção de dependência, testes automatizados, integração com banco de dados, documentação OpenAPI e observabilidade.

## Tecnologias utilizadas

- Node.js 22
- TypeScript
- Express
- PostgreSQL 16
- Docker e Docker Compose
- Vitest
- Supertest
- Pino e Pino HTTP
- Prometheus (prom-client)
- Swagger / OpenAPI
- Grafana k6

## Funcionalidades

- Cadastro de agendamentos.
- Listagem de agendamentos.
- Consulta de agendamento por identificador.
- Confirmação de agendamentos.
- Cancelamento de agendamentos.
- Validação dos dados e regras de negócio.
- Persistência dos dados em PostgreSQL.
- Prevenção de conflitos de horários ativos.

## Pré-requisitos

Antes de executar o projeto, instale:

- Node.js 22 ou superior.
- npm.
- Docker Desktop com Docker Compose.
- Git.

## Instalação e configuração

### 1. Clonar o repositório

```bash
git clone https://github.com/Marian97a/marv-agenda-api.git
cd marv-agenda-api
```

### 2. Instalar as dependências

```bash
npm install
```

### 3. Configurar as variáveis de ambiente

Crie seu arquivo `.env` a partir do exemplo:

No PowerShell:

```powershell
Copy-Item .env.example .env
```

Configure os valores de acordo com seu ambiente:

```dotenv
PORT=3000
DB_HOST=localhost
DB_PORT=5433
DB_USER=marv_user
DB_PASSWORD=marv_local_password
DB_NAME=marv_agenda
```

Não compartilhe o arquivo `.env` nem envie credenciais para o repositório.

### 4. Iniciar o banco de dados

Com o Docker Desktop em execução:

```bash
docker compose up -d
```

Esse comando inicia o PostgreSQL configurado no Docker Compose.

### 5. Executar a API

```bash
npm run dev
```

A API ficará disponível em:

`http://localhost:3000`

## Endpoints

| Método | Endpoint | Descrição |
|---|---|---|
| GET | `/health` | Verificação de saúde da API |
| POST | `/appointments` | Criar agendamento |
| GET | `/appointments` | Listar agendamentos |
| GET | `/appointments/:id` | Consultar agendamento |
| PATCH | `/appointments/:id/confirm` | Confirmar agendamento |
| PATCH | `/appointments/:id/cancel` | Cancelar agendamento |
| GET | `/metrics` | Métricas da aplicação |
| GET | `/api-docs` | Documentação Swagger |

## Documentação da API

A documentação interativa está disponível após iniciar a aplicação:

`http://localhost:3000/api-docs`

O contrato OpenAPI também está disponível em:

`docs/openapi.yaml`

## Testes e qualidade

Executar os testes automatizados com relatório de cobertura:

```bash
npm test
```

Executar os testes em modo de observação:

```bash
npm run test:watch
```

Verificar os tipos TypeScript:

```bash
npm run typecheck
```

Compilar o projeto:

```bash
npm run build
```

A cobertura mínima configurada é:

- Statements: 70%
- Branches: 55%
- Functions: 70%
- Lines: 70%

O relatório HTML de cobertura é gerado no diretório `coverage/`.

## Observabilidade

A aplicação utiliza Pino e Pino HTTP para registrar informações estruturadas das requisições, incluindo método HTTP, rota, status da resposta e duração.

As métricas são disponibilizadas no endpoint:

`http://localhost:3000/metrics`

Entre as métricas expostas estão:

- `http_requests_total`
- `http_request_duration_seconds`

Os objetivos de nível de serviço (SLO) estão documentados em `docs/slo.md`.

## Teste de desempenho

O projeto utiliza Grafana k6 para executar testes de carga nos endpoints de saúde e listagem de agendamentos.

Com a API em execução, execute na raiz do projeto:

```powershell
docker run --rm -v "${PWD}/tests/performance:/scripts" -w /scripts grafana/k6 run load-test.js
```

O teste verifica, entre outros critérios:

- Percentil 95 de latência inferior a 500 ms.
- Taxa de falhas inferior a 1%.

Os resultados obtidos no ambiente de desenvolvimento estão registrados em `docs/desempenho.md`.

## Integração contínua

O projeto utiliza GitHub Actions para executar automaticamente:

1. Instalação das dependências.
2. Verificação de tipos TypeScript.
3. Execução dos testes automatizados.
4. Build da aplicação.

O workflow está em `.github/workflows/ci.yml`.

## Estrutura do projeto

```text
src/
├── application/
│   ├── errors/
│   ├── repositories/
│   └── use-cases/
├── domain/
│   └── appointment/
├── infrastructure/
│   ├── database/
│   ├── observability/
│   └── repositories/
├── routes/
├── app.ts
└── server.ts

tests/
├── unit/
├── integration/
└── performance/

database/
docs/
├── adr/
├── openapi.yaml
├── desempenho.md
├── escopo.md
├── ia.md
├── regras-negocio.md
└── slo.md

.github/
└── workflows/
```

## Decisões arquiteturais

As principais decisões técnicas estão registradas em:

- `docs/adr/0001-arquitetura-e-persistencia.md`

O documento explica a arquitetura em camadas, o padrão Repository e a utilização de injeção de dependência.

## Uso de inteligência artificial

O desenvolvimento contou com apoio de ferramentas de inteligência artificial para pesquisa, orientação técnica, revisão e documentação.

Os registros de utilização e os prompts relevantes estão disponíveis em `docs/ia.md`.

## Autor

Desenvolvido individualmente como projeto final da trilha Full Cycle — Geração Tech 26, Ceará.