import express from 'express'
import cors from 'cors'
import routes from './routes';

const app = express();

//Serve para que qualquer outro endereço consiga usar o endereço de nossa api (Backend)
app.use(cors());
//O express por padrão não compreende o formato JSON, utilizando o código abaixo irá fazer com que o nosso
// Request body seja convertido para JSON.
app.use(express.json());
// R
app.use(routes);

//Rotas [http://localhost:3333/users,http://localhost:3333/contacts etc]

//Métodos HTTPS
//GET: Utilizado para buscar ou listar alguma informação.
//POST: Utilizado para criar uma nova informação no back-end.
//PUT: Utilizado para atualizar uma informação existente.
//DELETE: Utilizado para deletar uma informaçõa existente.

//Request: Cabeçalho e corpo. Ele guardará os dados que estão sendo enviados ao Back-end pelo Front-end (Requisição).
//Response: É a resposta que a minha API Rest(Back-end) irá devolver ao requisitante.

// Parâmetros
// Corpo {Request Body}: Dados para criação ou atualização de um registro.
//Route Params: Identificar qual recurso eu quero atualizar ou deletar.
//Query Params: Paginação, filtros, e ordenações.



// O Listen irá fazer com que a nossa aplicação possa ouvir requisições HTTP.
// É necessário também informar a porta do endereço (localhost:33333)
app.listen(3333);

