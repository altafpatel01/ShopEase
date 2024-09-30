import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./Reducers/Reducers";
import ProductDetailReducer from "./Reducers/ProductDetailReducer";
import userReducer from "./Reducers/userSignupReducer";
import cartReducer from "./Reducers/cartReducer";
const store = configureStore({
  reducer: {
    getProducts: productsReducer,
    getProductDetails: ProductDetailReducer,

    user: userReducer,
    cart: cartReducer,
  },
});

export default store;
