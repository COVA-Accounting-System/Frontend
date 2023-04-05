import React from 'react'
import {
  Stack,
  Flex,
  Heading,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Divider
} from '@chakra-ui/react'

import { useSelector } from 'react-redux'

const ViewEmployee = ({ isOpen, onClose }) => {
  const actualEmployee = useSelector(state => state.employees.actualEmployee)
  return (
    <Modal isOpen={isOpen} onClose={onClose} size='md'>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader></ModalHeader>

        <ModalCloseButton color={'acsys.titleColor'} />
        <ModalBody>
          <Stack direction={'column'} spacing={6}>
            <Stack
              direction={'row'}
              fontSize={'2xl'}
              color={'acsys.iconColor'}
              fontWeight={700}
              mb={6}
              mr={5}
            >
              {actualEmployee.name} {actualEmployee.lastName}
            </Stack>
            <Stack direction={'row'}>
              <Flex direction='column' rowGap={2}>
                <Heading color={'acsys.fontColor'} fontSize={'small'}>
                  Carnet de identidad:{' '}
                </Heading>
                <Text color={'acsys.iconColor'}>{actualEmployee.ci}</Text>
              </Flex>
            </Stack>
            <Stack direction={'row'}>
              <Flex direction='column' rowGap={2}>
                <Heading color={'acsys.fontColor'} as='h5' size='xs'>
                  Fecha de nacimiento:{' '}
                </Heading>
                <Text color={'acsys.iconColor'}>
                  {new Date(actualEmployee.birthday).toLocaleDateString()}
                </Text>
              </Flex>
              <Flex direction='column' rowGap={2}>
                <Heading color={'acsys.fontColor'} as='h5' size='xs'>
                  Nacionalidad:{' '}
                </Heading>
                <Text color={'acsys.iconColor'}>
                  {actualEmployee.nationality}
                </Text>
              </Flex>
            </Stack>
            <Stack direction={'row'}>
              <Flex direction='column' rowGap={1}>
                <Heading color={'acsys.fontColor'} as='h5' size='xs'>
                  Fecha de inicio:{' '}
                </Heading>
                <Text color={'acsys.iconColor'}>
                  {new Date(actualEmployee.startDate).toLocaleDateString()}
                </Text>
              </Flex>
              <Flex direction='column' rowGap={1}>
                <Heading color={'acsys.fontColor'} as='h5' size='xs'>
                  Teléfono:{' '}
                </Heading>
                <Text color={'acsys.iconColor'}>
                  {actualEmployee.phoneCountryCode} {actualEmployee.phoneNumber}
                </Text>
              </Flex>
            </Stack>
          </Stack>
        </ModalBody>

        <ModalFooter
        // mt={6}
        // borderBottomLeftRadius={'5'}
        // borderBottomRightRadius={'5'}
        // padding={'5px'}
        // bgColor={'acsys.primaryColor'}
        ></ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default ViewEmployee
