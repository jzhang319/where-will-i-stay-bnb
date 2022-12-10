import { csrfFetch } from "./csrf";

//! Actions

const ADD_SPOTIMAGE = "spots/ADD_SPOTIMAGE";
export const addSpotImage = (spotImage) => ({
  type: ADD_SPOTIMAGE,
  spotImage,
});

//! Thunks

// POST SPOT IMAGE
export const addSpotImageThunk = (spotImage) => async (dispatch) => {
  const { spotId, url, preview } = spotImage;
  console.log(spotId, ` <-- spotId thunk`);
  console.log(url, ` <-- url thunk`);
  console.log(preview, ` <-- preview thunk`);

  const response = await csrfFetch(`/api/spots/${spotId}/images`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      spotId,
      url,
      preview,
    }),
  });
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
        [action.spotImage.id]: action.spotImage,
      };
      return newState;
    }
    default:
      return state;
  }
};

export default spotImageReducer;
