import axios from 'axios'

export const axiosInstanceUser = axios.create({
    baseURL : 'http://localhost:5000/api/user'
})