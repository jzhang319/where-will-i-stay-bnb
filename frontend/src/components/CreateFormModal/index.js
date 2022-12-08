import "./CreateFormModal.css";
import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import CreateForm from "./CreateForm";

function CreateFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className="create-form-btn" onClick={() => setShowModal(true)}>
        Host your home
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <CreateForm setShowModal={setShowModal}/>
        </Modal>
      )}
    </>
  );
}

export default CreateFormModal;
