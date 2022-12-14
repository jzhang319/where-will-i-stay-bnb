import "./CurrentSpotBooking.css";
import { deleteBookingThunk, getBookingsWithSpotId } from "../../store/booking";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import UpdateBookingModal from "../UpdateBookingModal";

const CurrentSpotBooking = () => {
  const { spotId } = useParams();
  const dispatch = useDispatch();

  const [errors, setErrors] = useState([]);

  // const spot = useSelector((state) => state.spot);
  const sessionUser = useSelector((state) => state.session.user);
  const allBookings = useSelector((state) => Object.values(state.booking));
  // console.log(allBookings, ` <-- currentSpotBooking1`);

  // console.log(spotId, ` <-- currSpotBooking`);

  useEffect(() => {
    dispatch(getBookingsWithSpotId(spotId));
  }, [dispatch, spotId]);

  // const data = dispatch(getBookingsWithSpotId(spotId));

  const handleDelete = async (e, bookingId) => {
    e.preventDefault();
    dispatch(deleteBookingThunk(bookingId)).catch(async (response) => {
      const data = await response.json();
      // console.log(data, ` <-- data from currentSpotBooking`);
      if (data && data.errors) {
        setErrors(data.errors);
      } else if (data && data.message) {
        setErrors([data.message]);
      }
    });
  };

  return (
    <div className="current-spot-booking-container">
      <div className="current-booking-title">Your Current Booking(s):</div>
      <ul>
        {errors.map((error, idx) => (
          <li className="error-list" key={idx}>{error}</li>
        ))}
        {allBookings.length === 0 && "No Bookings Found"}
      </ul>
      {sessionUser &&
        allBookings?.map((booking) => {
          const date1 = new Date(booking.startDate);
          let dateStr1 = date1.toDateString();
          const date2 = new Date(booking.endDate);
          let dateStr2 = date2.toDateString();

          if (booking.spotId === Number(spotId)) {
            return (
              <div key={booking.id} className="each-booking">
                {/* <div className="booking-detail">Booking ID# {booking.id}</div>
                <div className="booking-detail">
                  Booking Spot ID# {booking.spotId}
                </div> */}
                <div className="start-date">Booked from: {dateStr1}</div>
                <div className="end-date">Booked Until : {dateStr2}</div>
                <div className="update-delete-section">
                  <UpdateBookingModal id={booking.id} />
                  <button
                    className="current-spot-booking-btn"
                    onClick={(e) => handleDelete(e, booking.id)}
                  >
                    DELETE
                  </button>
                </div>
              </div>
            );
          }
        })}
    </div>
  );
};

export default CurrentSpotBooking;
