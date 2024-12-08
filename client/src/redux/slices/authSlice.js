import { createSlice } from "@reduxjs/toolkit"
import { api } from "../../api/api"

const initialState = {
    auth: false,
    user: null,
    loading: true,
    error: null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuth: (state, action) => {
            state.auth = action.payload
        },
        setUser: (state, action) => {
            state.user = action.payload;
            state.loading = false;
        },
        setError: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        setLoading: (state, action) => {
            state.loading = action.payload
        },
        clearUser: (state) => {
            state.user = null;
            state.loading = false;
        }
    }
})

export const { setUser, setAuth, setError, setLoading, clearUser } = authSlice.actions

export const fetchUser = () => async (dispatch) => {
    dispatch(setLoading(true));
    try {
        const res = await api.get("/users/current-user");
        console.log(res.data.data);
        dispatch(setUser(res.data.data))
        dispatch(setAuth(true))
        dispatch(setLoading(false))
        dispatch(setError(null))
    } catch (error) {
        console.log(error);
        dispatch(setError(error.message));
        dispatch(clearUser())
    }
}

export default authSlice.reducer;