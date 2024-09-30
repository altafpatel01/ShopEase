// import logo from './logo.svg';
import "./App.css";
import "./main.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import ProductDetails from "./components/ProductDetails.js";
import { Fragment } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUp from "./components/SignUp.js";
import Login from "./components/Login.js";
import Cart from "./components/cart.js";
import Product from "./components/Products.js";

function App() {

  return (
    <Fragment>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/products" element={<Product />} />
          <Route path="/" exact element={<Home />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />
          <Route path="/products/:keyword" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </Router>
    </Fragment>
  );
}

export default App;
