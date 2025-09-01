const { Client } = require('pg');

// Configuração da conexão com o SGBD (PostgreSQL no RDS)
const client = new Client({
    host: 'aula-youtube.cgp0ty3zlhv0.us-east-1.rds.amazonaws.com',
    port: 5432,                // Porta padrão do PostgreSQL
    user: 'postgres',
    password: 'BIGteddy123',
    database: 'projeto_Academia',
    ssl: {
        rejectUnauthorized: false
    }
});

// Método para inserir uma nova linha na tabela Pessoa dentro da transação
async function inserirPessoa(cpf, nome, telefone, rua, cep, numero, idade, trx) {
    const query = `
        INSERT INTO academia.Pessoa (cpf, nome, telefone, rua, cep, numero, idade)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
    `;
    const values = [cpf, nome, telefone, rua, cep, numero, idade];
    try {
        await trx.query(query, values);  // Usando a transação (trx) para a operação
        console.log("Pessoa inserida com sucesso!");
    } catch (error) {
        console.error("Erro ao inserir pessoa:", error);
        throw error;  // Lançar erro para garantir rollback
    }
}

// Método para consultar os registros da tabela Pessoa
async function consultarPessoas(trx) {
    const query = `
        SELECT * FROM academia.Pessoa
    `;
    try {
        const res = await trx.query(query);  // Usando a transação (trx) para a consulta
        console.log("Resultado da consulta:");
        console.table(res.rows);
        return res.rows;  // Retorna o resultado da consulta
    } catch (error) {
        console.error("Erro na consulta:", error);
        throw error;  // Lançar erro para garantir rollback
    }
}

// Função principal para gerenciar a conexão e as operações
async function main() {
    try {
        // Conecta ao banco de dados
        await client.connect();
        console.log("Conexão estabelecida com o banco de dados.");

        // Inicia a transação
        await client.query('BEGIN');

        // Chama o método de consulta
        const pessoasAntes = await consultarPessoas(client);

        // Chama o método de inserção (exemplo: inserindo uma nova pessoa)
        // Alterar CPF e Telefone, pois eles estao como UNIQUE 
        await inserirPessoa(2009, 'João Silva', '11999998887', 'Rua Teste', '01001-000', 10, 25, client);

        // Chama o método de consulta após inserção
        const pessoasDepois = await consultarPessoas(client);

        // Commit da transação se tudo correr bem
        await client.query('COMMIT');
        console.log("Transação concluída com sucesso!");

        // Exibindo o antes e depois da consulta
        console.log('Pessoas antes da inserção:', pessoasAntes);
        console.log('Pessoas após a inserção:', pessoasDepois);

        // Chamada do método de inserção (exemplo: inserindo uma nova pessoa)
        // Alterar CPF e Telefone, pois eles estao como UNIQUE 
        await inserirPessoa(2012, 'Pessoa PassaroX', '11999990056', 'Rua Passaroo', '00000-013', 100, 45, client);

        // Chamada do método de consulta
        await consultarPessoas(client);

    } catch (error) {
        // Se houver algum erro, a transação será revertida
        await client.query('ROLLBACK');
        console.error("Erro durante a operação, rollback realizado:", error);
    } finally {
        // Encerra a conexão com o banco de dados
        await client.end();
        console.log("Conexão encerrada.");
    }
}

// Executa a função principal
main();
