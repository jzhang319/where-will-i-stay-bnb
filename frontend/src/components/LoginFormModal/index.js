import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import LoginForm from "./LoginForm";
import "./LoginFormModal.css";

function LoginFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <a className="modal-login-btn" onClick={() => setShowModal(true)}>
        Log In
      </a>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <LoginForm />
        </Modal>
      )}
    </>
  );
}

export default LoginFormModal;
