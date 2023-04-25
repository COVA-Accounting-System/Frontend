import React from 'react'

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Stack,
  ModalFooter,
  Text,
  TableContainer,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td
} from '@chakra-ui/react'

const RawMaterialUsed = ({ data, modalIsOpen, onClose }) => {
  return (
    <Modal size='lg' onClose={() => onClose()} isOpen={modalIsOpen}>
      <ModalOverlay />
      <ModalContent userSelect='none' maxW='800'>
        <ModalHeader color='acsys.titleColor' fontWeight='700' fontSize='25px'>
          Material utilizado
        </ModalHeader>
        <ModalCloseButton color={'acsys.titleColor'} />

        <ModalBody pb={0}>
          <Stack spacing={3}>
            <Stack border={'1px'} borderColor={'gray.300'} borderRadius={'4px'}>
              <TableContainer
                maxHeight={'300px'}
                overflowY={'auto'}
                borderRadius={'4px'}
              >
                <Table variant='simple' size='sm'>
                  <Thead
                    //stick header
                    position={'sticky'}
                    top={0}
                    zIndex={1}
                    backgroundColor={'white'}
                    boxShadow={'0px 1px 1px rgba(0, 0, 0, 0.05)'}
                  >
                    <Tr>
                      <Th fontSize={'12px'} paddingY={'10px'}>
                        N.º salida
                      </Th>
                      <Th fontSize={'12px'} paddingY={'10px'}>
                        Fecha
                      </Th>
                      <Th fontSize={'12px'} paddingY={'10px'}>
                        Material
                      </Th>
                      <Th fontSize={'12px'} paddingY={'10px'}>
                        Cantidad
                      </Th>
                      <Th fontSize={'12px'} paddingY={'10px'}>
                        Precio estimado
                      </Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {data.listOfInventoryOutputs
                      ? data.listOfInventoryOutputs.map(inventoryOutput =>
                          inventoryOutput.inventoryOutput.listOfMaterials.map(
                            (material, index) => {
                              // setPriceSum(priceSum + material.price)
                              return (
                                <Tr
                                  key={`material-${index}`}
                                  color={'acsys.iconColor'}
                                >
                                  <Td fontSize={'13px'} paddingY={'10px'}>
                                    {
                                      inventoryOutput.inventoryOutput
                                        .numberOfInput
                                    }
                                  </Td>
                                  <Td fontSize={'13px'} paddingY={'10px'}>
                                    {new Date(
                                      inventoryOutput.inventoryOutput.date
                                    ).toLocaleDateString()}
                                  </Td>
                                  <Td fontSize={'13px'} paddingY={'10px'}>
                                    {material.rawMaterial.uiName}
                                  </Td>
                                  <Td fontSize={'13px'} paddingY={'10px'}>
                                    {material.amount}{' '}
                                    {material.rawMaterial.unitMeasure.uiName}
                                  </Td>
                                  <Td fontSize={'13px'} paddingY={'10px'}>
                                    {material.price} Bs.
                                  </Td>
                                </Tr>
                              )
                            }
                          )
                        )
                      : null}
                  </Tbody>
                  <Tfoot>
                    <Tr margin={0} padding={0}>
                      <Th margin={0} padding={0}></Th>
                      <Th margin={0} padding={0}></Th>
                      {/* <Th paddingY={'10px'}>Precio total:</Th>
                  <Th paddingY={'10px'}>{data.orderMaterialCosts} Bs.</Th> */}
                      <Th margin={0} padding={0}></Th>
                    </Tr>
                  </Tfoot>
                </Table>
              </TableContainer>
            </Stack>
            <Stack direction={'row'} justifyContent={'flex-end'}>
              <Stack
                border={'1px'}
                borderColor={'gray.300'}
                borderRadius={'4px'}
                direction={'row'}
                padding={'10px'}

                // width={'100%'}
              >
                <Text
                  color={'acsys.iconColor'}
                  fontSize={'14px'}
                  fontWeight={'medium'}
                >
                  Costo en material:
                </Text>
                <Text
                  color={'acsys.iconColor'}
                  fontSize={'14px'}
                  // fontWeight={'medium'}
                >
                  {data.orderMaterialCosts} Bs.
                </Text>
              </Stack>
            </Stack>
          </Stack>
        </ModalBody>
        <ModalFooter mt={0}></ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default RawMaterialUsed
