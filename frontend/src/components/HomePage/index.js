import homePic from "../../img/homePic.webp";
import "./HomePage.css";

const HomePage = () => {
  return (
    <div className="homepage-div">
      <h1>Home Page</h1>
      <h2>detail for page</h2>
      <img src={homePic} alt="homePage Pic" />
    </div>
  );
};

export default HomePage;
