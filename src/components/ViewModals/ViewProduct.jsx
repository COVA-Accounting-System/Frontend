import React from 'react'

import { useSelector } from 'react-redux'

import {
  Stack,
  Container,
  UnorderedList,
  ListItem,
  Flex,
  Heading,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton
} from '@chakra-ui/react'

const ViewProduct = ({ isOpen, onClose }) => {
  const actualProduct = useSelector(state => state.products.actualProduct)

  return (
    <Modal isOpen={isOpen} onClose={onClose} size='md'>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader color='acsys.titleColor' fontWeight='700' fontSize='25px'>
          Ver producto
        </ModalHeader>
        <ModalCloseButton color={'acsys.titleColor'} />
        <ModalBody>
          <Stack spacing={7}>
            <Stack>
              <Flex direction='column' rowGap='7px'>
                <Heading color={'acsys.fontColor'} as='h5' size='xs'>
                  Producto:{' '}
                </Heading>
                <Text color={'acsys.iconColor'}>
                  {actualProduct.productName}
                </Text>
              </Flex>
            </Stack>
            <Stack spacing={'50px'} direction='row'>
              <Stack spacing={7}>
                <Flex direction='column' rowGap='7px'>
                  <Heading color={'acsys.fontColor'} as='h5' size='xs'>
                    Tipo de unidad:{' '}
                  </Heading>
                  <Text color={'acsys.iconColor'}>
                    {actualProduct.productType}
                  </Text>
                </Flex>
                <Flex direction='column' rowGap='7px'>
                  <Heading color={'acsys.fontColor'} as='h5' size='xs'>
                    {`Precio por ${actualProduct.productType}:`}
                  </Heading>
                  <Text color={'acsys.iconColor'}>
                    {actualProduct.productPrice} Bs.
                  </Text>
                </Flex>
                <Flex direction='column' rowGap='7px'>
                  <Heading color={'acsys.fontColor'} as='h5' size='xs'>
                    Precio por docena:{' '}
                  </Heading>
                  <Text color={'acsys.iconColor'}>
                    {actualProduct.productDozenPrice} Bs.
                  </Text>
                </Flex>
              </Stack>
              <Stack maxW={'220px'} maxH={'100px'}>
                {' '}
                <Flex direction='column' rowGap='7px'>
                  <Heading color={'acsys.fontColor'} as='h5' size='xs'>
                    Características
                  </Heading>
                  <Container overflowY={'auto'} p={0}>
                  <UnorderedList  maxH={'175px'} >
                    {actualProduct.productFeatures !== undefined
                      ? actualProduct.productFeatures.map(feature => {
                          return (
                            <ListItem 
                            color={'acsys.iconColor'} >
                              <Text color={'acsys.iconColor'}>
                                {feature.description}
                              </Text>
                            </ListItem>
                          )
                        })
                      : null}
                  </UnorderedList>
                  </Container>
                 
                </Flex>
              </Stack>
            </Stack>
          </Stack>
        </ModalBody>

        <ModalFooter
          mt={6}
          borderBottomLeftRadius={'5'}
          borderBottomRightRadius={'5'}
          padding={'5px'}
          bgColor={'acsys.primaryColor'}
        ></ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default ViewProduct
