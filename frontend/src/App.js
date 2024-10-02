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
function App() {
const dispatch = useDispatch()
const { userInfo} = useSelector(state=>state.user)
useEffect(() => {
  
dispatch(loadUser())
 
  
}, [dispatch])

  return (
    <Fragment>
      <Router>
        <Navbar />
        <Routes>
           <Route path="/account" element={<Profile user={userInfo}/>}/>
          <Route path="/products" element={<Product />} />
          <Route path="/" exact element={<Home />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          {/* <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} /> */}
          <Route path="/about" element={<About />} />
          <Route path="/products/:keyword" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
           <Route path="/auth" element={<AuthForm />} />
        </Routes>
      </Router>
    </Fragment>
  );
}

export default App;
