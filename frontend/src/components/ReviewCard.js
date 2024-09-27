import React, { Fragment, useState } from "react";
import StarRatings from "react-star-ratings";
// import { FaStar } from 'react-icons/fa'; // Font Awesome stars for rating

function ReviewCard({ reviews }) {
  const [visibleCount, setVisibleCount] = useState(5); // Number of reviews to show initially
  const [hasMore, setHasMore] = useState(true); // To check if more reviews are available

  // Function to load more reviews
  const loadMoreReviews = () => {
    const newCount = visibleCount + 10; // Increase by 10
    if (newCount >= reviews.length) {
      setHasMore(false); // Disable button if no more reviews
    }
    setVisibleCount(newCount); // Update the visible count
  };
 

  return (
    <Fragment>
      {reviews.slice(0, visibleCount).map((review, index) => {
  const date = new Date(review.createdAt);
  const formattedDate = date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div key={index} className="w-[80%] mobile:w-[90%]  border my-4 p-4 mx-auto ">
      <h3 className="my-2">{review.name}</h3>
     
      <p>{review.comment}</p>
      <div className="mt-2">{formattedDate}</div> <span > <StarRatings
              numberOfStars={5}
              name="rating"
              rating={review.rating}
              starDimension="24px"
              starSpacing="2px"
              starRatedColor="#ffd700"
              starEmptyColor="rgb(203, 211, 227)"
            /></span> {/* Display the formatted date here */}
    </div>
  );
})}
{hasMore ? (
        <button onClick={loadMoreReviews} className="my-4 px-4 py-2 mx-auto bg-blue-500 text-white rounded">
          Load More Reviews
        </button>
      ):<p className="mx-auto">No more Reviews</p>}
    </Fragment>
  );
}

export default ReviewCard;
