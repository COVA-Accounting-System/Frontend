import React, { useEffect, useState } from 'react'

import Select from 'react-select'
import { Box, FormControl, FormLabel, FormErrorMessage } from '@chakra-ui/react'

import useReactSelectChakraStyles from '../../hooks/useReactSelectChakraStyles'

const SelectMultipleOrders = ({
  label,
  ordersList,
  onSelectOrder,
  selectedOrders,
  isSubmited
}) => {
  const [options, setOptions] = useState([])
  const [selectedOptions, setSelectedOptions] = useState([])
  const selectStyles = useReactSelectChakraStyles()

  useEffect(() => {
    if (ordersList !== undefined) {
      const formatedOptions = ordersList.map(order => {
        return {
          value: order._id,
          label: `Pedido #${order.orderNumber} - ${order.orderProduct.uiName}`
        }
      })
      setOptions(formatedOptions)
    }
  }, [ordersList])

  useEffect(() => {
    if (selectedOrders !== undefined && ordersList !== undefined) {
      const formatedSelectedOptions = selectedOrders.map(selectedOrder => {
        const order = ordersList.find(
          order => order._id === selectedOrder.order
        )
        return {
          value: order._id,
          label: `Pedido #${order.orderNumber} - ${order.orderProduct.uiName}`
        }
      })
      setSelectedOptions(formatedSelectedOptions)
    }
  }, [selectedOrders, ordersList])

  const handleOnChange = orders => {
    const listOfOrders = orders.map(order => ({
      order: order.value
    }))
    onSelectOrder(listOfOrders)
  }

  const isError = isSubmited && selectedOrders.length === 0

  return (
    <FormControl isRequired={true} isInvalid={true}>
      <FormLabel
        color='acsys.subtitleColor'
        mb='1'
        fontWeight='600'
        fontSize='13px'
      >
        {label}
      </FormLabel>
      <Box width={'100%'}>
        {' '}
        <Select
          value={selectedOptions}
          closeMenuOnSelect={false}
          styles={isError ? selectStyles.error : selectStyles.normal}
          options={options}
          isMulti={true}
          placeholder={'Seleccione los pedidos beneficiados con este gasto'}
          onChange={orders => handleOnChange(orders)}
        />
      </Box>
      {isError && (
        <FormErrorMessage>Seleccione al menos un pedido</FormErrorMessage>
      )}
    </FormControl>
  )
}

export default SelectMultipleOrders
