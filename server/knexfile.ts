import path from 'path';

// O caminho abaixo estamos ligando ao arquivo databa.sqlite criado dentro da pasta dabase

// O caminho directory está referenciado a pasta migrations dentro da pasta database

module.exports = {
    client: "sqlite3",
    connection: {
        filename: path.resolve(__dirname, 'src', 'database', 'database.sqlite')
    },
    migrations: {
        directory: path.resolve(__dirname, 'src', 'database', 'migrations')
    },
    useNullAsDefault: true,
};