import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './Reducers/Reducers';  // Ensure this path is correct

const store = configureStore({
  reducer: {
    getProducts: productsReducer,
  },
});

export default store;
