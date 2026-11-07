
# Escopo do Projeto — MARV Agenda API

## 1. Objetivo

Desenvolver uma API REST para gerenciamento de agendamentos de serviços, permitindo registrar, consultar, confirmar e cancelar horários.

## 2. Problema identificado

Profissionais autônomos podem enfrentar dificuldades para organizar seus compromissos utilizando ferramentas manuais ou diferentes canais de comunicação.

Entre os problemas identificados estão:
- Conflitos de horários.
- Dificuldade para consultar agendamentos.
- Falta de controle sobre cancelamentos.
- Informações descentralizadas.

## 3. Solução

Uma API centralizada que disponibiliza operações para gerenciamento de agendamentos, com validações e regras de negócio.

## 4. Público-alvo

- Salões de beleza.
- Barbearias.
- Clínicas e consultórios.
- Personal trainers.
- Profissionais autônomos.
- Prestadores de serviços.

## 5. Funcionalidades previstas

1. Criar agendamento.
2. Listar agendamentos.
3. Consultar agendamento por ID.
4. Confirmar agendamento.
5. Cancelar agendamento.
6. Validar conflitos de horários.

## 6. Fora do escopo

Para manter o projeto simples, não serão implementados nesta versão:

- Autenticação e autorização.
- Pagamentos.
- Notificações automáticas.
- Aplicação frontend.
- Gerenciamento de múltiplos profissionais.
- Integrações externas.

## 7. Entidade principal

Agendamento (Appointment).

Atributos previstos:

- id
- clientName
- phone
- service
- dateTime
- status
- createdAt

## 8. Tecnologias previstas

- Node.js
- TypeScript
- Express
- PostgreSQL
- Prisma ORM
- Docker Compose
- Vitest
- Supertest
- GitHub Actions

## 9. Resultado esperado

Entregar uma API funcional, testada, documentada e executável por meio de Docker Compose, acompanhada de evidências de integração contínua, observabilidade e desempenho.
