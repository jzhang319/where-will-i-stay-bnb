import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { updateSpot } from "../../store/spot";

const UpdateForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);

    dispatch(
      updateSpot({
        name,
        description,
        price,
      })
    )
      .then(() => history.push("/"))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.error) setErrors(data.errors);
      });
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
        <button type="submit">UPDATE</button>
      </div>
    </form>
  );
};

export default UpdateForm;
