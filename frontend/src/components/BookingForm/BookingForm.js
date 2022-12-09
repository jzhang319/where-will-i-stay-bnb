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

  useEffect(() => {}, []);

  // history.push(`/spots/${spotId}`)

  const handleSubmit = async (e) => {
    e.preventDefault();
    const currDate = new Date();
    let year = currDate.getFullYear();
    let month = currDate.getMonth();
    let day = currDate.getDate();
    if (day < 10) {
      day = `0${day}`;
    }
    if (month < 10) {
      month = `0${month + 1}`;
    } else {
      month = `${month + 1}`;
    }
    const newDate = year + "-" + month + "-" + day;
    console.log(newDate, ` <-- currDate`);
    console.log(startDate, ` <-- startDate`);
    if (sessionUser.id === spot.ownerId) {
      // alert("Owner cannot reserve their own property");
      setErrors(["Owner cannot reserve their own property"]);
    } else if (startDate === newDate) {
      setErrors(["Cannot make booking on the same day"]);
    } else if (!startDate || !endDate) {
      //  alert("Please enter start date and end date to continue");
      setErrors(["Please enter start date and end date to continue"]);
    } else if (new Date(startDate) > new Date(endDate)) {
      setErrors(["Start date cannot be later than end date"]);
    } else if (sessionUser && spot) {
      const data = await dispatch(
        createBooking({
          spotId,
          startDate,
          endDate,
        })
      );
      // console.log(data, ` <-- from bookingForm`);
      if (data.statusCode === 403) {
        setErrors([data.message]);
      }
    }
  };

  const date1 = new Date(startDate).getTime();
  const date2 = new Date(endDate).getTime();
  // console.log(startDate, ` <-- startDate`);
  // console.log(date1, ` <-- date1`);
  if (date1 && date2) {
  }
  let answer = Math.ceil((date2 - date1) / (1000 * 3600 * 24));
  if (answer !== Number(answer)) {
    answer = 0;
  }

  return (
    <form className="booking-form" action="submit">
      <div className="form-container">
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
      </div>
      <div className="form-container">
        <div className="dates-section">
          <label className="name-date">Start date:</label>
          <input
            className="booking-date"
            type="date"
            id="start"
            name="trip-start"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            min="2022-01-01"
            max="2028-12-31"
          ></input>
          <label className="name-date">End date:</label>
          <input
            className="booking-date"
            type="date"
            id="end"
            name="trip-end"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            min="2022-01-01"
            max="2028-12-31"
          ></input>
        </div>
        <div className="button-section">
          {sessionUser && (
            <button className="reserve-btn" onClick={handleSubmit}>
              Reserve
            </button>
          )}
          {!sessionUser && (
            <div className="reminder-btn">Please LOG IN to Reserve</div>
          )}
        </div>
        <div className="spot-detail">
          <div className="price">${spot.price} night</div>
          <div className="pricing">
            ${spot.price} x {answer} nights
          </div>
          <div className="total">
            Total before taxes: ${spot.price * answer}
          </div>
        </div>
      </div>
    </form>
  );
};

export default BookingForm;
