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

let initialState = {};
const reviewReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_REVIEWS: {
      const userReviews = {};
      console.log(action.reviews.Reviews[0].review, " <-------");
      return {
        ...state,
        [action.reviews.Reviews]: {...action.reviews.Reviews[0]}
      }
    }
    default:
      return state;
  }
};

export default reviewReducer;
