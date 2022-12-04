import { csrfFetch } from "./csrf";

//! Actions

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
export const updateCurrSpot = (spot) => ({
  type: UPDATE_SPOT,
  spot,
});

const GET_CURR_USER = "spots/GET_CURR_USER";
export const getCurrUser = (spot) => ({
  type: GET_CURR_USER,
  spot,
});

const DEL_SPOT = "spots/DEL_SPOT";
export const delSpot = (spotId) => ({
  type: DEL_SPOT,
  spot: spotId,
});

//! Thunks

// GET ALL SPOTS
export const getAllSpots = () => async (dispatch) => {
  const response = await fetch("/api/spots");
  if (response.ok) {
    const data = await response.json();
    dispatch(getSpots(data));
    return response;
  }
};
// GET ONE SPOT
export const getSpotWithId = (spotId) => async (dispatch) => {
  const response = await fetch(`/api/spots/${spotId}`);

  if (response.ok) {
    const spot = await response.json();
    dispatch(getSpot(spot));
    return spot;
  }
};
// CREATE SPOT
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
    spot.previewImage = "no preview image found";
    dispatch(addSpot(spot));
    return spot;
  }
};

// UPDATE SPOT
export const updateSpot = (spot) => async (dispatch) => {
  // console.log(spot, ` <----`);
  const respond = await csrfFetch(`/api/spots/${spot.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(spot),
  });
  if (respond.ok) {
    const spot = await respond.json();
    dispatch(updateCurrSpot(spot));
    return spot;
  }
};

// GET CURRENT USER - SPOTS
export const getCurrUserSpots = () => async (dispatch) => {
  const response = await csrfFetch("/api/spots/current");
  if (response.ok) {
    const data = await response.json();
    dispatch(getCurrUser(data));
    return data;
  }
};

// DELETE SPOT
export const deleteSpot = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}`, {
    method: "DELETE",
  });
  if (response.ok) {
    const spot = await response.json();
    dispatch(delSpot(spotId));
    return spot;
  }
};

const initialState = {};

const spotReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SPOTS: {
      const allSpots = {};
      action.spots.Spots.forEach((spot) => {
        allSpots[spot.id] = spot;
      });
      // console.log(allSpots);
      return {
        ...allSpots,
      };
    }
    case GET_SPOT: {
      const newState = {
        ...action.spot,
      };
      // console.log(newState);
      return newState;
    }
    case ADD_SPOT: {
      const newState = {
        ...state,
        [action.spot.id]: { ...action.spot },
      };
      return newState;
    }
    case UPDATE_SPOT: {
      const newState = {
        ...state,
        ...action.spot,
      };
      return newState;
    }
    case GET_CURR_USER: {
      const newState = {
        ...action.spot.Spots,
      };
      return newState;
    }
    case DEL_SPOT: {
      const newState = { ...state };
      console.log(newState[action.spotId]);
      delete newState[action.spotId];
      return newState;
    }
    default:
      return state;
  }
};

export default spotReducer;
