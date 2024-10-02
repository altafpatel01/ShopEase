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
import Profile from './components/Profile.js'
import ForgotPassword from "./components/forgotPassword.js";
import ResetPassword from "./components/ResetPassword.js";
function App() {
const dispatch = useDispatch()
const { userInfo, isAuthenticated,loading} = useSelector(state=>state.user)
useEffect(() => {
  
dispatch(loadUser())
 
  
}, [dispatch,isAuthenticated])

  return (
    <Fragment>
      <Router>
        <Navbar />
        <Routes>
         {!loading&&isAuthenticated && <Route path="/account" element={<Profile user={userInfo}/>}/>}
          <Route path="/products" element={<Product />} />
          <Route path="/" exact element={<Home />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          {/* <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} /> */}
          <Route path="/about" element={<About />} />
          <Route path="/products/:keyword" element={<Product />} />
          { isAuthenticated&&<Route path="/cart" element={<Cart />} />}
           <Route path="/auth" element={<AuthForm />} />
           <Route path="/forgot-password" element={<ForgotPassword />} />
           <Route path="/reset-password/:token" element={<ResetPassword />} />

           {/* <Route path="*" element={<Home/>} /> */}

        </Routes>
      </Router>
    </Fragment>
  );
}

export default App;
