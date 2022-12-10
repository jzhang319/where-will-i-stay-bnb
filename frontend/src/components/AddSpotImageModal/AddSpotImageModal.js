import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { addSpotImageThunk } from "../../store/spotImage";

const AddSpotImageForm = ({setShowModal}) => {
  const { spotId } = useParams();
  const dispatch = useDispatch();
  // const history = useHistory();
  const spot = useSelector((state) => state.spot);

  const [url, setUrl] = useState("");
  const [preview, setPreview] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setHasSubmitted(true);
  dispatch(
    addSpotImageThunk({
      spotId,
      url,
      preview,
    })
  )
    .then(() => setShowModal(false))

    .catch(async (res) => {
      const data = await res.json();
      if (data && data.error) setErrors(data.error);
    });

  }

  return (
    <div className="add-spot-image-modal-container">
      <form className="add-image-form" onSubmit={handleSubmit}>
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
            Please enter URL of picture:
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
            />
          </label>
          <label>
            Preview:
            <input
              type="checkbox"
              checked={preview}
              />
            <input
              type="radio"
              value={preview}
              onChange={(e) => setPreview(e.target.value)}
              required
            />
          </label>
          <div className="add-image-button-section">
            <button className="add-image-btn" type="submit">
              ADD IMAGE
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddSpotImageForm;
