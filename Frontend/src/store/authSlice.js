import { createSlice } from '@reduxjs/toolkit';

// Initial state
const initialState = {
    user: null,
    status: 'idle',
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        //Login Reducer
        login: (state, action) => {
            state.status = 'active';
            state.user = action.payload;
        },

        // Register Reducer
        register: (state, action) => {
            state.status = 'active';
            state.user = action.payload;
        },

        // Logout Reducer
        logout: (state) => {
            sessionStorage.clear();
            state.user = null;
            state.status = 'idle';
            state.error = null;
        },
    },
});

export const { login, register, logout } = authSlice.actions;

export default authSlice.reducer;
