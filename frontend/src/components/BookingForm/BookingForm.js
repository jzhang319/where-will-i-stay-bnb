import "./BookingForm.css";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { createBooking } from "../../store/booking";

const BookingForm = () => {
  const { spotId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const date = new Date();
  let currDate = date.toDateString();

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [errors, setErrors] = useState([]);

  const spot = useSelector((state) => state.spot[spotId]);

  useEffect(() => {
    dispatch(createBooking(spot[spotId]));
  }, []);

  return (
    <form action="submit">
      <div className="form-container">
        <label for="start">Start date:</label>
        <input
          type="date"
          id="start"
          name="trip-start"
          value={currDate}
          min="2022-01-01"
          max="2024-12-31"
        ></input>
        <label for="end">End date:</label>
        <input
          type="date"
          id="end"
          name="trip-end"
          value={currDate}
          min="2022-01-01"
          max="2024-12-31"
        ></input>
      </div>
    </form>
  );
};

export default BookingForm;
