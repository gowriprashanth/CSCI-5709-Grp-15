/**
 * @Author Darshit Dhameliya
 */
import axios from 'axios';

/**
 * It modifies deafult axios configuration. Added request and response interceptor to add JWT token in header of each API call.
 */
const axiosHelper = axios.create({
    baseURL: process.env.REACT_APP_API_URL || "http://localhost:3001",
});

axiosHelper.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosHelper.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response.status === 401) {
            localStorage.removeItem("token");
            window.location.href = "/sign-in";
        }
        return Promise.reject(error);
    }
);

export default axiosHelper;