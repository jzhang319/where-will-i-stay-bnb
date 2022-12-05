import "./BookingForm.css";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { createBooking } from "../../store/booking";

const BookingForm = () => {
  const { spotId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [totalDays, setTotalDays] = useState(0);
  const [errors, setErrors] = useState([]);

  const spot = useSelector((state) => state.spot);
  const booking = useSelector((state) => state.booking);

  useEffect(() => {
    dispatch(createBooking(spot));
    console.log(spot, ` <--- from bookingForm`);
    // console.log(totalDays);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(
      createBooking({
        startDate,
        endDate,
      })
    );
    history.push(`/spots/${spotId}`);
  };

  const date1 = new Date(startDate);
  const date2 = new Date(endDate);
  let difference = date1.getTime() - date2.getTime();
  let total = Math.ceil(difference / (1000 * 3600 * 24));
  // setTotalDays(total);

  return (
    <form action="submit">
      <div className="form-container">
        <label for="start">Start date:</label>
        <input
          type="date"
          id="start"
          name="trip-start"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          min="2022-01-01"
          max="2024-12-31"
        ></input>
        <label for="end">End date:</label>
        <input
          type="date"
          id="end"
          name="trip-end"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          min="2022-01-01"
          max="2024-12-31"
        ></input>
        <div className="spot-detail">
          <div className="price">${spot.price} night</div>
          <div className="pricing">
            ${spot.price} x {totalDays}
          </div>
          <div className="total">
            Total before taxes: ${spot.price * totalDays}
          </div>
        </div>
        <div className="button-section">
          <button className="reserve-btn" onClick={handleSubmit}>
            Reserve
          </button>
        </div>
      </div>
    </form>
  );
};

export default BookingForm;
