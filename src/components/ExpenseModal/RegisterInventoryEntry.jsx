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

// HOOKS IMPORTS
import { useInventoryInput } from '../../hooks/useInventoryInput'

import { Button } from '../Button/Button'

const RegisterInventoryEntry = ({ expenseHook, setPages }) => {
  const inventoryInputHook = useInventoryInput()
  return (
    <>
      <ModalHeader color='acsys.titleColor' fontWeight='700' fontSize='25px'>
        Registrar entrada de inventario
      </ModalHeader>
      <ModalCloseButton color={'acsys.titleColor'} />

      <ModalBody pb={3}>
        <Stack direction='column' spacing={3} pl={2}>
          <Stack direction={'row'} spacing={4}>
            <SelectEntityFormControl
              labelName='Proveedor'
              paddingSpace={0}
              value={inventoryInputHook.provider}
              onSelect={data => {
                inventoryInputHook.setProvider(data)
                inventoryInputHook.setProviderId(data._id)
                expenseHook.creditorProvider(data)
                expenseHook.creditorProvider(data._id)
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
              onInput={data => inventoryInputHook.setDate(data)}
              isSubmited={inventoryInputHook.isSubmited}
              isRequiredMessage='Este campo es obligatorio'
              isRequired={true}
            />
            <TextFormControl
              labelName='Nº de pedido'
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
                labelName='Modelo'
                value={inventoryInputHook.rawMaterial}
                onSelect={data => {
                  inventoryInputHook.setRawMaterial(data)
                }}
                entityList={inventoryInputHook.materialsList}
                // width={'250px'}
              />
              <UnitMeasureFormControl
                labelName='Cantidad'
                unitMeasure={'m2'}
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
                    <Tr>
                      <Td>1</Td>
                      <Td>Cuero mojado</Td>
                      <Td>2 m2</Td>
                      <Td>500 Bs.</Td>
                      <Td>
                        <DeleteIcon
                          fontSize={14}
                          _hover={{ color: 'red.500', cursor: 'pointer' }}
                        />
                      </Td>
                    </Tr>
                    <Tr>
                      <Td>2</Td>
                      <Td>Cuero mojado</Td>
                      <Td>2 m2</Td>
                      <Td>500 Bs.</Td>
                      <Td>
                        {' '}
                        <DeleteIcon
                          fontSize={14}
                          _hover={{ color: 'red.500', cursor: 'pointer' }}
                        />
                      </Td>
                    </Tr>
                    <Tr>
                      <Td>3</Td>
                      <Td>Cuero mojado</Td>
                      <Td>2 m2</Td>
                      <Td>500 Bs.</Td>
                      <Td>
                        {' '}
                        <DeleteIcon
                          fontSize={14}
                          _hover={{ color: 'red.500', cursor: 'pointer' }}
                        />
                      </Td>
                    </Tr>
                  </Tbody>
                </Table>
              </TableContainer>
            </Stack>
          </Stack>
        </Stack>
      </ModalBody>
      <ModalFooter>
        <Button
          label='Anterior'
          type='confirm'
          onClick={
            // expenseHook.action === 'create'
            //   ? expenseHook.onClickSave
            //   : expenseHook.onEditSave
            () => setPages([true, false, false])
          }
        />
        <Button
          label='Siguiente'
          type='confirm'
          onClick={
            // expenseHook.action === 'create'
            //   ? expenseHook.onClickSave
            //   : expenseHook.onEditSave
            () => setPages([false, true, false])
          }
        />
      </ModalFooter>
    </>
  )
}

export default RegisterInventoryEntry
