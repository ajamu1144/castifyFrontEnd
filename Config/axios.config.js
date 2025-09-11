import axiosInstance from 'axios';
const axios = axiosInstance.create({
    baseURL: `${import.meta.env.VITE_API_URL}`
});
export default axios;