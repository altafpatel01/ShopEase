import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './Reducers/Reducers';  // Ensure this path is correct
import ProductDetailReducer from './Reducers/ProductDetailReducer';
import searchProductSlice from './Reducers/searchProduct';
const store = configureStore({
  reducer: {
    getProducts: productsReducer,
    getProductDetails:ProductDetailReducer,
    getSearchProducts:searchProductSlice


  },
});

export default store;
