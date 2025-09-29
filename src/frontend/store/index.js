// src/frontend/store/index.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import medicationReducer from './medicationSlice';

const store = configureStore({
  reducer: {
    user: userReducer,          // Handles authentication & user data
    medications: medicationReducer, // Handles medication state
  },
  devTools: import.meta.env.MODE !== 'production', // Enable Redux DevTools in dev
});

export default store;
