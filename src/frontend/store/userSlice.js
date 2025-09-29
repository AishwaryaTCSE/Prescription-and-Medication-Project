// ./frontend/store/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: true,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Set auth state based on Firebase onAuthStateChanged
    setAuthState: (state, action) => {
      const user = action.payload?.user || null;
      state.user = user
        ? { uid: user.uid, email: user.email, displayName: user.displayName || '' }
        : null;
      state.isAuthenticated = !!user;
      state.loading = false;
    },
    // Optional reducer to set loading true while checking
    startAuthCheck: (state) => {
      state.loading = true;
    },
    // Local logout state reset (Firebase signOut is called outside)
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
    },
  },
});

export const { setAuthState, startAuthCheck, logout } = userSlice.actions;
export default userSlice.reducer;
