import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
    isUser: boolean;
    isloading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    isUser: false,
    isloading: false,
    error: null
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setIsLoading: (state, action: PayloadAction<boolean>) => {
            state.isloading = action.payload;
        },
        setIsUser: (state, action: PayloadAction<boolean>) => {
            state.isUser = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
    }
});

export const { setIsLoading, setIsUser, setError } = authSlice.actions;
export default authSlice.reducer;