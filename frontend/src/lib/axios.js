import axios from 'axios'
export const axioInstance = axios.create({
    baseURL:import.meta.env.MODE==='DEVELOPMENT'?"http://localhost:3000/":"/api",
    withCredentials:true,
})