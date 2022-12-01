import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { Button } from "../Button/Button";

const DeleteModal = (props) => {
  const { modalIsOpen, onClose, entityName, onDelete } = props;

  return (
    <>
      <Modal isOpen={modalIsOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            color={"acsys.titleColor"}
            fontWeight="700"
            fontSize="25px"
          >
            Eliminar {entityName}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody color={"acsys.subtitleColor"} fontWeight="500" fontSize="15px">
            <p>
              ¿Está seguro que desea eliminar este {entityName.toLowerCase()}?
            </p>
          </ModalBody>
          <ModalFooter >
            <Button
              className="button-cancel"
              label={"Eliminar"}
              type={"confirm-delete"}
              onClick={onDelete}
            />
            <Button label={"Cancelar"} type={"cancel"} onClick={onClose} />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default DeleteModal;
