import React, { useEffect } from "react";
import Heading from "./Heading";
import Products from "./Product";
import { useDispatch, useSelector } from "react-redux";
// import { useSelector } from "react-redux";
import { fetchProducts } from "../Reducers/Reducers";
import Loading from "./Loading";
import ErrorPage from "./ErrorPage";
import { useNavigate } from "react-router-dom";
// import AdvancedFilters from "./Filter";
// import { useParams } from "react-router-dom";

function Product({ containerRef }) {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  // const {keyword} = useParams()
  // const dispatch = useDispatch();

  // Access loading and error state from the Redux store
  const { isLoading, error } = useSelector((state) => state.getProducts);
  const navigateTOMore = () => {
    navigate("/products");
  };
  useEffect(() => {
    dispatch(fetchProducts({ keyword: "", page: 1 }));
  }, [dispatch]);

  // useEffect(() => {
  //   console.log("Current State:", { isLoading, error });
  //   dispatch(fetchProducts());
  // }, [dispatch,error,isLoading]);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : error ? (
        <ErrorPage
          message={
            error.message || "An error occurred while fetching products."
          }
        />
      ) : (
        <>
          <div
            ref={containerRef}
            className="w-7xl flex pt-14 justify-center gap-8 "
          >
            <div>
              <div className="max-w-4xl mx-auto">
                <Heading title={"Featured Products"} level={2} />
                <div className="flex pt-10 justify-center items-center gap-2 flex-wrap">
                  <Products />
                </div>
              </div>
              <div className="flex justify-center my-8 "></div>
              <button
                onClick={navigateTOMore}
                className=" flex justify-center mx-auto bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
              >
                More Products..
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Product;
