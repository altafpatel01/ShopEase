// import React, { useEffect } from "react";
import { useState } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

import React, { useEffect } from "react";
import Heading from "./Heading";
import Products from "./Products";
import { useDispatch, useSelector } from "react-redux";
// import { useSelector } from "react-redux";
import { fetchProducts } from "../Reducers/Reducers";
import Loading from "./Loading";
import ErrorPage from "./ErrorPage";

function Product({ containerRef,scrollToContainer }) {
  const [page, setPage] = useState(1);
  //   const dispatch = useDispatch();
  const handleChange = (event, value) => {
    event.preventDefault(); // Prevent the default action
    scrollToContainer()
    setPage(value); // Update the page state
  };

  const dispatch = useDispatch();

  // Access loading and error state from the Redux store
  const { isLoading, error } = useSelector((state) => state.getProducts);

  useEffect(() => {
    dispatch(fetchProducts(page));
  }, [dispatch, page]);

  // useEffect(() => {
  //   console.log("Current State:", { isLoading, error });
  //   dispatch(fetchProducts());
  // }, [dispatch,error,isLoading]);

  return (
    <div ref={containerRef} className="w-7xl ">
      {/* Show loading component when data is loading */}
      {isLoading && <Loading />}

      {/* Show error component when there's an error */}
      {error && (
        <ErrorPage
          message={
            error.message || "An error occurred while fetching products."
          }
        />
      )}

      {/* Render products when data is available and there are no errors */}
      {!isLoading && !error && (
        <>
          <div className="max-w-4xl mx-auto">
            <Heading title={"Featured Products"} level={2} />
            <div className="flex mt-10 justify-center items-center gap-4 flex-wrap">
              <Products />
            </div>
          </div>
          <div className="flex justify-center my-8 ">
            <Stack spacing={2}>
              <Pagination
                count={5}
                page={page}
                variant="outlined"
                shape="rounded"
                onChange={handleChange}
              />
            </Stack>
          </div>
        </>
      )}
    </div>
  );
}

export default Product;
