# Projeto de Banco de Dados: Oficina Mecânica

Este repositório contém os scripts SQL desenvolvidos para o projeto da disciplina de Banco de Dados I, focado na criação, gerenciamento e consulta de um banco de dados para uma oficina mecânica.

## 🎯 Sobre o Projeto

O objetivo deste projeto é aplicar os conceitos fundamentais de bancos de dados relacionais na modelagem e implementação de um sistema para uma oficina. O banco de dados armazena informações sobre `Clientes`, `Veículos`, `Peças`, `Serviços` e as `Ordens de Serviço` que conectam todas essas entidades, permitindo um gerenciamento eficiente das operações da oficina.

## 🛠️ Tecnologias Utilizadas

* **Linguagem:** `SQL`
* **SGBD (Sistema de Gerenciamento de Banco de Dados):** Projetado para ser compatível com sistemas SQL padrão como `PostgreSQL`, `MySQL` ou `SQL Server`.

## 📁 Estrutura do Repositório

* **`Criacao_Tabelas.sql`**: Contém todos os comandos `CREATE TABLE` para gerar a estrutura completa do banco de dados, incluindo tabelas, chaves primárias e chaves estrangeiras.
* **`INSERTS.sql`**: Script com os comandos `INSERT INTO` para popular o banco de dados com dados de exemplo (mocks), permitindo a realização de testes e consultas.
* **`QUERIES.sql`**: Arquivo com uma variedade de consultas (`SELECT`) para extrair informações úteis do banco de dados, demonstrando a aplicação prática do esquema criado.

## ✨ Funcionalidades Implementadas nos Scripts

### Criação do Banco

* Definição de 8 tabelas principais: `Cliente`, `Veiculo`, `Peca`, `Servico`, `Ordem_Servico`, `Pecas_Utilizadas`, `Servicos_Realizados` e `Equipe_Servico`.
* Estabelecimento de relacionamentos lógicos através de chaves primárias e estrangeiras.
* Uso de tipos de dados adequados para cada coluna (ex: `VARCHAR`, `INT`, `DECIMAL`, `DATE`).
* Aplicação de restrições (`CONSTRAINTS`) para garantir a integridade dos dados, como `NOT NULL`.

### Consultas (Queries)

O arquivo `QUERIES.sql` inclui exemplos de como extrair informações relevantes, tais como:
* Listagem de todos os clientes e seus veículos.
* Busca por ordens de serviço em um determinado período.
* Cálculo do valor total de uma ordem de serviço (peças + serviços).
* Verificação do estoque de peças.
* Identificação dos serviços mais realizados.

## 🚀 Como Utilizar

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/GuilhermeAzevedo13/Banco-de-Dados.git](https://github.com/GuilhermeAzevedo13/Banco-de-Dados.git)
    ```
2.  **Execute os scripts SQL:**
    * Em seu SGBD de preferência, execute o script `Criacao_Tabelas.sql` para criar toda a estrutura.
    * Em seguida, execute `INSERTS.sql` para popular as tabelas com os dados de exemplo.
    * Finalmente, utilize as consultas presentes em `QUERIES.sql` para explorar o banco de dados ou crie suas próprias consultas.

---
Feito com ❤️ por **Guilherme Azevedo**
