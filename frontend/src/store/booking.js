import { csrfFetch } from "./csrf";

//! Actions

const ADD_BOOKING = "spot/ADD_BOOKING";
export const addBooking = (spot) => ({
  type: ADD_BOOKING,
  spot,
});

//! Thunks

// CREATE BOOKING
export const createBooking = (booking) => async (dispatch) => {
  const { startDate, endDate } = booking;

  const response = await csrfFetch("apit/spots/:spotId/bookings", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      startDate,
      endDate,
    }),
  });
  if (response.ok) {
    const booking = await response.json();
    dispatch(addBooking(booking));
    return booking;
  }
};

const initialState = {};

const bookingReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_BOOKING: {
      const newState = {
        ...state,
        [action.spot.id]: { ...action.spot }
      };
      return newState;
    }
    default:
      return state;
  }
};

export default bookingReducer;
