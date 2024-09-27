import React, { useEffect } from "react";
import Heading from "./Heading";
import Products from "./Products";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../Reducers/Reducers";
import Loading from "./Loading";
import ErrorPage from "./ErrorPage";

function Product({ containerRef }) {
  const dispatch = useDispatch();
  
  // Access loading and error state from the Redux store
  const { isLoading, error } = useSelector((state) => state.getProducts);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // useEffect(() => {
  //   console.log("Current State:", { isLoading, error });
  //   dispatch(fetchProducts());
  // }, [dispatch,error,isLoading]);

  return (
    <div ref={containerRef} className="w-7xl  mx-auto">
      {/* Show loading component when data is loading */}
      {isLoading && <Loading />}
      
      {/* Show error component when there's an error */}
      {error && <ErrorPage message={error.message || "An error occurred while fetching products."} />}
      
      {/* Render products when data is available and there are no errors */}
      {!isLoading && !error && (
        <div className="max-w-4xl mx-auto">
          <Heading title={"Featured Products"} level={2} />
          <div className="flex mt-10 justify-center items-center gap-4 flex-wrap">
            <Products />
          </div>
        </div>
      )}
    </div>
  );
}

export default Product;
