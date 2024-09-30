import React, { Fragment } from "react";
import StarRatings from "react-star-ratings";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Products() {
  const { products } = useSelector((state) => state.getProducts);
  console.log(products);
  
  return (
    <Fragment>
      
      {products.map((product) => {
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
      })}
      
    </Fragment>
  );
}

export default Products;
