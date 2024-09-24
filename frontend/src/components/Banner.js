import React from 'react';
import logo from '../logo.svg';
import { FaMouse } from 'react-icons/fa';

function Banner({scrollToContainer }) {
  return (
    <>
<div  className="w-7xl mx-auto  z-30 flex-grow relative px-4 sm:px-6  border-t-white border-t lg:px-8 h-[600px] your-class mobile:h-96 bg-soft-pastel-blue ">
<div className='absolute flex flex-col items-center  top-[30%] left-[50%] translate-x-[-50%] translate-y-[-30%]'>
          <img className='w-72 h-60 mobile:h-44' src={logo} alt='logo' />
          <h1 className='text-white text-center font-sans font-bold text-4xl mobile:text-xl -mt-8'>
            Welcome To ShopEase
          </h1>
          <button onClick={scrollToContainer} className='text-white hover:bg-white hover:text-gray-800 transition-all duration-400 ease-in-out  text-center mx-auto flex mt-5 text-xl border-2 px-3 py-2'>
            Scroll <FaMouse className='h-5 w-5 mt-1 ml-4' />
          </button>
        </div>
      </div>
      
    </>
  );
}

export default Banner;
