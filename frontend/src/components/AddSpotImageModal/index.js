import "./AddSpotImageModal.css";
import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import AddSpotImageForm from "./AddSpotImageModal";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addSpotImageThunk } from "../../store/spotImage";

function AddSpotImageModal() {
  const { spotId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const [showModal, setShowModal] = useState(false);

  const handleDelete = async (e) => {
    e.preventDefault();
    // dispatch(deleteImage(spotId))
    //   .then(() => setShowModal(false))
    //   .then(() => history.push("/"));
  };

  return (
    <>
      Add Image:
      <button className="update-form-btn" onClick={() => setShowModal(true)}>
        ADD IMAGE
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <AddSpotImageForm setShowModal={setShowModal} />
        </Modal>
      )}
      <button className="delete-btn" onClick={handleDelete}>
        DELETE IMAGE
      </button>
    </>
  );
}

export default AddSpotImageModal;
