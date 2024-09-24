// import logo from './logo.svg';
import "./App.css";
import "./main.css";
import Navbar from "./components/Navbar";
import Home from './components/Home'
import About from './components/About'
import { Fragment } from "react";
import { HashRouter as Router, Route, Routes } from 'react-router-dom';function App() {
  return (
    <Fragment>
        <Router>
          <Navbar/>
            <Routes>
                <Route path="/" exact element={<Home/>} />
                <Route path="/about" element={<About/>} />
              
            </Routes>
        </Router>
    
    </Fragment>
  );
}

export default App;
