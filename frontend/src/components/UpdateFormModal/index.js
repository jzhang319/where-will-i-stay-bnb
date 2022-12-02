import "./UpdateFormModal.css";
import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import UpdateForm from "./UpdateForm";

function UpdateFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className="update-form-btn" onClick={() => setShowModal(true)}>
        Edit
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <UpdateForm setShowModal={setShowModal} />
        </Modal>
      )}
    </>
  );
}

export default UpdateFormModal;
