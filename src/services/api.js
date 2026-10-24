import axios from 'axios';

export const BASE_URL = import.meta.env.VITE_BASE_URL;

const api = axios.create({
    baseURL: BASE_URL,
    withCredentials: true
});

api.interceptors.request.use((config) => {
    const match = document.cookie.match(/(^| )csrfToken=([^;]+)/)
    const csrf = match? decodeURIComponent(match[2]) : null

    if (csrf) {
        config.headers['x-csrf-token'] = csrf
    }

    // console.log(`Csrf: ${csrf}`)
    return config;
})


export default api;