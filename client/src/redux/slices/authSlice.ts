import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "../store"; 
import { api } from "../../api/api";

interface User {
    id: string;
    username: string;
    email: string;
}

interface AuthState {
    auth: boolean;
    user: User | null;
    loading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    auth: false,
    user: null,
    loading: true,
    error: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuth: (state, action: PayloadAction<boolean>) => {
            state.auth = action.payload;
        },
        setUser: (state, action: PayloadAction<User | null>) => {
            state.user = action.payload;
            state.loading = false;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
            state.loading = false;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        clearUser: (state) => {
            state.user = null;
            state.loading = false;
        },
    },
});

export const { setUser, setAuth, setError, setLoading, clearUser } = authSlice.actions;

export const fetchUser = () => async (dispatch: AppDispatch): Promise<void> => {
    dispatch(setLoading(true));
    try {
        const res = await api.get<{ data: User }>("/users/current-user");
        console.log(res.data.data);
        dispatch(setUser(res.data.data));
        dispatch(setAuth(true));
        dispatch(setLoading(false));
        dispatch(setError(null));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any | unknown) {
        console.error(error);
        dispatch(setError(error.message || "An error occurred"));
        dispatch(clearUser());
    }
};

export default authSlice.reducer;
