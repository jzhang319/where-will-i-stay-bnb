import React from "react";
import * as reviewActions from "../../store/review";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

function ReviewSection() {
  const dispatch = useDispatch();
  const userReviews = useSelector((state) => state.review);

  useEffect(() => {
    dispatch(reviewActions.getReviews());
  }, [dispatch]);

  return (
    <div>
      review section
      {/* {userReviews.map((review) => (
        <div key={review.id}>
          <h3>{review.title}</h3>
          <p>{review.description}</p>
        </div>
      ))} */}
    </div>
  );
}

export default ReviewSection;
