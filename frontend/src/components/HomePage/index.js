import homePic from "../../img/homePic.webp";
import "./HomePage.css";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllSpots } from "../../store/spot";

const HomePage = () => {
  const dispatch = useDispatch();

  const allSpots = useSelector((state) => Object.values(state.spot));

  console.log(allSpots, ` <---`);

  useEffect(() => {
    dispatch(getAllSpots());
  }, []);

  return (
    <div className="homepage-div">
      {allSpots.map((spot) => {
        return (
          <NavLink key={spot.id} to={`/api/spots/${spot.id}`}>
            <div>{spot.previewImage}</div>
            <div>
              {spot.city},{spot.country}
            </div>
            <div>{spot.updatedAt}</div>
            <div>{spot.price}</div>
          </NavLink>
        );
      })}
      {/* <img className="homepagePic" src={homePic} alt="homePage Pic" /> */}
    </div>
  );
};

export default HomePage;
