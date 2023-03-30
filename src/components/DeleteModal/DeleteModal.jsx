import React from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Stack
} from '@chakra-ui/react'
// import { Button } from '../Button/Button'

const DeleteModal = props => {
  const { modalIsOpen, onClose, entityName, onDelete, isLoading } = props

  return (
    <>
      <Modal isOpen={modalIsOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            color='acsys.titleColor'
            fontWeight='700'
            fontSize='25px'
          >
            Eliminar {entityName}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            color='acsys.subtitleColor'
            fontWeight='500'
            fontSize='15px'
          >
            <p>
              ¿Está seguro que desea eliminar este {entityName.toLowerCase()}?
            </p>
          </ModalBody>
          <ModalFooter>
            <Stack direction={'row'}>
              <Button
                colorScheme={'gray'}
                // backgroundColor={'#758399'}
                // _hover={{ backgroundColor: '#6d788a' }}
                color='acsys.titleColor'
                onClick={onClose}
                isDisabled={isLoading}
              >
                Cancelar
              </Button>
              <Button
                colorScheme={'red'}
                onClick={onDelete}
                // _hover={{ backgroundColor: '#EE6270' }}
                // backgroundColor={'#EE6270'}
                isLoading={isLoading}
              >
                Eliminar
              </Button>
            </Stack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default DeleteModal
