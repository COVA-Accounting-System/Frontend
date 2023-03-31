import React from 'react'
// CHAKRA UI IMPORTS
import {
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Stack,
  Checkbox,
  ModalFooter,
  Button
} from '@chakra-ui/react'


const SelectTypeOfExpense = ({ expenseHook, inventoryInputHook }) => {
  return (
    <>
      <ModalHeader color='acsys.titleColor' fontWeight='700' fontSize='25px'>
        Seleccione un tipo de gasto
      </ModalHeader>
      <ModalCloseButton color={'acsys.titleColor'} />

      <ModalBody pb={3}>
        <Stack direction='column' spacing={1} pl={2}>
          <Checkbox
            p={2}
            isChecked={expenseHook.typeOfExpense.rawMaterial}
            _hover={{ bg: 'acsys.backgroundColor', borderRadius: '2px' }}
            colorScheme={'blue'}
            size='md'
            color={'acsys.titleColor'}
            onChange={e => {
              expenseHook.emptyFields()
              inventoryInputHook.emptyFields()
              expenseHook.setTypeOfExpense({
                rawMaterial: e.target.checked,
                labour: false,
                indirectCosts: false
              })
            }}
          >
            Materia prima
          </Checkbox>
          <Checkbox
            p={2}
            isChecked={expenseHook.typeOfExpense.labour}
            _hover={{ bg: 'acsys.backgroundColor', borderRadius: '2px' }}
            colorScheme={'blue'}
            size='md'
            color={'acsys.titleColor'}
            onChange={e => {
              expenseHook.emptyFields()
              inventoryInputHook.emptyFields()
              expenseHook.setTypeOfExpense({
                rawMaterial: false,
                labour: e.target.checked,
                indirectCosts: false
              })
            }}
          >
            Mano de obra directa
          </Checkbox>
          <Checkbox
            p={2}
            isChecked={expenseHook.typeOfExpense.indirectCosts}
            _hover={{ bg: 'acsys.backgroundColor', borderRadius: '2px' }}
            colorScheme={'blue'}
            size='md'
            color={'acsys.titleColor'}
            onChange={e => {
              expenseHook.emptyFields()
              inventoryInputHook.emptyFields()
              expenseHook.setTypeOfExpense({
                rawMaterial: false,
                labour: false,
                indirectCosts: e.target.checked
              })
            }}
          >
            Costos indirectos de fabricación
          </Checkbox>
        </Stack>
      </ModalBody>
      <ModalFooter>
        <Button
          backgroundColor={'acsys.primaryColor'}
          _hover={{ backgroundColor: '#098bb6' }}
          colorScheme='linkedin'
          // isLoading={expenseHook.isLoading}
          isDisabled={
            expenseHook.typeOfExpense.rawMaterial ||
            expenseHook.typeOfExpense.labour ||
            expenseHook.typeOfExpense.indirectCosts
              ? false
              : true
          }
          onClick={() => expenseHook.setPage(prev => prev + 1)}
        >
          Siguiente
        </Button>
      </ModalFooter>
    </>
  )
}

export default SelectTypeOfExpense
