import { csrfFetch } from "./csrf";

//! Actions

const ADD_SPOTIMAGE = "spots/ADD_SPOTIMAGE";
export const addSpotImage = (spotImage) => ({
  type: ADD_SPOTIMAGE,
  [spotImage.spotId]: spotImage,
});

//! Thunks

// POST SPOTIMAGE
export const addSpotImageThunk = (spotId) => async (dispatch) => {
  const response = await fetch(`/api/spots/${spotId}/images`);
  if (response.ok) {
    const data = await response.json();
    dispatch(addSpotImage(data));
    return data;
  }
};

const initialState = {};

const spotImageReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_SPOTIMAGE: {
      const newState = {
        ...state,
        [action.spotId]: action.spotImage,
      };
      return newState;
    }
    default:
      return state;
  }
};

export default spotImageReducer;
