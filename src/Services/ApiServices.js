import axios from 'axios'

const api = axios.create({
    baseURL: 'https://apionline.digitalagenepal.com/api'
})

export default api;