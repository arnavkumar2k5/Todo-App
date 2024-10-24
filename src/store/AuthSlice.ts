import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
    user: any | null;
    loading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    user: null,
    loading: false,
    error: null,
}

export const AuthSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<any>) => {
            state.user = action.payload;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
        setClear: (state) => {
            state.user = null;
        },
    },
});

export const {setUser, setLoading, setError, setClear} = AuthSlice.actions;

export default AuthSlice.reducer;