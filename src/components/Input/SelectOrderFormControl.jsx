import React from 'react'

import {
  FormControl,
  Select,
  FormLabel,
  FormErrorMessage
} from '@chakra-ui/react'

const SelectOrderFormControl = ({
  labelName,
  onSelect,
  value,
  width,
  paddingSpace,
  entityList,
  isSubmited,
  isRequired,
  isRequiredMessage,
  isDisabled,
  isReadOnly = false
}) => {

  const isError = isSubmited && value._id === undefined
  return (
    <FormControl mt={paddingSpace} isInvalid={isError} isRequired={isRequired}>
      <FormLabel
        color='acsys.subtitleColor'
        mb='1'
        fontWeight='600'
        fontSize='13px'
      >
        {labelName}
      </FormLabel>
      <Select
        height='35px'
        fontSize='15px'
        color={isDisabled ? 'gray.900 !important' : 'acsys.iconColor'}
        // color='acsys.iconColor'
        minWidth={width}
        value={value.uiName}
        onChange={e => {
          onSelect(entityList[e.target.options.selectedIndex - 1])
        }}
        isReadOnly={isReadOnly}
        bgColor={isDisabled ? 'gray.200' : 'transparent'}
        isDisabled={isDisabled}
      >
        <option value='' hidden>
          Seleccione un {labelName.toLowerCase()}
        </option>
        {entityList.map(element => {
          return (
            <option value={element.uiName}>
              Pedido #{element.orderNumber} - {element.orderProduct.uiName}
            </option>
          )
        })}
      </Select>
      {isError && <FormErrorMessage>{isRequiredMessage}</FormErrorMessage>}
    </FormControl>
  )
}

export default SelectOrderFormControl