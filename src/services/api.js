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

api.interceptors.response.use(
    (response) => response,

    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                await axios.post(`${BASE_URL}/account/refresh`, {}, {
                    withCredentials: true
                });

                return api(originalRequest);
            } catch (e) {
                console.error("Session refresh failed")
                return Promise.reject(e);
            }
        }
        return Promise.reject(error);
    }
)


export default api;