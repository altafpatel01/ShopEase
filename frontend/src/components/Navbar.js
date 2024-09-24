import React, { useState } from 'react';
import logo from '../logo.svg';
import { FaSearch } from 'react-icons/fa'; // Import the search icon
import { Link } from 'react-router-dom';
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Handle search logic here
    if (searchQuery === null || searchQuery.trim() === '') {
        return; // Do nothing if searchQuery is null or empty
    } else {
        console.log(searchQuery);
        // Place your search logic here
    }
};
  return (
    <div className="bg-soft-pastel-blue  z-50">
      <div className="w-dvw flex-grow mx-auto px-4  sm:px-6 lg:px-8">
        <div className="flex flex-row justify-evenly h-16 items-center">
          <div className="flex items-center">
            <div className="shrink-0">
              <img className="h-16 w-16 " src={logo} alt="ShopEase Logo" />
            </div>
            <div className="hidden md:flex  ">
              <Link to="/" className="text-white md:ml-4 hover:bg-gray-700 px-3 py-1 rounded-md text-sm font-medium">
                Home
              </Link>
              <Link to="/about" className="text-white hover:bg-gray-700 px-3 py-1 rounded-md text-sm font-medium">
                About
              </Link>
              <Link to="/shop" className="text-white hover:bg-gray-700 px-3 py-1 rounded-md text-sm font-medium">
                Shop
              </Link>
              <Link to="/contact" className="text-white hover:bg-gray-700 px-3 py-1 rounded-md text-sm font-medium">
                Contact
              </Link>
            </div>
          </div>

          {/* Centered Search Bar */}
          <div className="flex-grow  pl-10 flex justify-center">
            <form onSubmit={handleSearch} className="flex w-full max-w-[600px]">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) =>setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="flex-1 placeholder:text-white text-white bg-transparent border-b border-white focus:outline-none "
              />
              <button type="submit" className="bg-transparent text-white px-4 rounded-r-md  flex items-center">
                <FaSearch className="h-5 w-5 mobile:h-3 mobile:w-3" />
              </button>
            </form>
          </div>

          {/* Sign In and Sign Up Links */}
          <div className="hidden md:flex space-x-2">
            <a href="/signin" className="text-white hover:bg-gray-700 px-1 py-2 rounded-md text-sm font-medium">
              Sign In
            </a>
            <a href="/signup" className="text-white hover:bg-gray-700 px-1 py-2 rounded-md text-sm font-medium">
              Sign Up
            </a>
          </div>

          <div className="-mr-2 flex md:hidden">
            <button onClick={toggleMenu} className=" p-2 rounded-md text-white">
              {isOpen ? (
                <svg className="h-6 w-6" fill="#ffffff" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="#ffffff" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

       {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white w-1/2 h-1/2   absolute transition-all duration-500 ease-linear top-16 right-0 z-40 ">
          <Link to="/"  className="block text-charcoal-gray border-b-black border-b hover:bg-gray-600 px-4 py-2 text-sm">
                Home
              </Link>
              <Link to="/about"  className="block text-charcoal-gray border-b-black border-b hover:bg-gray-600 px-4 py-2 text-sm">
                About
              </Link>
              <Link to="/shop"  className="block text-charcoal-gray border-b-black border-b hover:bg-gray-600 px-4 py-2 text-sm">
                Shop
              </Link>
              <Link to="/contact"  className="block text-charcoal-gray border-b-black border-b hover:bg-gray-600 px-4 py-2 text-sm">
                Contact
              </Link>
          <a href="/signin" className="block text-charcoal-gray border-b-black border-b hover:bg-gray-600 px-4 py-2 text-sm">
            Sign In
          </a>
          <a href="/signup" className="block text-charcoal-gray border-b-black border-b hover:bg-gray-600 px-4 py-2 text-sm">
            Sign Up
          </a>
        </div>
      )}
    </div>
  );
};

export default Navbar;