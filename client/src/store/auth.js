import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
    isAuthenticated: false,
    currentUser: [],
    userDetails: [],
    isUserAdmin: false,
};
const authSlice = createSlice({
    name: 'authentication',
    initialState: initialAuthState,
    reducers: {
        login(state) {
            state.isAuthenticated = true;
        },
        logout(state) {
            state.isAuthenticated = false;
            state.isUserAdmin = false;
        },
        setUser(state, action) {
            state.currentUser = action.payload;
        },
        setUserDetails(state, action){
            state.userDetails = action.payload;
            // console.log("store",action.payload)
        },
        setIsUserAdmin(state){
            state.isUserAdmin = true;
        }
    },
});
export const authActions = authSlice.actions;

export default authSlice.reducer;