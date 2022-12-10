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
  const allSpotImages = useSelector((state) => state.spot.SpotImages);
  console.log(allSpotImages, ` <-- allSpotImages`);

  // const allSpotImagesArr = [...allSpotImages];
  // console.log(allSpotImagesArr, ` <-- allSpotImagesArr`);

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
  }, [dispatch, spotId]);

  return (
    <div className="spot-detail-container">
      <h1 className="title">{spot.name}</h1>
      <h3>
        {spot.city}, {spot.state}, {spot.country}
      </h3>
      <div className="picture-section">
        <div className="preview-picture">
          <img src={url} alt="" />
        </div>
        {/* <div className="other-pictures">
          {allSpotImages?.map((img) => {
            return <img key={img.id} url={img.url} />;
          })}
        </div> */}
      </div>
      <div className="spot-details">
        <h2>{spot.description}</h2>
        <h3>${spot.price} night</h3>
      </div>
      <div className="edit-spot-section">
        {sessionUser && sessionUser.id === spot.ownerId && <UpdateFormModal />}
      </div>
      <div className="other-pictures-spot">
        Add Image:
        {sessionUser && sessionUser.id === spot.ownerId && (
          <AddSpotImageModal />
        )}
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
  );
};

export default SpotDetail;
