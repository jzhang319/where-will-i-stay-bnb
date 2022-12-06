import "./CurrentUserBooking.css";
import { getAllBookings } from "../../store/booking";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";


const CurrentUserBooking = () => {
  const { SpotId } = useParams();
  const dispatch = useDispatch();

  const spot = useSelector((state) => state.spot)
  console.log(spot, ` <-- currentUserBooking`)

  useEffect(()=>{
    dispatch(getAllBookings(SpotId));
  },[])

  useEffect(() => {
    getAllBookings()
     .then((res) => {
        setBookings(res);
      })

  return (
    <div className="current-user-booking-container">
      <div>Current User Booking(s):</div>
    </div>
  );
};

export default CurrentUserBooking;
