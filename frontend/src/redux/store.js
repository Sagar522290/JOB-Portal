import  {configureStore}  from '@reduxjs/toolkit';
import authReducer from './authSlice.js';

const store = configureStore({
  reducer: {
    // Add your reducers here
    auth: authReducer

  },
});
export default store;