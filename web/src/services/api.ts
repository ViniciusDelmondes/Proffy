import axios from 'axios';

//Configuração básica no endereço do nosso servidor
const api = axios.create({
    baseURL: 'http://localhost:3333'
})

export default api;