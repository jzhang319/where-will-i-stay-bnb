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

const DELETE_BOOKING = "spot/DELETE_BOOKING";
export const deleteBooking = (bookingId) => ({
  type: DELETE_BOOKING,
  bookingId,
});

//! Thunks

// GET BOOKING with SPOT ID
export const getBookingsWithSpotId = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}/bookings`)
    .then(async (response) => {
      const data = await response.json();
      console.log(data, ` <--- thunk `);
      dispatch(getBookings(data));
      return data;
    })
    .catch(async (response) => {
      const data = await response.json();
      // console.log(data.message, ` <--data from here, thunk`);
      dispatch(getBookings({}));
      return data;
    });
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
      // console.log(booking, ` <---- thunk booking`);
      const { startDate, endDate, spotId, id } = booking;
      console.log(booking, ` <--- booking from booking.js`);
      dispatch(addBooking({ startDate, endDate, spotId, id }));
      return booking;
    })
    .catch(async (response) => {
      const data = await response.json();
      // console.log(data);
      return data;
    });
  return response;
};

// DELETE BOOKING
export const deleteBookingThunk = (bookingId) => async (dispatch) => {
  const response = await csrfFetch(`/api/bookings/${bookingId}`, {
    method: "DELETE",
  });
  // .then(async (response) => {
  //   const data = await response.json();
  //   console.log(data, ` <--- test here`);
  //   dispatch(deleteBooking());
  //   return data;
  // })
  if (response.ok) {
    const booking = await response.json();
    dispatch(deleteBooking(bookingId));
    return booking;
  }
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
      const newState = {};
      action.booking.Bookings.forEach((booking) => {
        newState[booking.id] = booking;
        // console.log(booking, ` <---`);
      });
      return newState;
    }
    case DELETE_BOOKING: {
      const newState = { ...state };
      delete newState[action.bookingId];
      return newState;
    }
    default:
      return state;
  }
};

export default bookingReducer;
