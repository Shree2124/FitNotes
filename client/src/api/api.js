import axios from "axios";
import { clearUser, setAuth } from "../redux/slices/authSlice";
import { store } from "../redux/store";

const api = axios.create({
    baseURL: "http://localhost:8000/api/v1",
    withCredentials: true,
});

const getCookieToken = (tokenName) => {
    const token = document.cookie.split('; ').find(row => row.startsWith(`${tokenName}=`));
    return token ? token.split("=")[1] : null;
};

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

let isRefreshing = false;
let refreshSubscribers = [];

function onRefreshed(newAccessToken) {
    refreshSubscribers.forEach((callback) => callback(newAccessToken));
    refreshSubscribers = [];
}

function addRefreshSubscriber(callback) {
    refreshSubscribers.push(callback);
}

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            if (!isRefreshing) {
                isRefreshing = true;
                const refreshToken = getCookieToken('refreshToken');
                console.log(refreshToken);
                if (!refreshToken) {
                    store.dispatch(clearUser());
                    store.dispatch(setAuth(false));
                    return Promise.reject(new Error('Refresh token is missing.'));
                }
                try {
                    const refreshResponse = await api.post('/users/refresh-token', { refreshToken });
                    const newAccessToken = refreshResponse?.data?.accessToken;
                    document.cookie = `accessToken=${newAccessToken}; path=/; secure; SameSite=None`;
                    api.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;
                    onRefreshed(newAccessToken);
                } catch (refreshError) {
                    store.dispatch(clearUser());
                    store.dispatch(setAuth(false));
                    return Promise.reject(refreshError);
                } finally {
                    isRefreshing = false;
                }
            }
            return new Promise((resolve) => {
                addRefreshSubscriber((newAccessToken) => {
                    originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                    resolve(api(originalRequest));
                });
            });
        }

        return Promise.reject(error);
    }
);




export { api };
