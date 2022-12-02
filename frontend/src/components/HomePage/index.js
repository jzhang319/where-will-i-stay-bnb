import "./HomePage.css";
import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllSpots } from "../../store/spot";
import defaultImage from "../../img/default-image.webp";

const HomePage = () => {
  const dispatch = useDispatch();

  const allSpots = useSelector((state) => Object.values(state.spot));

  // console.log(allSpots.previewImage, ` <---`);

  useEffect(() => {
    dispatch(getAllSpots());
  }, []);

  return (
    <div className="homepage-container">
      {allSpots.map((spot) => {
        if (spot.previewImage === "no preview image found")
          spot.previewImage = defaultImage;
        return (
          <div className="each-spot">
            <NavLink
              className="spot-link"
              key={spot.id}
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
                <div className="updated-at">{spot.updatedAt}</div>
                <div className="price">${spot.price} night</div>
              </div>
            </NavLink>
          </div>
        );
      })}
    </div>
  );
};

export default HomePage;
