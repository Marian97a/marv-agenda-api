# Relatório de Desempenho — MARV Agenda API

## 1. Objetivo

Avaliar o comportamento da MARV Agenda API sob carga simulada, verificando o tempo de resposta, a taxa de falhas HTTP e a estabilidade dos endpoints.

## 2. Ferramenta utilizada

- Ferramenta: Grafana k6
- Execução: Docker
- Ambiente: local
- Duração: aproximadamente 2 minutos
- Usuários virtuais: até 10
- Endpoints avaliados:
  - `GET /health`
  - `GET /appointments`

O teste não realizou operações de criação, confirmação ou cancelamento, evitando alterações nos dados do banco.

## 3. Configuração da carga

O teste utilizou três estágios:

| Estágio | Duração | Usuários virtuais |
|---|---:|---:|
| Aquecimento | 30 segundos | 5 |
| Carga principal | 1 minuto | 10 |
| Encerramento | 30 segundos | 0 |

Foram realizadas verificações para confirmar que os dois endpoints retornavam HTTP 200.

## 4. Resultados obtidos

| Indicador | Resultado |
|---|---:|
| Total de requisições HTTP | 1.290 |
| Requisições por segundo | 10,70 |
| Iterações concluídas | 645 |
| Usuários virtuais máximos | 10 |
| Tempo médio de resposta | 14,53 ms |
| Tempo mediano | 10,45 ms |
| Percentil 90 (p90) | 29,30 ms |
| Percentil 95 (p95) | 40,37 ms |
| Tempo máximo | 163,23 ms |
| Falhas HTTP | 0,00% |
| Verificações aprovadas | 100% |

## 5. Comparação com o SLO

| Indicador | Meta | Resultado | Situação |
|---|---:|---:|---|
| Tempo p95 | Abaixo de 500 ms | 40,37 ms | Atendida |
| Falhas HTTP | Abaixo de 1% | 0,00% | Atendida |

Os resultados ficaram dentro das metas estabelecidas no documento `slo.md`.

## 6. Análise técnica

Durante o cenário avaliado, a API apresentou tempo médio de resposta de 14,53 ms e p95 de 40,37 ms.

Nenhuma falha HTTP foi registrada entre as 1.290 requisições realizadas. Todas as verificações dos endpoints de saúde e listagem de agendamentos foram aprovadas.

O resultado indica comportamento satisfatório para a carga simulada de até 10 usuários virtuais.

## 7. Limitações do teste

- O teste foi executado em ambiente local, não em produção.
- A carga foi limitada a 10 usuários virtuais.
- Foram avaliados apenas os endpoints de saúde e listagem.
- Não foram simulados cenários de alta concorrência na criação de agendamentos.
- Os resultados dependem dos recursos da máquina e das condições do ambiente durante a execução.

Portanto, os resultados não representam uma garantia de desempenho para cargas maiores ou ambientes de produção.

## 8. Como reproduzir

Com Docker Desktop aberto e a API em execução, utilize:

```bash
docker run --rm -v "${PWD}/tests/performance:/scripts" -w /scripts grafana/k6 run load-test.js
```

O script utilizado está em `tests/performance/load-test.js`.

## 9. Conclusão

No cenário avaliado, a MARV Agenda API atendeu às metas de desempenho e taxa de falhas definidas no SLO.

Os resultados documentados servem como referência inicial para futuras avaliações e melhorias de desempenho.
