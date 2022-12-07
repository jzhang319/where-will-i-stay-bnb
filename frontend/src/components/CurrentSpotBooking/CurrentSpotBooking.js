import "./CurrentSpotBooking.css";
import { deleteBookingThunk, getBookingsWithSpotId } from "../../store/booking";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
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
    dispatch(deleteBookingThunk(bookingId));
  };

  return (
    <div className="current-spot-booking-container">
      <div className="current-booking-title">Current Spot Booking(s):</div>
      <ul>
        {errors.map((error, idx) => (
          <li key={idx}>{error}</li>
        ))}
      </ul>
      {sessionUser &&
        allBookings?.map((booking) => {
          const date1 = new Date(booking.startDate);
          let dateStr1 = date1.toDateString();
          const date2 = new Date(booking.endDate);
          let dateStr2 = date2.toDateString();

          return (
            <div key={booking.id} className="each-booking">
              {/* <div className="booking-detail">{booking.id}</div> */}
              <div className="start-date">Booked from: {dateStr1}</div>
              <div className="end-date">Booked Until : {dateStr2}</div>
              <button className="current-spot-booking-btn" onClick={(e) => handleDelete(e, booking.id)}>
                DELETE
              </button>
              <UpdateBookingModal id={booking.id} />
            </div>
          );
        })}
    </div>
  );
};

export default CurrentSpotBooking;
