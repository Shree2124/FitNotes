import axios from "axios"
import { clearUser, setAuth } from "../redux/slices/authSlice";
import { store } from "../redux/store";

const api = axios.create(
    {
        baseURL: "http://localhost:8000/api/v1",
        withCredentials: true,
    }
)

const getCookieToken = (tokenName) => {
    const token = document.cookie.split('; ').find(row => row.startsWith(`${tokenName}=`))
    console.log(tokenName, token);
    return token ? token.split("=")[1] : null;
}

api.interceptors.request.use(
    (config) => {
        const accessToken = getCookieToken('accessToken');
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config
    },
    (error) => Promise.reject(error)
);

api.interceptors.response.use(
    (res) => res,
    async (error) => {
        const originalReq = error.config;
        if (error.response?.status === 401 && !originalReq._retry) {
            originalReq._retry = true;
            const refreshToken = getCookieToken('refreshToken');
            console.log(refreshToken);
            try {
                const refreshRes = await api.post("/users/refresh-token", { refreshToken })
                document.cookie = `accessToken=${refreshRes.data.accessToken}; secure; SameSite=None`
                originalReq.headers.Authorization = `Bearer ${refreshRes.data.accessToken}`;
                return api(originalReq);
            } catch (refreshError) {
                store.dispatch(clearUser());
                store.dispatch(setAuth(false));
                return Promise.reject(refreshError);
            }
        }
    }
)

export { api }