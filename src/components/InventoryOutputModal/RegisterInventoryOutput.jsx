import React from 'react'

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
  Divider,
  IconButton,
  Flex,
  Box,
  TableContainer,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td
} from '@chakra-ui/react'

import { AddIcon } from '@chakra-ui/icons'
import { DeleteIcon, EditIcon, CheckIcon, CloseIcon } from '@chakra-ui/icons'

import SelectEntityFormControl from '../Input/SelectEntityFormControl'
import SelectOrderFormControl from '../Input/SelectOrderFormControl'
import DateFormControl from '../Input/DateFormControl'
import TextFormControl from '../Input/TextFormControl'
import PriceFormControl from '../Input/PriceFormControl'
import UnitMeasureFormControl from '../Input/UnitMeasureFormControl'

const RegisterInventoryOutput = ({ inventoryOutputHook }) => {
  return (
    <Modal
      size='lg'
      onClose={() => inventoryOutputHook.closeModal()}
      isOpen={inventoryOutputHook.modalIsOpen}
    >
      <ModalOverlay />
      <ModalContent
        userSelect='none'
        maxW='850'
        // maxW={
        //   inventoryOutputHook.page === 0
        //     ? '520'
        //     : inventoryOutputHook.page === 1 &&
        //       inventoryOutputHook.typeOfExpense.rawMaterial
        //     ? '850'
        //     : '650'
        // }
        // transition='max-width 0.3s ease-in-out, height 5s ease-in-out'
      >
        <ModalHeader color='acsys.titleColor' fontWeight='700' fontSize='25px'>
          {inventoryOutputHook.action === 'create'
            ? 'Registrar salida de inventario'
            : 'Editar salida de inventario'}
        </ModalHeader>
        <ModalCloseButton color={'acsys.titleColor'} />

        <ModalBody pb={3}>
          <Stack direction='column' spacing={3}>
            <Stack direction={'row'} spacing={4}>
              <SelectOrderFormControl
                labelName='Pedido'
                paddingSpace={0}
                value={inventoryOutputHook.order}
                onSelect={data => {
                  inventoryOutputHook.setOrder(data)
                  inventoryOutputHook.setOrderId(data._id)
                }}
                isSubmited={inventoryOutputHook.isSubmited}
                entityList={inventoryOutputHook.ordersList}
                isRequired={true}
                isRequiredMessage='Este campo es obligatorio'
                //   width={'250px'}
              />
              <DateFormControl
                labelName='Fecha de salida'
                //   width='330px'
                paddingSpace={0}
                value={inventoryOutputHook.date}
                onInput={data => {
                  inventoryOutputHook.setDate(data)
                }}
                isSubmited={inventoryOutputHook.isSubmited}
                isRequiredMessage='Este campo es obligatorio'
                isRequired={true}
              />
              <TextFormControl
                labelName='Nº de salida'
                //   width='330px'
                paddingSpace={0}
                value={inventoryOutputHook.numberOfInput}
                onInput={data => inventoryOutputHook.setNumberOfInput(data)}
                isSubmited={inventoryOutputHook.isSubmited}
                isRequired
                isRequiredMessage='Este campo es obligatorio'
                isDisabled={true}
              />
              <Box w={'135px'}></Box>
            </Stack>
            <Divider />
            <Stack direction={'column'} spacing={3}>
              <Stack direction={'row'} spacing={4}>
                <SelectEntityFormControl
                  labelName='Material'
                  value={inventoryOutputHook.rawMaterial}
                  onSelect={data => {
                    inventoryOutputHook.setRawMaterial(data)
                    inventoryOutputHook.setUnitMeasure(data.unitMeasure.uiName)
                  }}
                  entityList={inventoryOutputHook.materialsList}
                  // width={'250px'}
                />
                <UnitMeasureFormControl
                  labelName='Cantidad'
                  unitMeasure={inventoryOutputHook.unitMeasure}
                  value={inventoryOutputHook.amount}
                  onInput={data => inventoryOutputHook.setAmount(data)}
                />
                <PriceFormControl
                  labelName='Precio'
                  value={inventoryOutputHook.price}
                  onInput={data => inventoryOutputHook.setPrice(data)}
                />
                <Flex alignItems={'flex-end'}>
                  <Stack
                    hidden={!inventoryOutputHook.isMaterialListEditing}
                    direction={'row'}
                  >
                    <IconButton
                      size={'sm'}
                      height={'35px'}
                      isDisabled={
                        inventoryOutputHook.unitMeasure === '' ||
                        inventoryOutputHook.amount === '' ||
                        inventoryOutputHook.price === ''
                      }
                      backgroundColor={'acsys.primaryColor'}
                      colorScheme='linkedin'
                      _hover={{ backgroundColor: '#098bb6' }}
                      icon={<CheckIcon />}
                      // colorScheme='blue'
                      onClick={inventoryOutputHook.onEditMaterial}
                    />
                    <IconButton
                      size={'sm'}
                      height={'35px'}
                      backgroundColor={'acsys.primaryColor'}
                      colorScheme='linkedin'
                      _hover={{ backgroundColor: '#098bb6' }}
                      icon={<CloseIcon />}
                      // colorScheme='blue'
                      onClick={() => {
                        inventoryOutputHook.setIsMaterialListEditing(false)
                        inventoryOutputHook.setRawMaterial({ uiName: '' })
                        inventoryOutputHook.setUnitMeasure('')
                        inventoryOutputHook.setAmount('')
                        inventoryOutputHook.setPrice('')
                      }}
                    />
                  </Stack>

                  <IconButton
                    hidden={inventoryOutputHook.isMaterialListEditing}
                    size={'sm'}
                    height={'35px'}
                    isDisabled={
                      inventoryOutputHook.unitMeasure === '' ||
                      inventoryOutputHook.amount === '' ||
                      inventoryOutputHook.price === ''
                    }
                    backgroundColor={'acsys.primaryColor'}
                    colorScheme='linkedin'
                    _hover={{ backgroundColor: '#098bb6' }}
                    icon={<AddIcon />}
                    // colorScheme='blue'
                    onClick={inventoryOutputHook.onClickAddMaterial}
                  />
                </Flex>
              </Stack>
              <Stack
                borderColor={'gray.200'}
                borderWidth={'1px'}
                borderRadius={'2px'}
              >
                <TableContainer maxH={'200px'} overflowY={'auto'}>
                  <Table size={'md'}>
                    <Thead color={'acsys.fontColor'}>
                      <Tr>
                        <Th>N.º</Th>
                        <Th>Material</Th>
                        <Th>Cantidad</Th>
                        <Th>Precio</Th>
                        <Th></Th>
                      </Tr>
                    </Thead>
                    <Tbody color={'gray.600'} fontSize={13}>
                      {inventoryOutputHook.listOfMaterials.map(
                        (material, index) => {
                          return (
                            <Tr key={index}>
                              <Td>{index + 1}</Td>
                              <Td>{material.rawMaterial.name}</Td>
                              <Td>
                                {material.amount}{' '}
                                {material.rawMaterial.unitMeasure.uiName}
                              </Td>
                              <Td>{material.price} Bs.</Td>
                              <Td>
                                <Stack direction={'row'}>
                                  <IconButton
                                    isDisabled={
                                      inventoryOutputHook.isMaterialListEditing
                                    }
                                    size='xs'
                                    color='acsys.fontColor'
                                    icon={<EditIcon />}
                                    onClick={() => {
                                      inventoryOutputHook.setIsMaterialListEditing(
                                        true
                                      )
                                      inventoryOutputHook.setIndexOfMaterialToEdit(
                                        index
                                      )
                                      inventoryOutputHook.setRawMaterial(
                                        material.rawMaterial
                                      )
                                      inventoryOutputHook.setUnitMeasure(
                                        material.rawMaterial.unitMeasure.uiName
                                      )
                                      inventoryOutputHook.setAmount(
                                        material.amount
                                      )
                                      inventoryOutputHook.setPrice(
                                        material.price
                                      )
                                    }}
                                  />
                                  <IconButton
                                    isDisabled={
                                      inventoryOutputHook.isMaterialListEditing
                                    }
                                    size={'xs'}
                                    icon={<DeleteIcon />}
                                    color='acsys.fontColor'
                                    _hover={
                                      !inventoryOutputHook.isMaterialListEditing
                                        ? {
                                            color: 'acsys.redColor',
                                            cursor: 'pointer'
                                          }
                                        : {}
                                    }
                                    onClick={() => {
                                      inventoryOutputHook.onRemoveMaterial(
                                        index
                                      )
                                    }}
                                  />
                                </Stack>
                                {/* <DeleteIcon
                                  fontSize={14}
                                  _hover={{
                                    color: 'red.500',
                                    cursor: 'pointer'
                                  }}
                                  onClick={() => {
                                    inventoryOutputHook.onRemoveMaterial(index)
                                  }}
                                /> */}
                              </Td>
                            </Tr>
                          )
                        }
                      )}
                    </Tbody>
                    <Tfoot>
                      <Tr>
                        <Th></Th>
                        <Th></Th>
                        <Th>Total: </Th>
                        <Th>{inventoryOutputHook.estimatedPrice} Bs.</Th>

                        <Th></Th>
                      </Tr>
                    </Tfoot>
                  </Table>
                </TableContainer>
              </Stack>
            </Stack>
          </Stack>
        </ModalBody>
        <ModalFooter>
          <Stack
            direction={'row'}
            // justifyContent={'space-between'}
            // width={'100%'}
          >
            <Button
              backgroundColor={'acsys.primaryColor'}
              _hover={{ backgroundColor: '#098bb6' }}
              colorScheme='linkedin'
              isLoading={inventoryOutputHook.isLoading}
              onClick={
                inventoryOutputHook.action === 'create'
                  ? inventoryOutputHook.onClickSave
                  : inventoryOutputHook.onEditSave
              }
            >
              Guardar
            </Button>
          </Stack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default RegisterInventoryOutput
