import knex from 'knex';
import path from 'path';

// O cliente está definindo qual o banco iremos usar

// O filename define aonde vai ficar armazendo o banco dentro do nosso projeto

// O path.resolve serve para não precisar identificar no caminho as barras

//O __dirname irá referenciar o caminho até a pasta database e em seguida criar arquivo 'database.sqlite'

// O useNullAsDefault o sqlite vai preencher nullo aos campos não preenchidos

//Migrations: Controla as versões do banco (Oque iramos fazer com o banco, alterar, deletar, inserir e etc...)

const db = knex({
    client: 'sqlite3',
    connection: {
        filename: path.resolve(__dirname, 'database.sqlite')
    },
    useNullAsDefault: true,
});

export default db;