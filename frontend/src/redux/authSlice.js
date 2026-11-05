import {createSlice} from '@reduxjs/toolkit';


const authSlice = createSlice({
    name: 'auth',
    initialState: {
        // isAuthenticated: false,
        // user: null,
        loading: false,
        user:null
    },
    reducers: {
        // action
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setUser:(state, action)=>{
            state.user = action.payload;
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
export const { setLoading, setUser } = authSlice.actions;
export default authSlice.reducer;