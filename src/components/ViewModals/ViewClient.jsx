import React from 'react'

import { useSelector } from 'react-redux'

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

const ViewClient = ({ isOpen, onClose }) => {
  const actualClient = useSelector(state => state.clients.actualClient)

  return (
    <Modal isOpen={isOpen} onClose={onClose} size='md'>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader></ModalHeader>
        {/* <Divider></Divider> */}
        <ModalCloseButton color={'acsys.titleColor'} />
        <ModalBody pt={0}>
          <Flex
            fontSize={'2xl'}
            color={'acsys.iconColor'}
            fontWeight={700}
            mb={6}
            mr={5}
          >
            {actualClient.name} {actualClient.lastName}
          </Flex>
          <Stack direction='row' spacing={'80px'}>
            <Stack direction='column' spacing='30px'>
              {/* <Flex direction='column' rowGap='7px'>
                <Heading color={'acsys.fontColor'} as='h5' size='xs'>
                  Nombres:{' '}
                </Heading>
                <Text color={'acsys.iconColor'}>{actualClient.name}</Text>
              </Flex> */}
              <Flex direction='column' rowGap='7px'>
                <Heading color={'acsys.fontColor'} as='h5' size='xs'>
                  Teléfono:{' '}
                </Heading>
                <Text color={'acsys.iconColor'}>
                  {actualClient.phoneCountryCode} {actualClient.phoneNumber}
                </Text>
              </Flex>
            </Stack>
            <Stack direction='column' spacing='30px'>
              {/* <Flex direction='column' rowGap='7px'>
                <Heading color={'acsys.fontColor'} as='h5' size='xs'>
                  Apellidos:{' '}
                </Heading>
                <Text color={'acsys.iconColor'}>{actualClient.lastName}</Text>
              </Flex> */}

              <Flex direction='column' rowGap='7px'>
                <Heading color={'acsys.fontColor'} as='h5' size='xs'>
                  Adeuda:{' '}
                </Heading>
                <Text color={'acsys.iconColor'}>500 Bs.</Text>
              </Flex>
            </Stack>
          </Stack>
          <Stack marginTop={'30px'}>
            <Flex direction={'column'} rowGap='7px'>
              <Heading color={'acsys.fontColor'} as='h4' size='xs'>
                Dirección:{' '}
              </Heading>
              <Text color={'acsys.iconColor'}>{actualClient.address}</Text>
            </Flex>
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

export default ViewClient
