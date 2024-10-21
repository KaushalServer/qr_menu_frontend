import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null // empty array or null
    },
    reducers: {
        login: (state, action) => {
            state.user = action.payload; // Set the user to the payload
        },
        logout: (state) => {
            state.user = null; // Reset the user to null
        }
    }
});

export const { login, logout } = userSlice.actions;
export const selectLoggedInUser  = (state) => state.user; // loggedin user
export default userSlice.reducer;