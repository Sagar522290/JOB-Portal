// import {createSlice } from "@reduxjs/toolkit";

// const jobSlice = createSlice({
//     name:"job",
//     initialState:{
//         allJobs:[]
//     },
//     reducers:{
//         //  actions
//         setAllJobs:(state, action)=>{
//             state.allJobs= action.payload
//         }
//     }
// })

// export const {setAllJobs}=jobSlice.actions;
// export default jobSlice.reducer

import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
    name: "job",

    initialState: {
        allJobs: [],
        singleJob: null,
        loading: false
    },

    reducers: {
        setAllJobs: (state, action) => {
            state.allJobs = Array.isArray(action.payload) ? action.payload : [];
        },
        setSingleJob: (state, action) => {
            state.singleJob = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        }
    }
});

// Export actions
export const { setAllJobs, setSingleJob, setLoading } = jobSlice.actions;

// Export reducer
export default jobSlice.reducer;