import { csrfFetch } from "./csrf";
import { getAllSpots, getSpotWithId } from "./spot";
import { useDispatch } from "react-redux";

//! Actions

const ADD_SPOTIMAGE = "spots/ADD_SPOTIMAGE";
export const addSpotImage = (spotImage) => ({
  type: ADD_SPOTIMAGE,
  spotImage,
});

const DELETE_SPOTIMAGE = "spots/DELETE_SPOTIMAGE";
export const deleteSpotImage = (spotImage) => ({
  type: DELETE_SPOTIMAGE,
  spotImage,
});

//! Thunks
// DELETE SPOTIMAGE
export const deleteTheSpotImage = (spotImage) => async (dispatch) => {
  const response = await fetch(`/api/spots/${spotImage.id}`, {
    method: "DELETE",
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(deleteSpotImage(spotImage));
    return data;
  }
};

// POST SPOT IMAGE
export const addSpotImageThunk = (spotImage) => async (dispatch) => {
  const { spotId, url, preview } = spotImage;
  // console.log(spotId, ` <-- spotId thunk`);
  // console.log(url, ` <-- url thunk`);
  // console.log(preview, ` <-- preview thunk`);

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
    dispatch(getSpotWithId(spotId));
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
    case DELETE_SPOTIMAGE: {
      const newState = { ...state };
      delete newState[action.spotImage.id];
      return newState;
    }
    default:
      return state;
  }
};

export default spotImageReducer;
