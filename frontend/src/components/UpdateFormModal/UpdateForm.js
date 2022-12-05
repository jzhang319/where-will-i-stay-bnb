import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { updateSpot, deleteSpot } from "../../store/spot";
import "./UpdateFormModal.css";

const UpdateForm = ({ setShowModal }) => {
  const { spotId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [errors, setErrors] = useState([]);

  const spot = useSelector((state) => state.spot);
  // console.log(spot, ` <---`);

  useEffect(() => {
    setName(spot.name);
    setDescription(spot.description);
    setPrice(spot.price);
    // const err = [];
    // if (spot.name.length >= 50)
    //   err.push("Name can not be longer than 50 characters");
    // if (spot.description.length > 255) err.push("Only allow 255 characters");
    // if (spot.price > 10000) err.push("Please enter a value less than 10000");
    // setErrors(err);
  }, [spot, spot.name, spot.description, spot.price]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setErrors([]);
    setHasSubmitted(true);
    if (errors.length)
      return (
        <div>
          The following errors were found:
          <ul>
            {errors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        </div>
      );
    // alert("Error(s) in the form");

    dispatch(
      updateSpot({
        address: spot.address,
        city: spot.city,
        state: spot.state,
        country: spot.country,
        lat: spot.lat,
        lng: spot.lng,
        name,
        description,
        price,
        id: spotId,
      })
    )
      .then(() => setShowModal(false))

      .catch(async (res) => {
        const data = await res.json();
        if (data && data.error) setErrors(data.errors);
      });
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    dispatch(deleteSpot(spotId))
      .then(() => setShowModal(false))
      .then(() => history.push("/"));
  };

  return (
    <form onSubmit={handleSubmit}>
      {hasSubmitted && errors.length > 0 && (
        <div>
          The following errors were found:
          <ul>
            {errors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        </div>
      )}
      <div className="form-container">
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
      </div>
      <div className="update-form-elements">
        <label>
          Update Name
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <label>
          Update Description
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </label>
        <label>
          Update Price $
          <input
            type="decimal"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </label>
        <button className="update-btn" type="submit">
          UPDATE
        </button>
        <button className="delete-btn" onClick={handleDelete}>
          DELETE Spot
        </button>
      </div>
    </form>
  );
};

export default UpdateForm;
