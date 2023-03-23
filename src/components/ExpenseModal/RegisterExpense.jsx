import React from 'react'

// CHAKRA UI IMPORTS
import {
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Stack,
  ModalFooter
} from '@chakra-ui/react'

import { Button } from '../Button/Button'
import TextFormControl from '../Input/TextFormControl'
import SelectEntityFormControl from '../Input/SelectEntityFormControl'
import PriceFormControl from '../Input/PriceFormControl'
import DateFormControl from '../Input/DateFormControl'

const RegisterExpense = ({ expenseHook, inventoryInputHook }) => {
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
              labelName='Nº de asiento'
              //   width='330px'
              paddingSpace={0}
              value={expenseHook.accountingSeat}
              onInput={data => expenseHook.setAccountingSeat(data)}
              isSubmited={expenseHook.isSubmited}
              isRequired
              isRequiredMessage='Este campo es obligatorio'
              isDisabled={false}
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
                labelName='Empleado'
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
          justifyContent={'space-between'}
          width={'100%'}
        >
          <Button
            label='Anterior'
            type='confirm'
            onClick={() => expenseHook.setPage(prev => prev - 1)}
          />
          <Button
            label='Guardar'
            type='confirm'
            onClick={
              expenseHook.typeOfExpense.rawMaterial
                ? async () => {
                    const response = await inventoryInputHook.onClickSave()
                    expenseHook.onClickSaveRawMaterial(response.data)
                  }
                : expenseHook.typeOfExpense.labour
                ? expenseHook.onClickSaveLabour
                : expenseHook.onClickSaveIndirectCosts
            }
          />
        </Stack>
      </ModalFooter>
    </>
  )
}

export default RegisterExpense
