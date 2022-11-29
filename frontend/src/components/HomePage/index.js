import homePic from "../../img/homePic.webp";
import "./HomePage.css";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllSpots } from "../../store/spot";

const HomePage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllSpots());
  }, []);

  return (
    <div className="homepage-div">
      <h1>Home Page</h1>
      <h2>detail for page</h2>
      <img className="homepagePic" src={homePic} alt="homePage Pic" />
    </div>
  );
};

export default HomePage;
