// import logo from './logo.svg';
import "./App.css";
import "./main.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import ProductDetails from "./components/ProductDetails.js";
import { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import SignUp from "./components/SignUp.js";
// import Login from "./components/Login.js";
import Cart from "./components/cart.js";
import Product from "./components/Products.js";
import AuthForm from "./components/AuthForm.js";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "./Reducers/userSignupReducer.js";
import Profile from "./components/Profile.js";
import ForgotPassword from "./components/forgotPassword.js";
import ResetPassword from "./components/ResetPassword.js";
import { initializeCart } from "./Reducers/cartReducer.js";
import Loader from "./components/Loading.js";
import Payment from './components/Payment.js'
// import HorizontalStepper from "./components/HorizontalStepper.js";
import ShippingPage from "./components/Shipping.js";
import { initializeShippigInfo } from "./Reducers/shippingInfo.js";
import ConfirmOrder from "./components/ConfirmOrder.js";
import Orders from "./components/orders.js";
import OrderDetails from "./components/OrderDetails.js";
function App() {
  const dispatch = useDispatch();
  const { userInfo, isAuthenticated, loading } = useSelector(
    (state) => state.user
  );
  const id = (isAuthenticated?userInfo._id:0)
  useEffect(() => {
    dispatch(loadUser());

    // dispatch(initializeCart(userInfo._id))
    if (isAuthenticated) {
      dispatch(initializeCart(id));
      dispatch(initializeShippigInfo(id))
    }
  }, [dispatch, isAuthenticated,id]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Router>
          <Navbar />
          <Routes>
            {isAuthenticated && (
              <Route path="/account" element={<Profile user={userInfo} />} />
            )}
            <Route path="/products" element={<Product />} />
            {isAuthenticated && ( <Route path="/shipping" element={<ShippingPage />} />)}
            {isAuthenticated && ( <Route path="/order/confirm" element={<ConfirmOrder />} />)}
            <Route path="/" exact element={<Home />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/about" element={<About />} />
            <Route path="/products/:keyword" element={<Product />} />
            {isAuthenticated && <Route path="/cart" element={<Cart />} />}
            <Route path="/auth" element={<AuthForm />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            {isAuthenticated && <Route path="/proceed/payment" element={<Payment />} />}
            {isAuthenticated && <Route path="/orders" element={<Orders/>} />}
            <Route path="/order/:orderId" element={<OrderDetails />} />
          </Routes>
        </Router>
      )}
    </Fragment>
  );
}

export default App;
