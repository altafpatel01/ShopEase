import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./Reducers/Reducers";
import ProductDetailReducer from "./Reducers/ProductDetailReducer";
import userReducer from "./Reducers/userSignupReducer";
import cartReducer from "./Reducers/cartReducer";
import forgotPassword from "./Reducers/authForgotPassword";
import shippingInfo from "./Reducers/shippingInfo";
import order from './Reducers/orderReducer'
import orderDetailsSlice from './Reducers/orderDetailReducer'
import reviewReducer from "./Reducers/reviewReducer";
const store = configureStore({
  reducer: {
    getProducts: productsReducer,
    getProductDetails: ProductDetailReducer,
    user: userReducer,
    cart: cartReducer,
    forgotPassword: forgotPassword,
    shipping:shippingInfo,
    orders:order,
    orderDetaile:orderDetailsSlice,
    reviews: reviewReducer,
  },
});

export default store;
