// import logo from './logo.svg';
import "./App.css";
import "./main.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import ProductDetails from "./components/ProductDetails.js";
import { Fragment } from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import SearchResults from './components/SearchResults'
function App() {
  return (
    <Fragment>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" exact element={<Home/>} />

          <Route path="/about" element={<About />} />
          <Route path="/search/results" element={<SearchResults />} />
        </Routes>
        <Routes>
          <Route path="/product/:id" element={<ProductDetails />} />
        </Routes>
      </Router>
    </Fragment>
  );
}

export default App;
