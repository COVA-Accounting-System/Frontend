import React from 'react'

// CHAKRA UI IMPORTS
import {
  ModalHeader,
  ModalBody,
  ModalCloseButton,
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
import { DeleteIcon } from '@chakra-ui/icons'

import SelectEntityFormControl from '../Input/SelectEntityFormControl'
import DateFormControl from '../Input/DateFormControl'
import TextFormControl from '../Input/TextFormControl'
import PriceFormControl from '../Input/PriceFormControl'
import UnitMeasureFormControl from '../Input/UnitMeasureFormControl'

import { Button } from '../Button/Button'

const RegisterInventoryEntry = ({ expenseHook, inventoryInputHook }) => {
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
              //   widht='330px'
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
                }}
                entityList={inventoryInputHook.materialsList}
                // width={'250px'}
              />
              <UnitMeasureFormControl
                labelName='Cantidad'
                unitMeasure={
                  inventoryInputHook.rawMaterial._id !== undefined
                    ? inventoryInputHook.rawMaterial.unitMeasure.abbreviation
                    : ''
                }
                value={inventoryInputHook.amount}
                onInput={data => inventoryInputHook.setAmount(data)}
              />
              <PriceFormControl
                labelName='Precio'
                value={inventoryInputHook.unitPrice}
                onInput={data => inventoryInputHook.setUnitPrice(data)}
              />
              <Flex alignItems={'flex-end'}>
                <IconButton
                  isDisabled={
                    inventoryInputHook.rawMaterial === '' ||
                    inventoryInputHook.amount === '' ||
                    inventoryInputHook.unitPrice === ''
                  }
                  backgroundColor={'acsys.primaryColor'}
                  _hover={{ boxShadow: '0px 3px 10px #a3aab7' }}
                  icon={<AddIcon />}
                  colorScheme='blue'
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
                              {material.amount} {material.unitMeasure}
                            </Td>
                            <Td>{material.unitPrice}</Td>
                            <Td>
                              <DeleteIcon
                                fontSize={14}
                                _hover={{ color: 'red.500', cursor: 'pointer' }}
                                onClick={() => {
                                  inventoryInputHook.onRemoveMaterial(index)
                                }}
                              />
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
          justifyContent={'space-between'}
          width={'100%'}
        >
          <Button
            label='Anterior'
            type='confirm'
            onClick={
              () => {
                expenseHook.setPage(prev => prev - 1)
              }
            }
          />
          <Button
            label='Siguiente'
            type='confirm'
            onClick={() => {
              const validate = inventoryInputHook.validateRequiredFields()
              expenseHook.setAmount(inventoryInputHook.totalPrice)
              if (validate) expenseHook.setPage(prev => prev + 1)
            }}
          />
        </Stack>
      </ModalFooter>
    </>
  )
}

export default RegisterInventoryEntry
