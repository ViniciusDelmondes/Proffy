// Vai armazenar a informação se o usuário entrou em contato com o professor

import Knex from 'knex';

// No método UP vamos informar quais as alterações haverá no banco de dados (Criar, alterar e etc)

// O primary irá criar id específico para cada registro

// Criando  tabela chamada class_schedule usando knex.schema.createTable('class_schedule'....
export async function up(knex: Knex){
    return knex.schema.createTable('connections', table => {
        table.increments('id').primary();

        // Criando relacionamento  (Chave estrangeira)  
        // Este aqui foi criado para relacionar a aula do professor com o aluno

        table.integer('user_id')
            .notNullable()
            .references('id')
            .inTable('users')
            .onUpdate('CASCADE')
            .onDelete('CASCADE')

        // O timestamp irá pegar o horário que foi realizado essa conexão
        // O defaultTo CURRENT_TIMESTAMP irá registrar o horário
        table.timestamp('created_at')
            .defaultTo(knex.raw('CURRENT_TIMESTAMP'))
            .notNullable();
    });
}

// O down é para voltar alguma ação acima

export async function down(knex: Knex) {
    return knex.schema.dropTable('connections');
}