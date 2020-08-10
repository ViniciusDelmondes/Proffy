import axios from 'axios'

//Conexão com o backend

const api = axios.create({
    baseURL: 'http://192.168.15.10:3333'
})

export default api;