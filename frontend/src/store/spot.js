const GET_SPOTS = "spot/GET_SPOTS";
export const getSpots = (spots) => ({
  type: GET_SPOTS,
  spots,
});

export const getAllSpots = () => async (dispatch) => {
  const response = await fetch("/api/spots");
  if (response.ok) {
    const data = await response.json();
    dispatch(getSpots(data));
    return response;
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
    default:
      return state;
  }
};

export default spotReducer;
