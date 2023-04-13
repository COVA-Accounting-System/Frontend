import React from 'react'

// CHAKRA UI IMPORTS
import {
  ModalHeader,
  ModalBody,
  Button,
  ModalCloseButton,
  Stack,
  ModalFooter
} from '@chakra-ui/react'

import TextFormControl from '../Input/TextFormControl'
import SelectEntityFormControl from '../Input/SelectEntityFormControl'
import PriceFormControl from '../Input/PriceFormControl'
import DateFormControl from '../Input/DateFormControl'

const RegisterExpense = ({ expenseHook, inventoryInputHook, isEditMode }) => {
  return (
    <>
      <ModalHeader color='acsys.titleColor' fontWeight='700' fontSize='25px'>
        Registrar gasto
      </ModalHeader>
      <ModalCloseButton color={'acsys.titleColor'} />

      <ModalBody pb={3}>
        <Stack direction='column' spacing={3} pl={2}>
          <Stack direction={'row'} spacing={3}>
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
          <Stack direction={'row'} spacing={3}>
            {expenseHook.typeOfExpense.rawMaterial ? (
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
            ) : expenseHook.typeOfExpense.labour ? (
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
            ) : (
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
            )}

            <DateFormControl
              labelName='Fecha de gasto'
              //   width='330px'
              paddingSpace={0}
              value={expenseHook.date}
              onInput={data => expenseHook.setDate(data)}
              isDisabled={expenseHook.typeOfExpense.rawMaterial ? true : false}
              isSubmited={expenseHook.isSubmited}
              isRequired
              isRequiredMessage='Este campo es obligatorio'
            />
          </Stack>
          <Stack direction={'row'} spacing={3}>
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
            <PriceFormControl
              labelName='Monto'
              value={expenseHook.amount}
              onInput={data => expenseHook.setAmount(data)}
              isSubmited={expenseHook.isSubmited}
              isRequired
              isRequiredMessage='Este campo es obligatorio'
              isDisabled={expenseHook.typeOfExpense.rawMaterial ? true : false}
            />
          </Stack>
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
