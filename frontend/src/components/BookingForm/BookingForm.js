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
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [errors, setErrors] = useState([]);

  const spot = useSelector((state) => state.spot);

  useEffect(() => {
    dispatch(createBooking(spot[spotId]));
  }, []);

  return (
    <form action="submit">
      <div></div>
    </form>
  );
};

export default BookingForm;
