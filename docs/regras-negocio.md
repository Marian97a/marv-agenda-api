
# Regras de Negócio — MARV Agenda API

## RN01 — Dados obrigatórios

Todo agendamento deve possuir:
- Nome do cliente.
- Telefone.
- Serviço.
- Data e horário.

## RN02 — Status inicial

Todo novo agendamento deve ser criado com status PENDING.

## RN03 — Horário ocupado

Não será permitido criar um novo agendamento em um horário que já possua outro agendamento ativo.

## RN04 — Confirmação

Um agendamento poderá ser confirmado somente se não estiver cancelado.

## RN05 — Cancelamento

Um agendamento poderá ser cancelado se ainda não estiver cancelado.

## RN06 — Identificação

Cada agendamento deverá possuir um identificador único.

## RN07 — Data e horário

A data deverá ser válida e respeitar a convenção de fuso horário definida pelo projeto.

## RN08 — Integridade

As operações deverão preservar a consistência dos dados armazenados.

## Estados possíveis

- PENDING: aguardando confirmação.
- CONFIRMED: confirmado.
- CANCELLED: cancelado.
