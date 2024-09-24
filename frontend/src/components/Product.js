import React from "react";
import Heading from "./Heading.js";
import Products from "./Products.js";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchProducts } from "../Reducers/Reducers.js";
// import {useSelector} from 'react-redux'
function Product({ containerRef }) {
  const dispatch = useDispatch();
  // const { products} = useSelector((state) => state.getProducts);

  useEffect(() => {
    
      dispatch(fetchProducts());
    
  }, [dispatch]);

  ;
  
  return (
    <>
      <div ref={containerRef} className="  w-7xl">
        <div className="max-w-4xl mx-auto">
          {/* <h1 className=' w-60 h-12' >Feature Product</h1> */}
          <Heading title={"Feature Product"} level={2} />
          <div className="flex mt-10 justify-center mx-auto items-center gap-4 flex-wrap">
            <Products/>
           
          </div>
        </div>
      </div>
    </>
  );
}

export default Product;
