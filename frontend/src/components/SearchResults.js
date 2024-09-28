import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import StarRatings from 'react-star-ratings';
import Loader from './Loading';
import ErrorPage from './ErrorPage';
function SearchResults() {
  // const {products,isLoading,error}= useSelector((state)=>state.getProducts)
    const {products,isLoading,error} = useSelector((state)=>state.getSearchProducts)
    
  return (
    <>
    <div  className="w-7xl  mx-auto">
      {/* Show loading component when data is loading */}
      {isLoading && <Loader />}
      
      {/* Show error component when there's an error */}
      {error && <ErrorPage message={error.message || "An error occurred while fetching products."} />}
      
      {/* Render products when data is available and there are no errors */}
      {!isLoading && !error&& (
        <div className="max-w-4xl mx-auto">
          {/* <Heading title={"Featured Products"} level={2} /> */}
          <div className="flex mt-10 justify-center items-center gap-4 flex-wrap">
          {products.length>0? products.map((product) => {
        return (
          <Link
            to={`/product/${product._id}`}
            key={product._id}
            className="block "
          >
            <div className="w-44 mobile:w-40 mobile:h-56 relative group bg-light-gray h-64 rounded-lg overflow-hidden shadow-lg">
              <img
                src={product.images[0].url}
                className="w-full h-full object-cover rounded-t-lg transition-all duration-300 ease-linear group-hover:scale-x-105 group-hover:scale-y-105"
                alt={product.name}
              />
              <div className=" absolute bottom-0 pl-2 text-white bg-charcoal-gray h-20 opacity-80 w-full">
                <span className="text-sm font-semibold text-white">
                  {product.price}
                </span>
                <h3 className="text-md font-sans">{product.name}</h3>
                <StarRatings
                  numberOfStars={5}
                  name="rating"
                  rating={product.rating}
                  starDimension="24px"
                  starSpacing="2px"
                  starRatedColor="#ffd700"
                  starEmptyColor='rgb(203, 211, 227)'
                />
              </div>
            </div>
          </Link>
          
        );
      }):<h1 className='mx-auto text-red-700 text-2xl mobile:text-xl'>No product found</h1>}
          </div>
        </div>
      )}
    </div>
      </>
  )
}

export default SearchResults