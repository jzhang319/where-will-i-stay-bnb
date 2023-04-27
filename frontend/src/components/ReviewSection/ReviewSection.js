import React from "react";
import * as reviewActions from "../../store/review";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

function ReviewSection({ spotId }) {
  const dispatch = useDispatch();
  const userReviews = useSelector((state) => state.review.review);
  const userReviewKeys = useSelector((state) => state.review);
  const spot = useSelector((state) => state.spot);

  // console.log(spotId, ` <------- spotId`);
  // console.log(userReviewKeys.spotId, ` <------- from keys`);

  useEffect(() => {
    dispatch(reviewActions.getTheReviews(spot));
  }, [dispatch]);

  return (
    <>
      {spotId === userReviewKeys.spotId ? (
        <div className="review-container">
          User's Review :<div className="individual-review">{userReviews}</div>
        </div>
      ) : (
        <>
          <div className="review-container">No Reviews for this spot from current User</div>
        </>
      )}
    </>
  );
}

export default ReviewSection;
