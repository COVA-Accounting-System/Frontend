import React from "react";
import Modal from "react-modal";
import ConfirmationModal from "./DeleteModal/ConfirmationModal";
import ClientForm from "./CreateModal/ClientForm";
import ViewForm from "./ViewModal/ViewForm";
import { useSelector } from "react-redux";
import "./DialogModal.scss";

const ModalContainer = ({ isOpen, onRequestClose, onDeleteButtonModal }) => {
  const modalAction = useSelector((state) => state.crud.action);
  Modal.setAppElement("#root");
  return (
    <>
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        className="modal-container"
        overlayClassName="overlay"
      >
        <div className="close-icon" onClick={onRequestClose}>
          <span className="material-symbols-outlined icon-form">close</span>
        </div>
        {modalAction === "delete" ? (
          <ConfirmationModal
            onClickCancel={onRequestClose}
            onClickDelete={onDeleteButtonModal}
          />
        ) : null}
        {modalAction === "create" ? <ClientForm onRequestClose={onRequestClose}
        /> : null}
        {modalAction === "view" ? <ViewForm /> : null}
        {modalAction === "edit" ? <ClientForm /> : null}
      </Modal>
    </>
  );
};

export default ModalContainer;
