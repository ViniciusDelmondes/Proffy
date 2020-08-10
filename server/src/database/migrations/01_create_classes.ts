import Knex from 'knex';

// No método UP vamos informar quais as alterações haverá no banco de dados (Criar, alterar e etc)

// O primary irá criar id específico para cada registro

// Criando  tabela chamada users usando knex.schema.createTable('users'....
export async function up(knex: Knex){
    return knex.schema.createTable('classes', table => {
        table.increments('id').primary();
        table.string('subject').notNullable();
        table.decimal('cost').notNullable();

        // Criando relacionamento  (Chave estrangeira)  
        // Este aqui foi criado para relacionar o usuário com a aula que ele vai dar

        //O onDelete serve para dizer o que vai acontecer se um professor ser excluido da plataforma
        //O cascade vai deletar todas as aulas que estão relacionadas com ele

        // O onUpdate serve para informar o que vai acontecer se o id do usuario
        // por ventura ser alterado
        // O cascade já altera automaticamente os relacionamentos
        table.integer('user_id')
            .notNullable()
            .references('id')
            .inTable('users')
            .onUpdate('CASCADE')
            .onDelete('CASCADE')
    });
}

// O down é para voltar alguma ação acima

export async function down(knex: Knex) {
    return knex.schema.dropTable('classes');
}