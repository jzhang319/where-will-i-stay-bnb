//! Actions

import { csrfFetch } from "./csrf";

const GET_SPOTS = "spots/GET_SPOTS";
export const getSpots = (spots) => ({
  type: GET_SPOTS,
  spots,
});

const GET_SPOT = "spots/GET_SPOT";
export const getSpot = (spot) => ({
  type: GET_SPOT,
  spot,
});

const ADD_SPOT = "spots/ADD_SPOT";
export const addSpot = (spot) => ({
  type: ADD_SPOT,
  spot,
});

const UPDATE_SPOT = "spots/UPDATE_SPOT";
export const updateSpot = (spot) => ({
  type: UPDATE_SPOT,
  spot,
});

// const DEL_SPOT = "spots/DEL_SPOT";
// export const delSpot = (spotId) => ({
//   type: DEL_SPOT,
//   spot: [spotId],
// });

//! Thunks

// READ ALL
export const getAllSpots = () => async (dispatch) => {
  const response = await fetch("/api/spots");
  if (response.ok) {
    const data = await response.json();
    dispatch(getSpots(data));
    return response;
  }
};
// READ ONE
export const getSpotWithId = (spotId) => async (dispatch) => {
  const response = await fetch(`/api/spots/${spotId}`);

  if (response.ok) {
    const spot = await response.json();
    dispatch(getSpot(spot));
    return spot;
  }
};
// CREATE
export const createSpot = (spot) => async (dispatch) => {
  const { address, city, state, country, lat, lng, name, description, price } =
    spot;
  const response = await csrfFetch("api/spots", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price,
    }),
  });
  if (response.ok) {
    const spot = await response.json();
    dispatch(addSpot(spot));
    return spot;
  }
};

const initialState = {};

const spotReducer = (state = initialState, action) => {
  let newState = {};
  switch (action.type) {
    case GET_SPOTS: {
      const allSpots = {};
      action.spots.Spots.forEach((spot) => {
        allSpots[spot.id] = spot;
      });
      // console.log(allSpots);
      return {
        ...allSpots,
        ...newState,
      };
    }
    case GET_SPOT: {
      newState = {
        ...action.spot,
      };
      // console.log(newState);
      return newState;
    }
    case ADD_SPOT: {
      newState = {
        ...state,
        [action.spot.id]: { ...action.spot },
      };
      return newState;
    }
    default:
      return state;
  }
};

export default spotReducer;
