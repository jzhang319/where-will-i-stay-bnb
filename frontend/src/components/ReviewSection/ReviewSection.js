import React from "react";
import * as reviewActions from "../../store/review";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

function ReviewSection() {
  const dispatch = useDispatch();
  const userReviews = useSelector((state) => state.review.review);
  const spot = useSelector((state) => state.spot);

  useEffect(() => {
    dispatch(reviewActions.getTheReviews(spot));
  }, [dispatch]);

  return (
    <div className="review-container">
      User's Review :
      <div className="individual-review">{userReviews}</div>
    </div>
  );
}

export default ReviewSection;
