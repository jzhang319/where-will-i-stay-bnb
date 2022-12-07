import { csrfFetch } from "./csrf";

//! Actions

const ADD_BOOKING = "spot/ADD_BOOKING";
export const addBooking = (booking) => ({
  type: ADD_BOOKING,
  booking: booking,
});

const GET_BOOKINGS = "spot/GET_BOOKINGS";
export const getBookings = (booking) => ({
  type: GET_BOOKINGS,
  booking,
});

//! Thunks

export const getBookingsWithSpotId = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}/bookings`)
    .then(async (response) => {
      const data = await response.json();
      dispatch(getBookings(data));
      return data;
    })
    .catch(async (response) => {
      const data = await response.json();
      // console.log(data.message, ` <--data from here, thunk`);
      dispatch(getBookings({}));
      return data;
    });

  // if (response.status == 404) {
  //   const data = {};
  //   dispatch(getBookings(data));
  //   return data;
  // } else if (response.ok) {
  //   const data = await response.json();
  //   dispatch(getBookings(data));
  //   return data;
  // }
};

// CREATE BOOKING
export const createBooking = (booking) => async (dispatch) => {
  // console.log(booking, ` <--- booking`);

  const { startDate, endDate, spotId } = booking;

  // console.log(`before fetch`);
  const response = await csrfFetch(`/api/spots/${spotId}/bookings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      startDate,
      endDate,
    }),
  })
    .then(async (response) => {
      const booking = await response.json();
      dispatch(addBooking(booking));
      return booking;
    })
    .catch(async (response) => {
      const data = await response.json();
      // console.log(data);
      return data.message;
    });
  return response;
};

const initialState = {};

const bookingReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_BOOKING: {
      const newState = {
        ...state,
        [action.booking.id]: { ...action.booking },
      };
      return newState;
    }
    case GET_BOOKINGS: {
      const newState = {
        ...action.booking,
      };
      return newState;
    }
    default:
      return state;
  }
};

export default bookingReducer;
