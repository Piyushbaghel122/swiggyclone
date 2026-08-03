/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
    user: any;
    isloading: boolean;
    iserror: any;
}

const initialState: AuthState = {
    user: false,
    isloading: false,
    iserror: null    
};

const AUTHSlice = createSlice({
    name: "auth", 
    initialState,
    reducers: {
        setUser: (state: AuthState, action: PayloadAction<any>) => {
            state.user = action.payload;
        },
        setIsLoading: (state: AuthState, action: PayloadAction<boolean>) => {
            state.isloading = action.payload;
        },
        setError: (state: AuthState, action: PayloadAction<any>) => {
            state.iserror = action.payload;
        }
    }
});

export const { setUser, setIsLoading, setError } = AUTHSlice.actions;
export default AUTHSlice.reducer;
