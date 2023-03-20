import React from 'react'

// CHAKRA UI IMPORTS
import {
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Stack,
  ModalFooter,
  Divider
} from '@chakra-ui/react'

import SelectEntityFormControl from '../Input/SelectEntityFormControl'
import TextFormControl from '../Input/TextFormControl'
import PriceFormControl from '../Input/PriceFormControl'
import UnitMeasureFormControl from '../Input/UnitMeasureFormControl'

import { Button } from '../Button/Button'

const RegisterInventoryEntry = ({ expenseHook, setPages }) => {
  return (
    <>
      <ModalHeader color='acsys.titleColor' fontWeight='700' fontSize='25px'>
        Registrar entrada de inventario
      </ModalHeader>
      <ModalCloseButton color={'acsys.titleColor'} />

      <ModalBody pb={3}>
        <Stack direction='column' spacing={1} pl={2}>
          <Stack direction={'row'}>
            <SelectEntityFormControl
              labelName='Proveedor'
              paddingSpace={4}
              value={expenseHook.creditorProvider}
              onSelect={data => {
                expenseHook.setCreditorProvider(data)
                expenseHook.setCreditorProviderId(data._id)
              }}
              isSubmited={expenseHook.isSubmited}
              entityList={expenseHook.providersList}
              isRequired={true}
              isRequiredMessage='Este campo es obligatorio'
            />
            <TextFormControl
              labelName='Nº de pedido'
              width='330px'
              paddingSpace={0}
              value={expenseHook.accountingSeat}
              onInput={data => expenseHook.setAccountingSeat(data)}
              isSubmited={expenseHook.isSubmited}
              isRequired
              isRequiredMessage='Este campo es obligatorio'
            />
          </Stack>
          <Divider />
          <Stack direction={'column'}>
            <Stack direction={'row'}>
              {/* <SelectEntityFormControl
                labelName='Modelo'
                paddingSpace={4}
                value={expenseHook.orderProduct}
                onSelect={data => {
                    expenseHook.setOrderProduct(data)
                    expenseHook.setOrderProductId(data._id)
                }}
                entityList={order.productsList}
              />
              <UnitMeasureFormControl
                labelName='Cantidad'
                unitMeasure='m2'
                value={product.productDozenPrice}
                onInput={data => product.setProductDozenPrice(data)}
              />
              <PriceFormControl
                labelName='Precio'
                value={product.productDozenPrice}
                onInput={data => product.setProductDozenPrice(data)}
              /> */}
            </Stack>
            <Stack></Stack>
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
