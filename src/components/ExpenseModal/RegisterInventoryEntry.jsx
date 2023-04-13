import React from 'react'

// CHAKRA UI IMPORTS
import {
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

import {
  AddIcon,
  CloseIcon,
  DeleteIcon,
  CheckIcon,
  EditIcon
} from '@chakra-ui/icons'

import SelectEntityFormControl from '../Input/SelectEntityFormControl'
import DateFormControl from '../Input/DateFormControl'
import TextFormControl from '../Input/TextFormControl'
import PriceFormControl from '../Input/PriceFormControl'
import UnitMeasureFormControl from '../Input/UnitMeasureFormControl'

const RegisterInventoryEntry = ({
  expenseHook,
  inventoryInputHook,
  isFromExpense
}) => {
  return (
    <>
      <ModalHeader color='acsys.titleColor' fontWeight='700' fontSize='25px'>
        Registrar entrada de inventario
      </ModalHeader>
      <ModalCloseButton color={'acsys.titleColor'} />

      <ModalBody pb={3}>
        <Stack direction='column' spacing={3}>
          <Stack direction={'row'} spacing={4}>
            <SelectEntityFormControl
              labelName='Proveedor'
              paddingSpace={0}
              value={inventoryInputHook.provider}
              onSelect={data => {
                inventoryInputHook.setProvider(data)
                inventoryInputHook.setProviderId(data._id)
                expenseHook.setCreditorProvider(data)
                expenseHook.setCreditorProviderId(data._id)
              }}
              isSubmited={inventoryInputHook.isSubmited}
              entityList={inventoryInputHook.providersList}
              isRequired={true}
              isRequiredMessage='Este campo es obligatorio'
              //   width={'250px'}
            />
            <DateFormControl
              labelName='Fecha de entrada'
              //   width='330px'
              paddingSpace={0}
              value={inventoryInputHook.date}
              onInput={data => {
                inventoryInputHook.setDate(data)
                expenseHook.setDate(data)
              }}
              isSubmited={inventoryInputHook.isSubmited}
              isRequiredMessage='Este campo es obligatorio'
              isRequired={true}
            />
            <TextFormControl
              labelName='Nº de entrada'
              //   width='330px'
              paddingSpace={0}
              value={inventoryInputHook.numberOfInput}
              onInput={data => inventoryInputHook.setNumberOfInput(data)}
              isSubmited={inventoryInputHook.isSubmited}
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
                value={inventoryInputHook.rawMaterial}
                onSelect={data => {
                  inventoryInputHook.setRawMaterial(data)
                  inventoryInputHook.setUnitMeasure(data.unitMeasure.uiName)
                }}
                entityList={inventoryInputHook.materialsList}
                // width={'250px'}
              />
              <UnitMeasureFormControl
                labelName='Cantidad'
                unitMeasure={inventoryInputHook.unitMeasure}
                value={inventoryInputHook.amount}
                onInput={data => inventoryInputHook.setAmount(data)}
              />
              <PriceFormControl
                labelName='Precio'
                value={inventoryInputHook.price}
                onInput={data => inventoryInputHook.setPrice(data)}
              />
              <Flex alignItems={'flex-end'}>
                <Stack
                  hidden={!inventoryInputHook.isMaterialListEditing}
                  direction={'row'}
                >
                  <IconButton
                    size={'sm'}
                    height={'35px'}
                    isDisabled={
                      inventoryInputHook.unitMeasure === '' ||
                      inventoryInputHook.amount === '' ||
                      inventoryInputHook.price === ''
                    }
                    backgroundColor={'acsys.primaryColor'}
                    colorScheme='linkedin'
                    _hover={{ backgroundColor: '#098bb6' }}
                    icon={<CheckIcon />}
                    // colorScheme='blue'
                    onClick={inventoryInputHook.onEditMaterial}
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
                      inventoryInputHook.setIsMaterialListEditing(false)
                      inventoryInputHook.setRawMaterial({ uiName: '' })
                      inventoryInputHook.setUnitMeasure('')
                      inventoryInputHook.setAmount('')
                      inventoryInputHook.setPrice('')
                    }}
                  />
                </Stack>

                <IconButton
                  size={'sm'}
                  hidden={inventoryInputHook.isMaterialListEditing}
                  height={'35px'}
                  isDisabled={
                    inventoryInputHook.unitMeasure === '' ||
                    inventoryInputHook.amount === '' ||
                    inventoryInputHook.price === ''
                  }
                  backgroundColor={'acsys.primaryColor'}
                  colorScheme='linkedin'
                  _hover={{ backgroundColor: '#098bb6' }}
                  icon={<AddIcon />}
                  // colorScheme='blue'
                  onClick={inventoryInputHook.onClickAddMaterial}
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
                    {inventoryInputHook.listOfMaterials.map(
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
                                    inventoryInputHook.isMaterialListEditing
                                  }
                                  size='xs'
                                  color='acsys.fontColor'
                                  icon={<EditIcon />}
                                  onClick={() => {
                                    inventoryInputHook.setIsMaterialListEditing(
                                      true
                                    )
                                    inventoryInputHook.setIndexOfMaterialToEdit(
                                      index
                                    )
                                    inventoryInputHook.setRawMaterial(
                                      material.rawMaterial
                                    )
                                    inventoryInputHook.setUnitMeasure(
                                      material.rawMaterial.unitMeasure.uiName
                                    )
                                    inventoryInputHook.setAmount(
                                      material.amount
                                    )
                                    inventoryInputHook.setPrice(material.price)
                                  }}
                                />
                                <IconButton
                                  isDisabled={
                                    inventoryInputHook.isMaterialListEditing
                                  }
                                  size={'xs'}
                                  icon={<DeleteIcon />}
                                  color='acsys.fontColor'
                                  _hover={
                                    !inventoryInputHook.isMaterialListEditing
                                      ? {
                                          color: 'acsys.redColor',
                                          cursor: 'pointer'
                                        }
                                      : {}
                                  }
                                  onClick={() => {
                                    inventoryInputHook.onRemoveMaterial(index)
                                  }}
                                />
                              </Stack>
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
                      <Th>{inventoryInputHook.totalPrice} Bs.</Th>

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
          justifyContent={isFromExpense ? 'space-between' : 'flex-end'}
          width={'100%'}
        >
          <Button
            backgroundColor={'acsys.primaryColor'}
            _hover={{ backgroundColor: '#098bb6' }}
            colorScheme='linkedin'
            // isLoading={expenseHook.isLoading}
            onClick={() => {
              expenseHook.setPage(prev => prev - 1)
            }}
            hidden={!isFromExpense}
          >
            Anterior
          </Button>
          <Button
            backgroundColor={'acsys.primaryColor'}
            _hover={{ backgroundColor: '#098bb6' }}
            colorScheme='linkedin'
            // isLoading={expenseHook.isLoading}
            onClick={() => {
              const validate = inventoryInputHook.validateRequiredFields()
              expenseHook.setAmount(inventoryInputHook.totalPrice)
              if (validate) expenseHook.setPage(prev => prev + 1)
            }}
          >
            Siguiente
          </Button>
        </Stack>
      </ModalFooter>
    </>
  )
}

export default RegisterInventoryEntry
