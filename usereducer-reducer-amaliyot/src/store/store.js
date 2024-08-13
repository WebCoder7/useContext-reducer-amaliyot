import { configureStore } from '@reduxjs/toolkit';
import storeReducer from './slice';

const store = configureStore({
  reducer: {
    store: storeReducer,
  },
});

export default store;
