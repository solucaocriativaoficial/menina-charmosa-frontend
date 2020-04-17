import axios from 'axios';

const api = axios.create({
    baseURL: "https://menina-charmosa.herokuapp.com"
})
export default api;