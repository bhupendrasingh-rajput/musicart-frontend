import { createSlice } from "@reduxjs/toolkit";
import { register, login, addFeedback } from "../Apis/userApi";

const initialState = {
    isAuthenticated: false,
    name: null,
    token: null,
};

const updateLocalStorage = (state) => {
    if (state.name) {
        localStorage.setItem("name", state.name);
    }

    if (state.isAuthenticated) {
        localStorage.setItem("isAuthenticated", state.isAuthenticated);
    }

    if (state.token) {
        localStorage.setItem("token", state.token);
    }
}


const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout(state) {
            state.isAuthenticated = false;
            state.name = null;
            state.token = null;
            localStorage.clear();
        }
    },
    extraReducers: (builder) => {
        builder.addCase(register.fulfilled, (state, action) => {
            if (action.payload) {
                state.isAuthenticated = true;
                state.name = action.payload.name;
                state.token = action.payload.token;
                updateLocalStorage(state);
            }
        })
        builder.addCase(login.fulfilled, (state, action) => {
            if (action.payload) {
                state.isAuthenticated = true;
                state.name = action.payload.name;
                state.token = action.payload.token;
                updateLocalStorage(state);
            }
        })
        builder.addCase(addFeedback.fulfilled, (state, action) => {
            if (action.payload) {
                console.log(action.payload.message);
            }
        });
    },

});

export const { logout } = userSlice.actions;

export default userSlice.reducer;