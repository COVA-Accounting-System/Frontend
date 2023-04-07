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

const SelectTypeOfIncome = ({ income }) => {
  return (
    <>
      <ModalHeader color='acsys.titleColor' fontWeight='700' fontSize='25px'>
        Seleccione un tipo de ingreso
      </ModalHeader>
      <ModalCloseButton color={'acsys.titleColor'} />

      <ModalBody pb={3}>
        <Stack direction='column' spacing={1} pl={2}>
          <Checkbox
            p={2}
            isChecked={income.incomeTypes.Prepayment}
            _hover={{ bg: 'acsys.backgroundColor', borderRadius: '2px' }}
            colorScheme={'blue'}
            size='md'
            color={'acsys.titleColor'}
            onChange={e => {
              income.emptyFields()
              income.setTypeOfIncome('Pago por adelantado')
              income.setIncomeTypes({
                Prepayment: e.target.checked,
                Payment: false
              })
            }}
          >
            Pago por adelantado
          </Checkbox>
          <Checkbox
            p={2}
            isChecked={income.incomeTypes.Payment}
            _hover={{ bg: 'acsys.backgroundColor', borderRadius: '2px' }}
            colorScheme={'blue'}
            size='md'
            color={'acsys.titleColor'}
            onChange={e => {
              income.emptyFields()
              income.setTypeOfIncome('Pago de pedido entregado')
              income.setIncomeTypes({
                Prepayment: false,
                Payment:  e.target.checked,
              })
            }}
          >
            Pago de pedido entregado
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
            income.incomeTypes.Prepayment ||
            income.incomeTypes.Payment
              ? false
              : true
          }
          onClick={() => income.setPage(prev => prev + 1)}
        >
          Siguiente
        </Button>
      </ModalFooter>
    </>
  )
}

export default SelectTypeOfIncome
