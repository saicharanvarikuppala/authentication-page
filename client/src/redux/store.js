
import { configureStore } from '@reduxjs/toolkit';
import userSlice from '../pages/Profile/UserSlice';

const store = configureStore({
  reducer: {
    user: userSlice, // Add your reducers here
  },
});

export default store;
