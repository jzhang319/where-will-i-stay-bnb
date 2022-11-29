const GET_SPOTS = "spot/GET_SPOTS";
export const getSpots = (spots) => ({
  type: GET_SPOTS,
  payload: spots,
});

export const getAllSpots = () => async (dispatch) => {
  const response = await fetch("/api/spots");
  const data = await response.json();
  dispatch(getSpots(data));
  return response;
};

// const initialState = {

// }

const spotReducer = (state = {}, action) => {
  let newState = {};
  switch (action.type) {
    case GET_SPOTS: {
      const allSpots = {};
      action.payload.forEach((spot) => {
        allSpots[spot.id] = spot;
      });

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
