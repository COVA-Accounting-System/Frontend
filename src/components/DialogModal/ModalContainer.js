import React from "react";
import ConfirmationModal from "./ConfirmationModal";
import Modal from "react-modal";
import "./DialogModal.scss";

const ModalContainer = ({
  isOpen,
  onRequestClose,
  onConfirmAction,
  identity,
}) => {
  Modal.setAppElement("#root");
  return (
    <>
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        className="modal-container"
        overlayClassName="overlay"
      >
        <ConfirmationModal
          identity={identity}
          onClickCancel={onRequestClose}
          onConfirmAction={onConfirmAction}
        />
      </Modal>
    </>
  );
};

export default ModalContainer;
