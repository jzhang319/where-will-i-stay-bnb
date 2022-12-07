import "./UpdateBookingModal.css";
import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import UpdateBookingForm from "./UpdateBookingForm";

const UpdateBookingModal = ({ id }) => {
  const [showModal, setShowModal] = useState(false);
  // console.log(id, ` <--- test here`)
  return (
    <div className="update-booking-btn" onClick={() => setShowModal(true)}>
      <button>EDIT</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <UpdateBookingForm setShowModal={setShowModal} id={id} />
        </Modal>
      )}
    </div>
  );
};

export default UpdateBookingModal;
