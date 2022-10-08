import React from "react";
import Modal from "react-modal";
import ConfirmationModal from "./DeleteModal/ConfirmationModal";
import ClientForm from "./CreateModal/ClientForm";
import EmployeeForm from "./CreateModal/EmployeeForm";
import ViewForm from "./ViewModal/ViewForm";
import { useSelector } from "react-redux";
import "./DialogModal.scss";

const ModalContainer = ({ isOpen, onRequestClose }) => {
  const modalAction = useSelector((state) => state.crud.action);
  const entity = useSelector((state) => state.crud.entity);

  const entityForm = {
    client: <ClientForm onRequestClose={onRequestClose} />,
    employee: <EmployeeForm onRequestClose={onRequestClose} />,
  };

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
          <ConfirmationModal onClickCancel={onRequestClose} />
        ) : null}
        {modalAction === "create" ? entityForm[entity] : null}
        {modalAction === "view" ? <ViewForm /> : null}
        {modalAction === "edit" ? entityForm[entity] : null}
      </Modal>
    </>
  );
};

export default ModalContainer;
