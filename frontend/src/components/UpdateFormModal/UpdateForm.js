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
  const [errors, setErrors] = useState([]);

  const spot = useSelector((state) => state.spot);
  // console.log(spot, ` <---`);

  useEffect(() => {
    setName(spot.name);
    setDescription(spot.description);
    setPrice(spot.price);
  }, [spot]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);

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
      // (`/spots/${spot.id}`)
      .then(() => setShowModal(false))

      .catch(async (res) => {
        const data = await res.json();
        if (data && data.error) setErrors(data.errors);
      });
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    dispatch(deleteSpot(spotId)).then(() => setShowModal(false));
    history.push("/");
  };

  return (
    <form onSubmit={handleSubmit}>
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
