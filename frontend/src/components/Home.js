import React from 'react'
import Banner from './Banner'
import Product from './Product.js';
import { useRef } from 'react'
import Footer from './Footer.js';
function Home() {

  const containerRef = useRef(null);
  const scrollToContainer = () => {
    if (containerRef.current) {
      containerRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };
  return (
    <>
    <Banner scrollToContainer={scrollToContainer}/>
    <Product containerRef={containerRef}/>
    <Footer/>
   
    </>
  )
}

export default Home