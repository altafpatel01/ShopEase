import React, { Fragment, useEffect, useState } from "react";
import Slider from "react-slick";
import StarRatings from "react-star-ratings";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { addItem } from "../Reducers/cartReducer";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductDetails } from "../Reducers/ProductDetailReducer";
import { useParams } from "react-router-dom";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import ReviewCard from "./ReviewCard";
import Loading from "./Loading";
import ErrorPage from "./ErrorPage";
function ProductDetails() {
  const NextArrow = (props) => {
    const { onClick } = props;
    return (
      <div
        className="absolute top-[50%] right-0 transform translate-y-[-50%]  rounded-full p-2 cursor-pointer z-10 hover:bg-gray-800"
        onClick={onClick}
      >
        <FaArrowRight className="text-white text-lg" />
      </div>
    );
  };

  const PrevArrow = (props) => {
    const { onClick } = props;
    return (
      <div
        className="absolute top-[50%] left-0 transform translate-y-[-50%]  rounded-full p-2 cursor-pointer z-10 hover:bg-gray-800"
        onClick={onClick}
      >
        <FaArrowLeft className="text-white text-lg" />
      </div>
    );
  };

  const [quantity, setQuantity] = useState(1);
  const { id } = useParams();
  const { product, isLoading, error } = useSelector(
    (state) => state.getProductDetails
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProductDetails(id));
  }, [dispatch, id]);

  const settings = {
    dots: true, // Shows navigation dots
    arrows: true,
    infinite: true, // Infinite scrolling
    speed: 500, // Transition speed
    slidesToShow: 1, // How many slides to show at once
    slidesToScroll: 1, // How many slides to scroll at once
    autoplay: true, // Auto-play slides
    autoplaySpeed: 2000, // Auto-play speed
    pauseOnHover: false,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    cssEase: "ease-in-out",
    initialSlide: 0, // Changed to 0 for starting at the first slide
  };

  return (
    <Fragment>
      {isLoading ? (
        <Loading />
      ) : error ? (
        <ErrorPage message={"Details are not acialable"} />
      ) : (
        <>
          <div className="flex justify-between w-7xl  overflow-x-hidden  mobile:items-center mobile:flex-col mobile:py-0  md:my-10 ">
            <div className=" mobile:w-[100%] w-[50%] mobile:p-0   h-96 object-contain relative   mobile:mt-0  ">
              <Slider
                className=" w-[50%] mobile:w-[100%] absolute top-[50%] mobile:left-[50%] left-[60%] overflow-y-hidden rounded-md border   translate-x-[-50%]  translate-y-[-50%]"
                {...settings}
              >
                {product && product.images && product.images.length > 0 ? (
                  product.images.map((image) => (
                    <div key={image._id}>
                      <img
                        src={image.url}
                        alt="Product "
                        className="object-cover mobile:w-[100%] border overflow-hidden rounded-md h-[100%]"
                      />
                    </div>
                  ))
                ) : (
                  <div>No images available</div>
                )}
              </Slider>
            </div>

            <div className=" w-[50%] mobile:w-[100%]    flex h-80 flex-col mobile:mt-24 mobile:overflow-y-hidden   justify-start  ">
              {/* Add more product details here */}
              <div className="absolute mobile:px-4 mobile:pb-8">
                <h1 className="text-2xl mobile:text-xl font-bold text-gray-800">
                  {product?.name}
                </h1>
                <StarRatings
                  numberOfStars={5}
                  name="rating"
                  rating={product.rating}
                  starDimension="24px"
                  starSpacing="2px"
                  starRatedColor="#ffd700"
                  starEmptyColor="rgb(203, 211, 227)"
                />
                <div>
                  <span
                    className={`${
                      product.numOfReviews > 0
                        ? "text-green-500"
                        : "text-red-600"
                    }`}
                  >
                    {product.numOfReviews} Reviews
                  </span>
                  <span
                    className={`${
                      product.stock > 0 ? "text-green-500" : "text-red-600"
                    }`}
                  >
                    {" "}
                    {product.stock} Available{" "}
                  </span>
                </div>
                {/* Product Description */}
                <p className="mt-4 text-gray-600 leading-relaxed">
                  {product?.description}
                </p>

                {/* Product Price */}
                <p className="mt-6 mobile:mt-3 text-2xl font-semibold text-green-600">
                  &#8377; {product?.price}
                </p>
                <div className="flex items-center mt-3 space-x-2">
                  <button
                    onClick={() => {
                      if (quantity > 1) {
                        setQuantity(quantity - 1);
                      }
                    }}
                    className="border border-blue-800 h-8 w-8 flex justify-center items-center text-blue-800 rounded hover:bg-blue-800 hover:text-white transition duration-200 ease-in-out"
                  >
                    -
                  </button>
                  <input
                    type="text"
                    className="text-center border border-gray-300 rounded h-8 w-12 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={quantity}
                    readOnly
                  />
                  <button
                    onClick={() =>{if(quantity<product.stock) {setQuantity(quantity + 1)}}}
                    className="border border-blue-800 h-8 w-8 flex justify-center items-center text-blue-800 rounded hover:bg-blue-800 hover:text-white transition duration-200 ease-in-out"
                  >
                    +
                  </button>
                </div>

                {/* Add to Cart Button */}
                {product&&product.images&&
                <button onClick={()=>dispatch(addItem({name:product.name,id:product._id,price:product.price,quantity:quantity,image:product.images[0]}))} className="mt-4 mobile:mt-4  block bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition duration-300">
                Add to Cart
              </button>}
              </div>
            </div>
          </div>
          <div className="flex flex-col mx-auto max-w-7xl justify-start py-10 ">
            {product &&
            Array.isArray(product.reviews) &&
            product.reviews.length > 0 ? (
              <ReviewCard reviews={product.reviews} />
            ) : (
              <p className="mx-auto">No reviews available</p>
            )}
          </div>
        </>
      )}
    </Fragment>
  );
}

export default ProductDetails;
