// Redux acts as a "Single Source of Truth," ensuring that the 
// logged-in user's status and data are consistent across all components.

import { createSlice, configureStore } from "@reduxjs/toolkit";

// Define the authentication slice to manage login state
const authSlice = createSlice({
  name: "auth",
  // Initial state: No user ID and user is logged out by default
  initialState: { user: "", isLoggedIn: false },
  reducers: {
    // Action to set isLoggedIn to true upon successful sign-in
    login(state) {
      state.isLoggedIn = true;
    },
    // Action to set isLoggedIn to false and clear session
    logout(state) {
      state.isLoggedIn = false;
    },
  },
});

// Export actions for use in Signin and Navbar components
export const authActions = authSlice.actions;

// Configure and export the global store
export const store = configureStore({
  reducer: authSlice.reducer,
});