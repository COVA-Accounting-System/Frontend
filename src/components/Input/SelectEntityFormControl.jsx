import React from 'react'
import {
  FormControl,
  Select,
  FormLabel,
  FormErrorMessage
} from '@chakra-ui/react'

const SelectEntityFormControl = ({
  labelName,
  onSelect,
  value,
  paddingSpace,
  entityList,
  isSubmited,
  isRequired,
  isRequiredMessage
}) => {
  const isError = isSubmited && value === ''
  console.log(entityList)
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
        color='acsys.iconColor'
        value={value}
        maxWidth='330px'
        onChange={(e) => {
          onSelect(e.target.value)
        }}
      >
        <option value='' hidden>
          Seleccione un cliente
        </option>
        {entityList.map((element) => {
          return (
            <option>{element.uiName}</option>
          )
        })}
      </Select>
      {isError && <FormErrorMessage>{isRequiredMessage}</FormErrorMessage>}
    </FormControl>
  )
}

export default SelectEntityFormControl

