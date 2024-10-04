import React, { } from 'react'
import Banner from './Banner'
import Product from './featureProducts.js';
import { useRef } from 'react'
import Footer from './Footer.js';
// import { useSelector,useDispatch } from 'react-redux';
// import { initializeCart } from '../Reducers/cartReducer.js';

function Home() {
// const dispatch= useDispatch()
// const {userInfo,isAuthenticated}=useSelector(state=>state.user)
  const containerRef = useRef(null);
  const scrollToContainer = () => {
    if (containerRef.current) {
      containerRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };
//  useEffect(()=>{
//   if(isAuthenticated){
//     dispatch(initializeCart(userInfo._id))
//   }
//  },[dispatch,isAuthenticated,userInfo])
  return (
    <>
    <Banner scrollToContainer={scrollToContainer}/>
    <Product containerRef={containerRef} scrollToContainer={scrollToContainer}/>
    <Footer/>
   
    </>
  )
}

export default Home