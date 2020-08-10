import Knex from 'knex';

// No método UP vamos informar quais as alterações haverá no banco de dados (Criar, alterar e etc)

// O primary irá criar id específico para cada registro

// Criando  tabela chamada users usando knex.schema.createTable('users'....
export async function up(knex: Knex){
    return knex.schema.createTable('users', table => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.string('avatar').notNullable();
        table.string('whatsapp').notNullable();
        table.string('bio').notNullable();
    });
}

// O down é para voltar alguma ação acima

export async function down(knex: Knex) {
    return knex.schema.dropTable('users');
}