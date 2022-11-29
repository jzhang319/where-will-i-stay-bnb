const GET_SPOTS = "spot/GET_SPOTS";
export const getSpots = (spots) => ({
  type: GET_SPOTS,
  spots,
});

const GET_SPOT = "spot/GET_SPOT";
export const getSpot = (spot) => ({
  type: GET_SPOT,
  spot,
});

export const getAllSpots = () => async (dispatch) => {
  const response = await fetch("/api/spots");
  if (response.ok) {
    const data = await response.json();
    dispatch(getSpots(data));
    return response;
  }
};

export const getSpotWithId = (spotId) => async (dispatch) => {
  const response = await fetch(`/api/spot/${[spotId]}`);

  if (response.ok) {
    const spot = await response.json();
    dispatch(getSpot(spot));
    return spot;
  }
};

// const initialState = {

// }

const spotReducer = (state = {}, action) => {
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
    // case GET_SPOT:{
    //   const spot = {};
    //   const {spotId} = req.body
    //   newState.spot
    // }
    default:
      return state;
  }
};

export default spotReducer;
