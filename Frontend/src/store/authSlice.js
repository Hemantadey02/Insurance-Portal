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
            state.error = null;
        },

        // Register Reducer
        register: (state, action) => {
            state.status = 'active';
            state.user = action.payload;
            state.error = null;
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