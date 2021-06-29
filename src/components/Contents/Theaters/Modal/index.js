import React from "react";
import ReactDom from "react-dom";
import { FaTimes } from "react-icons/fa";

function Modal({ isOpen, setIsOpen, children, onClose }) {
  if (!isOpen) return null;

  return ReactDom.createPortal(
    <>
      <div className="overlay" onClick={() => setIsOpen(false)}></div>
      <div className="modal-close" onClick={onClose}>
        <FaTimes className="close-icon" />
      </div>
      <div className="cinema-modal">{children}</div>
    </>,
    document.getElementById("portal")
  );
}

export default Modal;
