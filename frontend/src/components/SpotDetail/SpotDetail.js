import "./SpotDetail.css";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteSpot, getSpotWithId } from "../../store/spot";
import defaultImage from "../../img/default-image.webp";
import UpdateFormModal from "../UpdateFormModal";
import BookingForm from "../BookingForm/BookingForm";
import CurrentUserBooking from "../CurrentUserBooking/CurrentUserBooking";

const SpotDetail = () => {
  const sessionUser = useSelector((state) => state.session.user);
  const { spotId } = useParams();
  // const history = useHistory();
  const dispatch = useDispatch();
  const spot = useSelector((state) => state.spot);
  // spot?.SpotImages?.find((spotImg) => spotImg.preview === true).url

  let url;
  (() => {
    let proposedPreview = spot?.SpotImages?.find(
      (spotImg) => spotImg.preview === true
    );
    if (proposedPreview) {
      url = proposedPreview.url;
    } else {
      url = defaultImage;
    }
  })();

  // console.log(spot, ` <---`);
  useEffect(() => {
    // console.log(spotId);
    dispatch(getSpotWithId(spotId));
  }, [dispatch]);

  return (
    <div className="spot-detail-container">
      <h1 className="title">{spot.name}</h1>
      <h3>
        {spot.city}, {spot.state}, {spot.country}
      </h3>
      <div className="preview-picture">
        <img src={url} alt="" />
      </div>
      <div className="spot-details">
        <h2>{spot.description}</h2>
        <h3>${spot.price} night</h3>
      </div>
      <div className="edit-spot-section">
        {sessionUser && sessionUser.id === spot.ownerId && <UpdateFormModal />}
      </div>
      <div className="current-user-booking-section">
        <CurrentUserBooking />
      </div>
      <div className="booking-form-section">
        <BookingForm />
      </div>
    </div>
  );
};

export default SpotDetail;
