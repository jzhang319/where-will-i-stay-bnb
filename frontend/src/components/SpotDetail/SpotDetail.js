import "./SpotDetail.css";
import { NavLink, useParams, useHistory } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getSpotWithId } from "../../store/spot";
import defaultImage from "../../img/default-image.webp";

const SpotDetail = () => {
  // const sessionUser = useSelector((state) => state.session.user);
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
      <div></div>
    </div>
  );
};

export default SpotDetail;
