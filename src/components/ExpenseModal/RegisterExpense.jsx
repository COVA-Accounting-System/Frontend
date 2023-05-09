import React from 'react'

// CHAKRA UI IMPORTS
import {
  ModalHeader,
  ModalBody,
  Button,
  ModalCloseButton,
  Stack,
  ModalFooter,
  Box
} from '@chakra-ui/react'

import TextFormControl from '../Input/TextFormControl'
import SelectEntityFormControl from '../Input/SelectEntityFormControl'
import SelectOrderFormControl from '../Input/SelectOrderFormControl'
import PriceFormControl from '../Input/PriceFormControl'
import DateFormControl from '../Input/DateFormControl'
import SelectMultipleOrders from '../Input/SelectMultipleOrders'

const RegisterExpense = ({ expenseHook, inventoryInputHook, isEditMode }) => {
  return (
    <>
      <ModalHeader color='acsys.titleColor' fontWeight='700' fontSize='25px'>
        {isEditMode ? 'Editar gasto' : 'Registrar gasto'}
      </ModalHeader>
      <ModalCloseButton color={'acsys.titleColor'} />

      <ModalBody pb={3}>
        <Stack direction='column' spacing={3} pl={2}>
          <Stack direction={'row'} spacing={4}>
            <TextFormControl
              labelName='Tipo de gasto'
              //   width='330px'
              paddingSpace={0}
              value={
                expenseHook.typeOfExpense.rawMaterial
                  ? 'Materia prima'
                  : expenseHook.typeOfExpense.labour
                  ? 'Mano de obra directa'
                  : 'Costos indirectos de fabricación'
              }
              isSubmited={expenseHook.isSubmited}
              isRequired
              isRequiredMessage='Este campo es obligatorio'
              isDisabled={true}
              // onInput={data => inventoryInputHook.setNumberOfInput(data)}
            />
            <TextFormControl
              labelName='Nº de gasto'
              //   width='330px'
              paddingSpace={0}
              value={expenseHook.accountingSeat}
              onInput={data => expenseHook.setAccountingSeat(data)}
              isSubmited={expenseHook.isSubmited}
              isRequired
              isRequiredMessage='Este campo es obligatorio'
              isDisabled={true}
            />
          </Stack>

          {expenseHook.typeOfExpense.rawMaterial ? (
            <>
              {' '}
              <Stack direction={'row'} spacing={4}>
                <SelectEntityFormControl
                  labelName='Proveedor'
                  paddingSpace={0}
                  value={expenseHook.creditorProvider}
                  isSubmited={expenseHook.isSubmited}
                  isRequired
                  isRequiredMessage='Este campo es obligatorio'
                  entityList={expenseHook.providersList}
                  isDisabled={true}
                  //   width={'250px'}
                />
                <DateFormControl
                  labelName='Fecha de gasto'
                  //   width='330px'
                  paddingSpace={0}
                  value={expenseHook.date}
                  onInput={data => expenseHook.setDate(data)}
                  isDisabled={
                    expenseHook.typeOfExpense.rawMaterial ? true : false
                  }
                  isSubmited={expenseHook.isSubmited}
                  isRequired
                  isRequiredMessage='Este campo es obligatorio'
                />
              </Stack>
              <Stack direction={'row'} spacing={4}>
                <PriceFormControl
                  mt={0}
                  labelName='Monto'
                  value={expenseHook.amount}
                  onInput={data => expenseHook.setAmount(data)}
                  isSubmited={expenseHook.isSubmited}
                  isRequired
                  isRequiredMessage='Este campo es obligatorio'
                  isDisabled={
                    expenseHook.typeOfExpense.rawMaterial ? true : false
                  }
                />
                <TextFormControl
                  labelName='Concepto'
                  // width='330px'
                  paddingSpace={0}
                  value={expenseHook.concept}
                  onInput={data => expenseHook.setConcept(data)}
                  isSubmited={expenseHook.isSubmited}
                  isRequired
                  isRequiredMessage='Este campo es obligatorio'
                />
              </Stack>
            </>
          ) : expenseHook.typeOfExpense.labour ? (
            <>
              {' '}
              <Stack direction={'row'} spacing={4}>
                <SelectEntityFormControl
                  labelName='Operador'
                  paddingSpace={0}
                  value={expenseHook.creditorEmployee}
                  onSelect={data => {
                    expenseHook.setCreditorEmployee(data)
                    expenseHook.setCreditorEmployeeId(data._id)
                  }}
                  isSubmited={expenseHook.isSubmited}
                  isRequired
                  isRequiredMessage='Este campo es obligatorio'
                  entityList={expenseHook.employeesList}
                  isDisabled={false}
                  //   width={'250px'}
                />
                <SelectOrderFormControl
                  labelName='Pedido'
                  paddingSpace={0}
                  value={expenseHook.order}
                  onSelect={data => {
                    expenseHook.setOrder(data)
                    expenseHook.setOrderId(data._id)
                  }}
                  isSubmited={expenseHook.isSubmited}
                  isRequired
                  isRequiredMessage='Este campo es obligatorio'
                  entityList={expenseHook.ordersList}
                  isDisabled={false}
                  //   width={'250px'}
                />
              </Stack>
              <Stack direction={'row'} spacing={4}>
                <PriceFormControl
                  mt={0}
                  labelName='Monto'
                  value={expenseHook.amount}
                  onInput={data => expenseHook.setAmount(data)}
                  isSubmited={expenseHook.isSubmited}
                  isRequired
                  isRequiredMessage='Este campo es obligatorio'
                  isDisabled={
                    expenseHook.typeOfExpense.rawMaterial ? true : false
                  }
                />
                <DateFormControl
                  labelName='Fecha de gasto'
                  //   width='330px'
                  paddingSpace={0}
                  value={expenseHook.date}
                  onInput={data => expenseHook.setDate(data)}
                  isDisabled={
                    expenseHook.typeOfExpense.rawMaterial ? true : false
                  }
                  isSubmited={expenseHook.isSubmited}
                  isRequired
                  isRequiredMessage='Este campo es obligatorio'
                />
              </Stack>
              <Stack direction={'row'} spacing={4}>
                <TextFormControl
                  labelName='Concepto'
                  // width='330px'
                  paddingSpace={0}
                  value={expenseHook.concept}
                  onInput={data => expenseHook.setConcept(data)}
                  isSubmited={expenseHook.isSubmited}
                  isRequired
                  isRequiredMessage='Este campo es obligatorio'
                />
              </Stack>
            </>
          ) : (
            <>
              {' '}
              <Stack direction={'row'} spacing={4}>
                <TextFormControl
                  labelName='Entidad acreedora'
                  //   width='330px'
                  paddingSpace={0}
                  value={expenseHook.creditorEntity}
                  onInput={data => expenseHook.setCreditorEntity(data)}
                  isSubmited={expenseHook.isSubmited}
                  isRequired
                  isRequiredMessage='Este campo es obligatorio'
                  isDisabled={false}
                />
                <DateFormControl
                  labelName='Fecha de gasto'
                  //   width='330px'
                  paddingSpace={0}
                  value={expenseHook.date}
                  onInput={data => expenseHook.setDate(data)}
                  isDisabled={
                    expenseHook.typeOfExpense.rawMaterial ? true : false
                  }
                  isSubmited={expenseHook.isSubmited}
                  isRequired
                  isRequiredMessage='Este campo es obligatorio'
                />
              </Stack>
              <Stack direction={'row'} spacing={4} width={'100%'}>
                <SelectMultipleOrders
                  label={'Pedidos'}
                  ordersList={expenseHook.ordersList}
                  onSelectOrder={(orders) => expenseHook.setOrderList(orders)}
                  isSubmited={expenseHook.isSubmited}
                  selectedOrders={expenseHook.orderList}
                />
              </Stack>
              <Stack direction={'row'} spacing={4}>
                <PriceFormControl
                  mt={0}
                  labelName='Monto'
                  value={expenseHook.amount}
                  onInput={data => expenseHook.setAmount(data)}
                  isSubmited={expenseHook.isSubmited}
                  isRequired
                  isRequiredMessage='Este campo es obligatorio'
                  isDisabled={
                    expenseHook.typeOfExpense.rawMaterial ? true : false
                  }
                />
                <TextFormControl
                  labelName='Concepto'
                  // width='330px'
                  paddingSpace={0}
                  value={expenseHook.concept}
                  onInput={data => expenseHook.setConcept(data)}
                  isSubmited={expenseHook.isSubmited}
                  isRequired
                  isRequiredMessage='Este campo es obligatorio'
                />
              </Stack>
            </>
          )}
        </Stack>
      </ModalBody>
      <ModalFooter>
        <Stack
          direction={'row'}
          justifyContent={
            isEditMode && !expenseHook.typeOfExpense.rawMaterial
              ? 'flex-end'
              : 'space-between'
          }
          width={'100%'}
        >
          <Button
            backgroundColor={'acsys.primaryColor'}
            _hover={{ backgroundColor: '#098bb6' }}
            colorScheme='linkedin'
            // isLoading={expenseHook.isLoading}
            onClick={() => expenseHook.setPage(prev => prev - 1)}
            hidden={isEditMode && !expenseHook.typeOfExpense.rawMaterial}
          >
            Anterior
          </Button>
          <Button
            backgroundColor={'acsys.primaryColor'}
            _hover={{ backgroundColor: '#098bb6' }}
            colorScheme='linkedin'
            isLoading={expenseHook.isLoading}
            onClick={
              expenseHook.typeOfExpense.rawMaterial
                ? expenseHook.action === 'create'
                  ? async () => {
                      const inventoryInputData =
                        await inventoryInputHook.onClickSave()
                      expenseHook.onClickSaveRawMaterial(
                        inventoryInputData,
                        inventoryInputHook.closeModal
                      )
                    }
                  : async () => {
                      const inventoryInputData =
                        await inventoryInputHook.onEditSave()
                      expenseHook.onClickEditRawMaterial(
                        inventoryInputData,
                        inventoryInputHook.closeModal
                      )
                    }
                : expenseHook.typeOfExpense.labour
                ? expenseHook.action === 'create'
                  ? expenseHook.onClickSaveLabour
                  : expenseHook.onClickEditLabour
                : expenseHook.typeOfExpense.indirectCosts
                ? expenseHook.action === 'create'
                  ? expenseHook.onClickSaveIndirectCosts
                  : expenseHook.onClickEditIndirectCosts
                : null
            }
          >
            Guardar
          </Button>
        </Stack>
      </ModalFooter>
    </>
  )
}

export default RegisterExpense
