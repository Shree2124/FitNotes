import axios from "axios";
import { clearUser, setAuth } from "../redux/slices/authSlice";
import { store } from "../redux/store";

// Create axios instance
const api = axios.create({
    baseURL: "http://localhost:8000/api/v1",
    withCredentials: true,
});

const getCookieToken = (tokenName) => {
    const token = document.cookie.split('; ').find(row => row.startsWith(`${tokenName}=`));
    return token ? token.split("=")[1] : null;
};

let isRefreshing = false;
let failedQueue = [];

api.interceptors.request.use(
    (config) => {
        const accessToken = getCookieToken("accessToken");
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalReq = error.config;

        if (error.response?.status === 401 && !originalReq._retry) {
            originalReq._retry = true;

            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                }).then((accessToken) => {
                    originalReq.headers.Authorization = `Bearer ${accessToken}`;
                    return axios(originalReq);
                }).catch((err) => Promise.reject(err));
            }

            isRefreshing = true;
            const refreshToken = getCookieToken("refreshToken");

            if (!refreshToken) {
                store.dispatch(clearUser());
                store.dispatch(setAuth(false));
                return Promise.reject(error);
            }

            try {
                const refreshRes = await api.post("/users/refresh-token", { refreshToken });


                document.cookie = `accessToken=${refreshRes.data.accessToken}; secure; SameSite=None; HttpOnly`;


                axios.defaults.headers['Authorization'] = `Bearer ${refreshRes.data.accessToken}`;

                failedQueue.forEach(({ resolve }) => resolve(refreshRes.data.accessToken));
                failedQueue = [];

                return api(originalReq);

            } catch (refreshError) {
                store.dispatch(clearUser());
                store.dispatch(setAuth(false));
                failedQueue.forEach(({ reject }) => reject(refreshError));
                failedQueue = [];

                return Promise.reject(refreshError);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    }
);

export { api };
