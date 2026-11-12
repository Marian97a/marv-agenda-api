# ADR 0001 — Arquitetura em camadas e padrão Repository

- **Status:** Aceito
- **Data:** 11/11/2026
- **Projeto:** MARV Agenda API

## 1. Contexto

A MARV Agenda API foi desenvolvida para gerenciar agendamentos, permitindo cadastrar, consultar, confirmar e cancelar compromissos.

O projeto precisa manter uma estrutura organizada, facilitar os testes automatizados e permitir que a lógica de negócio não dependa diretamente da tecnologia utilizada para armazenar os dados.

Também é necessário garantir que os testes possam ser executados sem exigir uma instância externa do PostgreSQL.

## 2. Decisão arquitetural

Foi adotada uma arquitetura em camadas, com as seguintes responsabilidades:

- **Domain:** contém as entidades, estados e regras fundamentais do negócio.
- **Application:** contém os casos de uso, interfaces de repositório e erros relacionados às operações.
- **Infrastructure:** implementa os detalhes técnicos, como conexão com PostgreSQL, persistência e observabilidade.
- **Routes:** disponibiliza os endpoints HTTP e conecta as requisições aos casos de uso.

Essa separação busca reduzir o acoplamento entre as partes da aplicação e facilitar sua manutenção.

## 3. Padrão Repository

Foi adotado o padrão Repository para abstrair o acesso aos dados dos agendamentos.

A interface `AppointmentRepository` define as operações de persistência necessárias para a aplicação, enquanto as implementações concretas ficam na infraestrutura.

Foram utilizadas duas implementações:

- `PostgresAppointmentRepository`: realiza a persistência dos agendamentos no PostgreSQL.
- `InMemoryAppointmentRepository`: mantém os dados em memória e é utilizada nos testes automatizados.

Dessa forma, os casos de uso dependem de uma abstração, e não diretamente do banco de dados.

## 4. Injeção de dependência

A aplicação utiliza injeção de dependência por meio da função `createApp(repository)`.

Essa abordagem permite fornecer diferentes implementações de `AppointmentRepository` conforme o contexto:

- Na execução normal da API, é utilizado o repositório PostgreSQL.
- Nos testes, é utilizado o repositório em memória.

Isso permite testar os endpoints sem depender de uma conexão real com o banco de dados.

## 5. Consequências da decisão

**Benefícios:**

- Separação de responsabilidades.
- Menor acoplamento entre regras de negócio e persistência.
- Facilidade para criar e executar testes automatizados.
- Possibilidade de substituir a implementação de persistência sem alterar os casos de uso.
- Maior organização e facilidade de manutenção.

**Limitações:**

- A separação em camadas adiciona arquivos e interfaces ao projeto.
- Cada implementação de repositório precisa respeitar o contrato definido pela interface.
- A sincronização entre o modelo de domínio e a persistência exige mapeamento dos dados.

## 6. Alternativas consideradas

Uma alternativa seria implementar as consultas ao PostgreSQL diretamente nas rotas ou nos casos de uso.

Essa abordagem foi descartada porque aumentaria o acoplamento entre a lógica de negócio e a infraestrutura, dificultando os testes e futuras alterações.

A utilização de um repositório em memória exclusivamente para testes foi escolhida para manter os testes de integração independentes de serviços externos.

## 7. Conclusão

A arquitetura em camadas, combinada com o padrão Repository e a injeção de dependência, foi escolhida para proporcionar organização, testabilidade e separação de responsabilidades, mantendo a solução adequada ao escopo da MARV Agenda API.