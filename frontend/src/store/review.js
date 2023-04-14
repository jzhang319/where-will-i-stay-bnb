//! action creators

const GET_REVIEWS = "spots/GET_REVIEWS";
export const getReviews = (reviews) => ({
  type: GET_REVIEWS,
  reviews,
});

//! thunks

export const getTheReviews = () => async (dispatch) => {
  const response = await fetch("/api/reviews/current");
  if (response.ok) {
    const data = await response.json();
    dispatch(getReviews(data));
    return response;
  }
};

//! reducer

let initialState = {}
const reviewReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_REVIEWS:{
      const allReviews = {};
      action.reviews.Reviews.forEach((spot) => {
        allReviews[spot.id] = spot;
      });
      // console.log(allSpots);
      return {
        ...allReviews,
      };
    }
    default:
      return state;
  }
};

export default reviewReducer
