import React from 'react'

// CHAKRA UI IMPORTS
import {
  ModalHeader,
  ModalBody,
  Button,
  ModalCloseButton,
  Stack,
  ModalFooter,
  Text,
  Flex
} from '@chakra-ui/react'

import TextFormControl from '../Input/TextFormControl'
import SelectEntityFormControl from '../Input/SelectEntityFormControl'
import SelectOrderFormControl from '../Input/SelectOrderFormControl'
import PriceFormControl from '../Input/PriceFormControl'
import DateFormControl from '../Input/DateFormControl'

const RegisterIncome = ({ income }) => {
  return (
    <>
      <ModalHeader color='acsys.titleColor' fontWeight='700' fontSize='25px'>
        {income.action === 'create' ? 'Registrar ingreso' : 'Editar ingreso'}
      </ModalHeader>
      <ModalCloseButton color={'acsys.titleColor'} />

      <ModalBody pb={3}>
        <Stack direction={'column'} spacing={4}>
          <Stack direction={'row'} spacing={5} maxW={'290px'}>
            {' '}
            <TextFormControl
              labelName='N.º de ingreso'
              //   width='290px'
              isDisabled={true}
              paddingSpace={0}
              value={income.accountingSeat}
              onInput={data => income.setAccountingSeat(data)}
              isSubmited={income.isSubmited}
              isRequired
              isRequiredMessage='Este campo es obligatorio'
            />
          </Stack>
          <Stack direction={'row'} spacing={5}>
            {' '}
            <TextFormControl
              labelName='Tipo de ingreso'
              // width='330px'
              isDisabled={true}
              paddingSpace={0}
              value={income.typeOfIncome}
              //   onInput={data => income.se(data)}
              isSubmited={income.isSubmited}
              isRequired
              isRequiredMessage='Este campo es obligatorio'
            />
            <DateFormControl
              labelName='Fecha de ingreso'
              // width='330px'
              paddingSpace={0}
              value={income.date}
              onInput={data => income.setDate(data)}
              isSubmited={income.isSubmited}
              isRequired={true}
              isRequiredMessage='Este campo es obligatorio'
            />
          </Stack>
          <Stack direction={'row'} spacing={5}>
            {' '}
            <SelectEntityFormControl
              labelName='Cliente'
              value={income.client}
              onSelect={data => {
                income.setClient(data)
                income.setClientId(data._id)
              }}
              isSubmited={income.isSubmited}
              entityList={income.clientsList}
              isDisabled={income.action !== 'create'}
              isRequired={true}
              isRequiredMessage='Este campo es obligatorio'
            />
            <SelectOrderFormControl
              labelName='Pedido'
              paddingSpace={4}
              value={income.order}
              onSelect={data => {
                income.setOrder(data)
                income.setOrderId(data._id)
              }}
              isSubmited={income.isSubmited}
              entityList={
                income.ordersList
                  ? income.typeOfIncome === 'Pago por adelantado'
                    ? income.ordersList.filter(
                        income.filterAtSelectClientPrepayment
                      )
                    : income.typeOfIncome === 'Pago por venta'
                    ? income.ordersList.filter(
                        income.filterAtSelectClientPayment
                      )
                    : []
                  : []
              }
              isRequired={true}
              isRequiredMessage='Este campo es obligatorio'
              isDisabled={
                income.action === 'create'
                  ? income.clientId === ''
                    ? true
                    : false
                  : true
              }
            />
          </Stack>
          <Stack direction={'row'} spacing={5} justifyContent={'space-between'}>
            <Stack direction={'column'} width={'100%'}>
              <PriceFormControl
                mt='0'
                labelName='Monto'
                value={income.amount}
                onInput={data => income.setAmount(data)}
                isSubmited={income.isSubmited}
                maxAllowed={
                  income.order.orderBalance >= 0
                    ? income.action === 'create'
                      ? income.order.orderBalance
                      : income.order.orderBalance + income.oldAmount
                    : Number.MAX_SAFE_INTEGER
                }
                isRequired
                isRequiredMessage='Este campo es obligatorio'
              />
              <Text fontSize={'xs'} color='acsys.iconColor'>
                {income.order.orderBalance >= 0
                  ? income.action === 'create'
                    ? `Saldo actual: ${
                        income.order.orderBalance - income.amount
                      } Bs.`
                    : `Saldo actual: ${
                        income.order.orderBalance -
                        (income.amount - income.oldAmount)
                      } Bs.`
                  : ''}
              </Text>
            </Stack>
            <Stack width={'100%'}>
              <TextFormControl
                labelName='Concepto'
                value={income.concept}
                onInput={data => income.setConcept(data)}
                isSubmited={income.isSubmited}
                isRequired
                isRequiredMessage='Este campo es obligatorio'
              />
            </Stack>
          </Stack>
        </Stack>
      </ModalBody>

      <ModalFooter>
        <Flex
          justifyContent={
            income.action === 'create' ? 'space-between' : 'flex-end'
          }
          width={'100%'}
        >
          <Button
            backgroundColor={'acsys.primaryColor'}
            _hover={{ backgroundColor: '#098bb6' }}
            colorScheme='linkedin'
            // isLoading={expenseHook.isLoading}
            onClick={() => income.setPage(prev => prev - 1)}
            hidden={income.action === 'edit'}
          >
            Anterior
          </Button>
          <Button
            backgroundColor={'acsys.primaryColor'}
            _hover={{ backgroundColor: '#098bb6' }}
            colorScheme='linkedin'
            isLoading={income.isLoading}
            onClick={
              income.action === 'create'
                ? income.onClickSave
                : income.onEditSave
            }
          >
            Guardar
          </Button>
        </Flex>
      </ModalFooter>
    </>
  )
}

export default RegisterIncome
