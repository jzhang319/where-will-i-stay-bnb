import "./CurrentUserSpots.css";
import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCurrUserSpots } from "../../store/spot";
import defaultImage from "../../img/default-image.webp";

const CurrentUserSpots = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const allSpots = useSelector((state) => Object.values(state.spot));

  useEffect(() => {
    dispatch(getCurrUserSpots(sessionUser));
  }, []);

  // console.log(allSpots, ` <---`);

  return (
    <div className="current-user-container">
      {allSpots.map((spot) => {
        if (spot.previewImage === "no preview image found")
          spot.previewImage = defaultImage;

        const date = new Date(spot.updatedAt);
        let currDate = date.toDateString();

        return (
          <div key={spot.id} className="each-spot">
            <NavLink
              className="spot-link"
              // key={spot.id}
              to={`/spots/${spot.id}`}
            >
              <div className="spot-img-box">
                <img src={spot.previewImage} alt="" />
              </div>
              <div className="spot-info">
                <div className="city-country">
                  {spot.city},{spot.country}
                </div>
                <div className="spot-description">{spot.description}</div>
                <div className="updated-at">{currDate}</div>
                <div className="price">${spot.price} night</div>
              </div>
            </NavLink>
          </div>
        );
      })}
    </div>
  );
};

export default CurrentUserSpots;
