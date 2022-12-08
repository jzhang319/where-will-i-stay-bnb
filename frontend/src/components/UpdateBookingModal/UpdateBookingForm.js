import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { updateSpot, deleteSpot } from "../../store/spot";
import { updateBookingThunk } from "../../store/booking";
import "./UpdateBookingModal.css";

const UpdateBookingForm = ({ setShowModal, id }) => {
  const { bookingId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const thisId = useSelector((state) => state.spot.id);
  const booking = useSelector((state) => Object.values(state.booking));

  let currBooking;
  booking.map((el) => {
    if (el.id === id) {
      // console.log(el, ` <---- testing`);
      currBooking = el;
    }
  });
  // console.log(currBooking, `< ---- currBooking`);

  // console.log(booking, ` <-----`);
  const [startDate, setStartDate] = useState(currBooking.startDate);
  const [endDate, setEndDate] = useState(currBooking.endDate);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    
  }, [currBooking.startDate, currBooking.endDate]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    const data = await dispatch(
      updateBookingThunk({
        id,
        startDate,
        endDate,
      })
    )
      .then(() => setShowModal(false))
      .catch(async (res) => {
        const data = await res.json();
        // console.log(data, ` <--- data testing`);
      });

    // if (data === 403) {
    //   setErrors([data.message]);
    // }
    // .catch(async (res) => {
    //   const data = await res.json();
    //   if (data && data.error) setErrors(data.error);
    // });
  };
  // const handleCancel = (e) => {
  //   e.preventDefault();
  //   // history.push(`/spots/${thisId}`);
  //   setShowModal(false);
  // };

  return (
    <form className="booking-form-modal" action="submit">
      <div className="form-error-section">
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
      </div>
      <div className="booking-form-container">
        <label>Start date:</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          min="2022-01-01"
          max="2024-12-31"
        ></input>
        <label>End date:</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          min="2022-01-01"
          max="2024-12-31"
        ></input>
        <div className="booking-btn-section">
          <button className="booking-update-btn" onClick={handleUpdate}>
            UPDATE BOOKING
          </button>
          {/* <button className="booking-cancel-btn" onClick={() => handleCancel}>
            CANCEL
          </button> */}
        </div>
      </div>
    </form>
  );
};

export default UpdateBookingForm;
