import axios from 'axios';

const axiosClient = axios.create({
    baseUrl: 'http://127.0.0.1:8000/api',
})    

export default axiosClient;