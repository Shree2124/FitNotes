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
        console.log("Error Intercepted:", error.response?.status);
        const originalReq = error.config;

        if (error.response?.status === 401 && !originalReq._retry) {
            console.log("Attempting Token Refresh...");
            originalReq._retry = true;

            try {
                const refreshToken = getCookieToken("refreshToken");
                console.log("Refresh Token:", refreshToken);
                console.log(document.cookie);
                

                if (!refreshToken) {
                    console.log("No Refresh Token Found!");
                    store.dispatch(clearUser());
                    store.dispatch(setAuth(false));
                    return Promise.reject(error);
                }

                const { data } = await api.post("/users/refresh-token", { refreshToken });
                
                
                console.log("New Access Token:", data.accessToken);

                document.cookie = `accessToken=${data.accessToken}; path=/; secure; SameSite=None;`;
                originalReq.headers.Authorization = `Bearer ${data.accessToken}`;

                return api(originalReq); // Retry the original request
            } catch (refreshError) {
                console.log("Token Refresh Failed:", refreshError);
                store.dispatch(clearUser());
                store.dispatch(setAuth(false));
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);


export { api };
