import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import logo from "../logo.svg";
import { FaSearch, FaShoppingCart, FaUser } from "react-icons/fa"; // Import the search icon
import { Link } from "react-router-dom";
// import { fetchProducts } from '../Reducers/Reducers';
// import { fetchProducts } from "../Reducers/Reducers";
// import { useHistory } from 'react-router-dom';

// import { fetchSearchProducts } from "../Reducers/searchProduct";
import { useSelector } from "react-redux";
// import e from 'express';
const Navbar = () => {
  // const history = useHistory();
  const { userInfo, isAuthenticated } = useSelector((state) => state.user);
  const { items } = useSelector((state) => state.cart);
  const navigate = useNavigate();

  // const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const handleSearchQuery = (e) => {
    setSearchQuery(e.target.value);
  };
  const handleSearch = (e) => {
    // e.preventDefault();
    // Handle search logic here
    if (searchQuery.trim()) {
      navigate(`/products/${searchQuery}`);
    } else {
      navigate(`/products`);
      // dispatch(fetchSearchProducts(trimsearchQuery));
      // dispatch(fetchProducts({trimsearchQuery}))

      // Place your search logic here
    }
  };
  return (
    <div className="bg-soft-pastel-blue w-7xl z-50">
      <div className=" flex-grow mx-auto px-4  sm:px-6 lg:px-8">
        <div className="flex flex-row justify-evenly h-16 items-center">
          <div className="flex items-center">
            <div className="shrink-0">
              <img className="h-16 w-16 " src={logo} alt="ShopEase Logo" />
            </div>
            <div className="hidden md:flex  ">
              <Link
                to="/"
                className="text-white md:ml-4 hover:bg-white hover:text-gray-800 transition-all duration-400 ease-in-out px-3 py-1 rounded-md text-sm font-medium"
              >
                Home
              </Link>
              <Link
                to="/products"
                className="text-white hover:bg-white hover:text-gray-800 transition-all duration-400 ease-in-out px-3 py-1 rounded-md text-sm font-medium"
              >
                Products
              </Link>
              <Link
                to="/about"
                className="text-white hover:bg-white hover:text-gray-800 transition-all duration-400 ease-in-out px-3 py-1 rounded-md text-sm font-medium"
              >
                About
              </Link>
              <Link
                to="/contact"
                className="text-white hover:bg-white hover:text-gray-800 transition-all duration-400 ease-in-out px-3 py-1 rounded-md text-sm font-medium"
              >
                Contact
              </Link>
            </div>
          </div>

          {/* Centered Search Bar */}
          <div className="flex-grow px-4   flex justify-center">
            <form onSubmit={handleSearch} className="flex w-full max-w-[600px]">
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchQuery}
                placeholder="Search..."
                className="flex-1 placeholder:text-white text-white bg-transparent border-b border-white focus:outline-none "
              />
              <button
                type="submit"
                className="bg-transparent text-white  rounded-r-md  flex items-center"
              >
                <FaSearch className="h-3 w-3 mobile:h-3 mobile:w-3" />
              </button>
            </form>
          </div>

          {/* Sign In and Sign Up Links */}
          {!isAuthenticated ? (
            <div className="hidden md:flex ml-2 space-x-0.5 relative">
              <Link
                to="/auth"
                className="text-white hover:bg-white hover:text-gray-800 transition-all duration-400 ease-in-out px-1 py-1 rounded-md text-sm font-medium"
              >
                Login/Signup
              </Link>
              {/* <Link
                to="/signup"
                className="text-white hover:bg-white hover:text-gray-800 transition-all duration-400 ease-in-out px-1 py-1 rounded-md text-sm font-medium"
              >
                SignUp
              </Link> */}
            </div>
          ) : (
            <>
              <div className="flex gap-5">
                <button
                  onClick={() => navigate("/cart")}
                  className="text-white mobile:fixed z-50  mobile:bottom-4 mobile:right-4  "
                >
                  <div className="relative">
                    <span className=" absolute -top-1 -right-2 text-sm rounded-full bg-soft-pastel-blue mobile:bg-  w-4 h-4 text-center flex items-center justify-center ">
                      {items.length}
                    </span>
                    <FaShoppingCart className="h-6 w-6 mobile:h-10 mobile:w-10 text-white mobile:text-orange-600  " />
                  </div>
                </button>
                {!userInfo ? (
                  <button className="bg-transparent text-white  rounded-r-md  flex items-center">
                    <FaUser className="h-5 w-5 mobile:h-5 mobile:w-5" />
                  </button>
                ) : (
                  <div onClick={()=>{navigate('/account')}} className="bg-transparent w-6 h-6 text-white  rounded-full  flex items-center">
                    {/* <FaUser className="h-5 w-5 mobile:h-5 mobile:w-5" /> */}
                    <img className="rounded-full" src={userInfo.avatar.url} alt="profile" />
                  </div>
                )}
              </div>
            </>
          )}

          <div className="-mr-2 flex md:hidden">
            <button onClick={toggleMenu} className=" p-2 rounded-md text-white">
              {isOpen ? (
                <svg
                  className="h-6 w-6"
                  fill="#ffffff"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  fill="#ffffff"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden  bg-white w-1/2 h-dvh  ${} absolute transition-all duration-500 ease-linear top-16 right-0 z-40 ">
          <Link
            to="/"
            onClick={toggleMenu}
            className="block text-charcoal-gray border-b-black border-b hover:bg-gray-600 px-4 py-2 text-sm"
          >
            Home
          </Link>
          <Link
            to="/products"
            onClick={toggleMenu}
            className="block text-charcoal-gray border-b-black border-b hover:bg-gray-600 px-4 py-2 text-sm"
          >
            Products
          </Link>
          <Link
            to="/about"
            onClick={toggleMenu}
            className="block text-charcoal-gray border-b-black border-b hover:bg-gray-600 px-4 py-2 text-sm"
          >
            About
          </Link>
          <Link
            to="/contact"
            onClick={toggleMenu}
            className="block text-charcoal-gray border-b-black border-b hover:bg-gray-600 px-4 py-2 text-sm"
          >
            Contact
          </Link>
          {!isAuthenticated && (
            <Link
              to="/auth"
              onClick={toggleMenu}
              className="block text-charcoal-gray border-b-black border-b hover:bg-gray-600 px-4 py-2 text-sm"
            >
              Login/Signup
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
