import { Fragment, useState } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import React, { useEffect } from "react";
import Heading from "./Heading";
import Products from "./Product";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../Reducers/Reducers";
import Loading from "./Loading";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import ErrorPage from "./ErrorPage";
import { useParams } from "react-router-dom";
import { FaFilter } from "react-icons/fa";
import { MdOutlineCancel } from "react-icons/md";

function Product() {
  const { keyword } = useParams();
  const [page, setPage] = useState(1);
  const [openFilters, setOpenFilters] = useState(true);
  const [priceRange, setPriceRange] = useState([0, 2500]);
  const [rating, setRating] = useState(0);
  const [categories, setCategories] = useState([]);
  const categoryOptions = [
    "Electronics",
    "Clothing",
    "Home Appliances",
    "Books",
    "Toys",
  ];
  const toogleFilterbar = () => {
    setOpenFilters(!openFilters);
  };
  const handleChange = (event, value) => {
    event.preventDefault();

    setPage(value);
  };
  const handleCategoryChange = (category) => {
    if (categories.includes(category)) {
      setCategories(categories.filter((c) => c !== category));
    } else {
      setCategories([...categories, category]);
    }
  };

  const handleFilters = () => {
    dispatch(fetchProducts({ keyword, page, priceRange }));
  };
  const handlePriceChange = (value) => {
    setPriceRange(value);
  };
  const handleRatingChange = (value) => {
    setRating(value);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProducts({ keyword, page }));
  }, [dispatch, keyword, page]);
  const { isLoading, error, filtersProductCounts } = useSelector(
    (state) => state.getProducts
  );

  return (
    <Fragment>
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
          <div className="relative">
            <div className="w-7xl flex pt-7 px-10 mobile:px-0 md:pt-14 justify-center gap-8 ">
              <div className="mt-20 hidden md:flex md:flex-col">
                <div className="w-full p-4 bg-white  rounded-lg shadow-md mb-4 md:w-64">
                  <h2 className="text-lg font-semibold text-gray-700 border-b pb-2 mb-4">
                    Advanced Filters
                  </h2>

                  {/* Price Range Filter */}
                  <div className="mb-6">
                    <h3 className="text-md font-medium text-gray-800 mb-2">
                      Price Range
                    </h3>
                    <div className="px-2">
                      <Slider
                        range
                        min={0}
                        max={5000}
                        value={priceRange}
                        onChange={handlePriceChange}
                        // trackStyle={{ backgroundColor: '#3b82f6' }} // Blue color track
                        // handleStyle={[{ borderColor: '#3b82f6' }, { borderColor: '#3b82f6' }]} // Handle color
                      />
                    </div>
                    <div className="flex justify-between mt-2 text-sm text-gray-600 px-2">
                      <span>₹{priceRange[0]}</span>
                      <span>₹{priceRange[1]}</span>
                    </div>
                  </div>

                  {/* Categories Filter */}
                  <div className="mb-6">
                    <h3 className="text-md font-medium text-gray-800 mb-2">
                      Categories
                    </h3>
                    <div className="flex flex-col space-y-2">
                      {categoryOptions.map((category) => (
                        <label
                          key={category}
                          className="flex items-center text-sm"
                        >
                          <input
                            type="checkbox"
                            className="form-checkbox h-4 w-4 text-blue-600"
                            checked={categories.includes(category)}
                            onChange={() => handleCategoryChange(category)}
                          />
                          <span className="ml-2 text-gray-700">{category}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Ratings Filter */}
                  <div className="mb-6">
                    <h3 className="text-md font-medium text-gray-800 mb-2">
                      Minimum Rating
                    </h3>
                    <div className="px-2">
                      <Slider
                        min={0}
                        max={5}
                        step={0.5}
                        value={rating}
                        onChange={handleRatingChange}
                        // trackStyle={{ backgroundColor: '#fbbf24' }} // Yellow color track
                        // handleStyle={{ borderColor: '#fbbf24' }} // Handle color
                      />
                    </div>
                    <div className="flex justify-between mt-2 text-sm text-gray-600 px-2">
                      <span>{rating} stars</span>
                    </div>
                  </div>

                  {/* Sort By Filter */}
                  <div className="mb-6">
                    <h3 className="text-md font-medium text-gray-800 mb-2">
                      Sort By
                    </h3>
                    <select className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="lowToHigh">Price: Low to High</option>
                      <option value="highToLow">Price: High to Low</option>
                    </select>
                  </div>

                  {/* Apply Filters Button */}
                  <button
                    onClick={handleFilters}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
              <div>
                <div className="max-w-4xl mx-auto">
                  <Heading title={"Products"} level={2} />
                  <div className="flex pt-10 justify-center items-center gap-2 flex-wrap">
                    <Products />
                  </div>
                </div>
                {filtersProductCounts > 12 && (
                  <div className="flex justify-center my-8 ">
                    <Stack spacing={2}>
                      <Pagination
                        count={Math.ceil(filtersProductCounts / 12)}
                        page={page}
                        variant="outlined"
                        shape="rounded"
                        onChange={handleChange}
                      />
                    </Stack>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-20 md:hidden flex flex-col absolute top-0">
              {openFilters ? (
                <button
                  onClick={toogleFilterbar}
                  className=" items-center bg-blue-600  text-white rounded-md px-2 py-1 font-serif absolute left-5 -top-7 flex "
                >
                  Apply <FaFilter className="w-3 h-3 ml-2 fill-white" />
                </button>
              ) : (
                <>
                  <div className="w-full p-4 bg-white  rounded-lg shadow-md mb-4 md:w-64">
                    <h2 className="text-lg font-semibold flex items-center text-gray-700 border-b pb-2 mb-4">
                      Advanced Filters{" "}
                      <MdOutlineCancel
                        onClick={toogleFilterbar}
                        className="w-5 h-5 ml-2"
                      />
                    </h2>

                    {/* Price Range Filter */}
                    <div className="mb-6">
                      <h3 className="text-md font-medium text-gray-800 mb-2">
                        Price Range
                      </h3>
                      <div className="px-2">
                        <Slider
                          range
                          min={0}
                          max={5000}
                          value={priceRange}
                          onChange={handlePriceChange}
                          // trackStyle={{ backgroundColor: '#3b82f6' }} // Blue color track
                          // handleStyle={[{ borderColor: '#3b82f6' }, { borderColor: '#3b82f6' }]} // Handle color
                        />
                      </div>
                      <div className="flex justify-between mt-2 text-sm text-gray-600 px-2">
                        <span>₹{priceRange[0]}</span>
                        <span>₹{priceRange[1]}</span>
                      </div>
                    </div>

                    {/* Categories Filter */}
                    <div className="mb-6">
                      <h3 className="text-md font-medium text-gray-800 mb-2">
                        Categories
                      </h3>
                      <div className="flex flex-col space-y-2">
                        {categoryOptions.map((category) => (
                          <label
                            key={category}
                            className="flex items-center text-sm"
                          >
                            <input
                              type="checkbox"
                              className="form-checkbox h-4 w-4 text-blue-600"
                              checked={categories.includes(category)}
                              onChange={() => handleCategoryChange(category)}
                            />
                            <span className="ml-2 text-gray-700">
                              {category}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Ratings Filter */}
                    <div className="mb-6">
                      <h3 className="text-md font-medium text-gray-800 mb-2">
                        Minimum Rating
                      </h3>
                      <div className="px-2">
                        <Slider
                          min={0}
                          max={5}
                          step={0.5}
                          value={rating}
                          onChange={handleRatingChange}
                          // trackStyle={{ backgroundColor: '#fbbf24' }} // Yellow color track
                          // handleStyle={{ borderColor: '#fbbf24' }} // Handle color
                        />
                      </div>
                      <div className="flex justify-between mt-2 text-sm text-gray-600 px-2">
                        <span>{rating} stars</span>
                      </div>
                    </div>

                    {/* Sort By Filter */}
                    <div className="mb-6">
                      <h3 className="text-md font-medium text-gray-800 mb-2">
                        Sort By
                      </h3>
                      <select className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="lowToHigh">Price: Low to High</option>
                        <option value="highToLow">Price: High to Low</option>
                      </select>
                    </div>

                    {/* Apply Filters Button */}
                    <button
                      onClick={handleFilters}
                      className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
                    >
                      Apply Filters
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </Fragment>
  );
}

export default Product;
