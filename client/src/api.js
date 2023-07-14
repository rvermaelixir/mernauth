import axios from 'axios'

const api = axios.create({
    baseURL: process.env.apiHost || "http://localhost:8001/api/v1/"
})

export default api