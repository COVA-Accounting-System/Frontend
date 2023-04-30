import React, { useState } from 'react'

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  Stack,
  ModalFooter,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
  Container,
  Divider,
  Text,
  Tooltip
} from '@chakra-ui/react'

import { orderState } from '../../assets/orderState'

const ChangeState = ({
  isLoading,
  modalIsOpen,
  onClose,
  actualStateNumber,
  setActualStateNumber,
  onSaveClick,
  orderStateNumber,
  balance,
  clientName
}) => {
  const [showTooltip, setShowTooltip] = useState(false)

  return (
    <Modal size='lg' onClose={() => onClose()} isOpen={modalIsOpen}>
      <ModalOverlay />
      <ModalContent userSelect='none' maxW='500'>
        <ModalHeader color='acsys.titleColor' fontWeight='700' fontSize='25px'>
          Cambiar estado
        </ModalHeader>
        <ModalCloseButton color={'acsys.titleColor'} />

        <ModalBody pb={3}>
          <Divider mt={0} />
          <Container pl={7} pr={10} mt={10}>
            <Slider
              value={actualStateNumber * 33}
              color={'acsys.iconColor'}
              step={33}
              fontSize={'sm'}
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
              onChange={value => setActualStateNumber(value / 33)}
              min={0}
              max={99}
            >
              <SliderMark value={0} mt={4} ml={'-5'}>
                En fila
              </SliderMark>
              <SliderMark value={33} marginLeft={'-12'} mt={4}>
                En producción{' '}
              </SliderMark>
              <SliderMark value={66} marginLeft={'-9'} mt={4}>
                Terminado
              </SliderMark>
              <SliderMark value={99} marginLeft={'-9'} mt={4}>
                Entregado
              </SliderMark>
              <SliderTrack>
                <SliderFilledTrack
                  bgColor={orderState[actualStateNumber].color}
                />
              </SliderTrack>
              <Tooltip
                bgColor={orderState[actualStateNumber].color}
                label={orderState[actualStateNumber].stateSpanish}
                isOpen={showTooltip}
                placement='top'
              >
                <SliderThumb
                  boxSize={5}
                  bgColor={orderState[actualStateNumber].color}
                  boxShadow={'md'}
                />
              </Tooltip>
            </Slider>
          </Container>

          <Divider mt={10} />
          <Stack mt={3}>
            {orderState[orderStateNumber].state !== 'Delivered' &&
            orderState[actualStateNumber].state === 'Delivered' ? (
              <Text color={'acsys.iconColor'} fontSize={'sm'}>
                Si modifica el estado a "Entregado", se agregarán {balance} Bs.
                de deuda a la cuenta de {clientName}.
              </Text>
            ) : orderState[orderStateNumber].state === 'Delivered' &&
              orderState[actualStateNumber].state !== 'Delivered' ? (
              <Text color={'acsys.iconColor'} fontSize={'sm'}>
                Si modifica el estado a "
                {orderState[actualStateNumber].stateSpanish}", se restarán{' '}
                {balance} Bs. de deuda de la cuenta de {clientName}.
              </Text>
            ) : (
              ''
            )}
          </Stack>
        </ModalBody>
        <ModalFooter mt={0}>
          <Stack direction={'row'}>
            <Button
              colorScheme={'gray'}
              // backgroundColor={'#758399'}
              // _hover={{ backgroundColor: '#6d788a' }}
              color='acsys.titleColor'
              onClick={() => onClose()}
              isDisabled={isLoading}
            >
              Cancelar
            </Button>
            <Button
              backgroundColor={'acsys.primaryColor'}
              _hover={{ backgroundColor: '#098bb6' }}
              colorScheme='linkedin'
              isLoading={isLoading}
              onClick={onSaveClick}
              isDisabled={isLoading && actualStateNumber === orderStateNumber}
            >
              Guardar
            </Button>
          </Stack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default ChangeState
