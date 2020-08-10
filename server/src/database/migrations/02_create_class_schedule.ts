import Knex from 'knex';

// No método UP vamos informar quais as alterações haverá no banco de dados (Criar, alterar e etc)

// O primary irá criar id específico para cada registro

// Criando  tabela chamada class_schedule usando knex.schema.createTable('class_schedule'....
export async function up(knex: Knex){
    return knex.schema.createTable('class_schedule', table => {
        table.increments('id').primary();
        // Dia da semana da aula do professor
        table.integer('week_day').notNullable();
        // Que horas a aula vai iniciar
        table.integer('from').notNullable();
        // Até que horas eu dou essa aula
        table.integer('to').notNullable();

        // Criando relacionamento  (Chave estrangeira)  
        // Este aqui foi criado para relacionar a aula do professor com as informações de dia, hora e termino

        table.integer('class_id')
            .notNullable()
            .references('id')
            .inTable('classes')
            .onUpdate('CASCADE')
            .onDelete('CASCADE')
    });
}

// O down é para voltar alguma ação acima

export async function down(knex: Knex) {
    return knex.schema.dropTable('class_schedule');
}