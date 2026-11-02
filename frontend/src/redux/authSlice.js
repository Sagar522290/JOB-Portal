import {createSlice} from '@reduxjs/toolkit';


const authSlice = createSlice({
    name: 'auth',
    initialState: {
        // isAuthenticated: false,
        // user: null,
        loading: false,
    },
    reducers: {
        // action
        setLoading: (state, action) => {
            state.loading = action.payload;
        }
        // login: (state, action) => {
        //     state.loggedIn = true;
        //     state.user = action.payload;
        // },
        // logout: (state) => {
        //     state.loggedIn = false;
        //     state.user = null;
        // }
    },
});
export const { setLoading } = authSlice.actions;
export default authSlice.reducer;