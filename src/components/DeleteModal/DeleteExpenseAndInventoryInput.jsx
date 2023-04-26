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
  Stack,
  UnorderedList,
  ListItem
} from '@chakra-ui/react'

const DeleteExpenseAndInventoryInput = props => {
  const {
    modalIsOpen,
    onClose,
    onDelete,
    isLoading,
    expenseName,
    inventoryInputName
  } = props
  return (
    <>
      <Modal isOpen={modalIsOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            color='acsys.titleColor'
            fontWeight='700'
            fontSize='25px'
            pb={2}
          >
            Eliminar gasto y salida de inventario
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            color='acsys.subtitleColor'
            fontWeight='500'
            fontSize='15px'
          >
            <p style={{ paddingBottom: '7px' }}>
              Se elimarán los siguientes registros:
            </p>
            <UnorderedList paddingLeft={2}>
              <ListItem>
                {' '}
                <span style={{ fontWeight: '700', fontSize: '14px' }}>
                  Gasto:
                </span>{' '}
                N.º  {expenseName}
              </ListItem>
              <ListItem>
                <span style={{ fontWeight: '700', fontSize: '14px' }}>
                  Salida de inventario:
                </span>{' '}
                N.º  {inventoryInputName && inventoryInputName.numberOfInput}
              </ListItem>
            </UnorderedList>
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

export default DeleteExpenseAndInventoryInput
