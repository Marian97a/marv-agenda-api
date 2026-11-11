# SLO — MARV Agenda API

## 1. Objetivo

Definir metas de confiabilidade e desempenho para a MARV Agenda API, permitindo acompanhar a qualidade do serviço por meio de métricas HTTP.

## 2. Indicadores e metas

| Indicador | Meta |
|---|---|
| Disponibilidade HTTP | Pelo menos 99% das requisições válidas devem retornar respostas diferentes de erros 5xx. |
| Tempo de resposta | Pelo menos 95% das requisições devem ser concluídas em até 500 ms. |

## 3. Janela de observação

A avaliação considera uma janela de 7 dias, utilizando as métricas coletadas pela aplicação.

## 4. Como acompanhar

A API disponibiliza o endpoint `/metrics`, com métricas no formato Prometheus:

- `http_requests_total`: total de requisições HTTP por método, rota e código de resposta.
- `http_request_duration_seconds`: distribuição do tempo de resposta das requisições.

## 5. Critérios de avaliação

A disponibilidade é calculada pela proporção de respostas que não apresentam status HTTP 5xx em relação ao total de requisições válidas.

O tempo de resposta é avaliado pelo percentil 95 (p95), que representa o tempo abaixo do qual 95% das requisições são concluídas.

## 6. Limitações

As metas representam objetivos definidos para o projeto acadêmico. A coleta local de métricas não representa, isoladamente, uma garantia de disponibilidade em produção.

Não há atualmente um serviço externo de monitoramento contínuo ou alertas automáticos configurados.
