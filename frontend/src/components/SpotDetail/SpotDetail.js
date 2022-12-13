import "./SpotDetail.css";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteSpot, getSpotWithId } from "../../store/spot";
import defaultImage from "../../img/default-image.webp";
import UpdateFormModal from "../UpdateFormModal";
import BookingForm from "../BookingForm/BookingForm";
import CurrentSpotBooking from "../CurrentSpotBooking/CurrentSpotBooking";
import AddSpotImageModal from "../AddSpotImageModal";

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

  const otherImgArr = [];
  spot?.SpotImages?.map((img) => {
    if (img.preview === false) {
      otherImgArr.push(img);
    }
  });
  // console.log(otherImgArr, ` <-- otherImgArr`);

  // console.log(spot, ` <---`);
  useEffect(() => {
    // console.log(spotId);
    dispatch(getSpotWithId(spotId));
  }, [dispatch, spotId]);

  return (
    <div className="spot-detail-container">
      <div className="h1-city-info-container">
        <h1 className="title">{spot.name}</h1>
        <h3>
          {spot.city}, {spot.state}, {spot.country}
        </h3>
      </div>
      <div className="picture-section">
        <div className="preview-picture">
          <img className="preview-picture-itself" src={url} alt={spot.name} />
        </div>
        <div className="other-pictures">
          {otherImgArr?.map((img) => {
            return (
              <img
                className="smaller-pictures"
                key={img.id}
                src={img.url}
                alt={spot.name}
              />
            );
          })}
        </div>
      </div>

      <div className="whole-info-container">
        <div className="stuff-before-bookings">
          <div className="spot-details">
            <h2>{spot.description}</h2>
            <h3>${spot.price} night</h3>
          </div>
          <div className="edit-spot-section">
            {sessionUser && sessionUser.id === spot.ownerId && (
              <UpdateFormModal />
            )}
          </div>
          <div className="other-pictures-spot">
            {sessionUser && sessionUser.id === spot.ownerId && (
              <AddSpotImageModal />
            )}
          </div>
        </div>
        <div className="current-booking-bookingform">
          <div className="current-user-booking-section">
            <CurrentSpotBooking />
          </div>
          <div className="booking-form-section">
            <BookingForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpotDetail;
