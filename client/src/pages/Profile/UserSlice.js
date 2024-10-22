import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userDetails: null,
  },
  reducers: {
    setUserDetails(state, action) {
      state.userDetails = action.payload; // Update the userDetails with the payload
    },
    clearUserDetails(state) {
      state.userDetails = null; // Clear the userDetails when needed (e.g., during logout)
    },
  },
});

// Export actions
export const { setUserDetails, clearUserDetails } = userSlice.actions;

// Export the reducer
export default userSlice.reducer;

// Selectors
export const userDetails = (state) => state.user.userDetails;
