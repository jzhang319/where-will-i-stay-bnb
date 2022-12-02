import "./CreateFormModal.css";
import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import CreateForm from "./CreateForm";

function UpdateFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className="create-form-btn" onClick={() => setShowModal(true)}>
        bnb your home
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <CreateForm />
        </Modal>
      )}
    </>
  );
}

export default UpdateFormModal;
