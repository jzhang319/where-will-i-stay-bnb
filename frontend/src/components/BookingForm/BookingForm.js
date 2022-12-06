import "./BookingForm.css";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { createBooking } from "../../store/booking";

const BookingForm = () => {
  const { spotId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  // console.log(spotId, ` <-- spotId`);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [totalDays, setTotalDays] = useState(0);
  const [errors, setErrors] = useState([]);

  // const currDate = new Date();
  // const bookDate = new Date(startDate);

  // console.log(currDate.getTime(), ` <-- currDate`);
  // console.log(bookDate.getTime(), ` <-- bookDate`);

  const spot = useSelector((state) => state.spot);
  const sessionUser = useSelector((state) => state.session.user);

  // if (sessionUser.id === spot.ownerId) {
  //   setHidden(false);
  // }

  // useEffect(() => {

  // }, []);

  // history.push(`/spots/${spotId}`)

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if (bookDate.getTime() < currDate.getTime()) {
    //   return alert("Start date has to be future date");
    // }

    if (sessionUser.id === spot.ownerId)
      // alert("Owner cannot reserve their own property");
      setErrors(["Owner cannot reserve their own property"]);
    // if (startDate.getTime() === currDate.getTime()) {
    //   return alert("Start date cannot be the current date");
    // }
    else if (!startDate || !endDate) {
      //  alert("Please enter start date and end date to continue");
      setErrors(["Please enter start date and end date to continue"]);
    } else {
      const data = await dispatch(
        createBooking({
          startDate,
          endDate,
          spotId,
        })
      );
      console.log(data, ` <-- bookingForm`);
      if (data) {
        setErrors([data]);
      }
    }
  };

  // const date1 = new Date(startDate);
  // const date2 = new Date(endDate);
  // console.log(startDate, ` <-- startDate`);
  // console.log(date1, ` <-- date1`);
  // let difference = date1.getTime() - date2.getTime();
  // let total = Math.ceil(difference / (1000 * 3600 * 24));
  // if (total !== 0) setTotalDays(total);
  // console.log(date2 - date1, ` <-- difference`);
  // if (difference === NaN) {
  //   difference = 0;
  // } else {
  //   difference = total;
  // }

  return (
    <form action="submit">
      <div className="form-container">
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
      </div>
      <div className="form-container">
        <label>Start date:</label>
        <input
          type="date"
          id="start"
          name="trip-start"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          min="2022-01-01"
          max="2024-12-31"
        ></input>
        <label>End date:</label>
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
            ${spot.price} x {totalDays} nights
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
