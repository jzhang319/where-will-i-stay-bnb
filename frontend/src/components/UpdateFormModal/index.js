import "./UpdateFormModal.css";
import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import UpdateForm from "./UpdateForm";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateSpot, deleteSpot } from "../../store/spot";

function UpdateFormModal() {
  const { spotId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const [showModal, setShowModal] = useState(false);

  const handleDelete = async (e) => {
    e.preventDefault();
    dispatch(deleteSpot(spotId))
      .then(() => setShowModal(false))
      .then(() => history.push("/"));
  };

  return (
    <>
      <button className="update-form-btn" onClick={() => setShowModal(true)}>
        EDIT SPOT
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <UpdateForm setShowModal={setShowModal} />
        </Modal>
      )}
      <button className="delete-btn" onClick={handleDelete}>
        DELETE SPOT
      </button>
    </>
  );
}

export default UpdateFormModal;
