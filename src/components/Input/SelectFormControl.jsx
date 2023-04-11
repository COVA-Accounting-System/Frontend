import React from 'react'
import {
  FormControl,
  Select,
  FormLabel,
  FormErrorMessage
} from '@chakra-ui/react'

const SelectFormControl = ({
  labelName,
  onSelect,
  value,
  paddingSpace,
  optionList,
  isSubmited,
  isRequired,
  isRequiredMessage
}) => {
  const isError = isSubmited && value === ''
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
        <option value='' disabled hidden>
         {labelName === 'Rubro' ? 'Seleccione un rubro' : 'Seleccione un tipo'} 
        </option>
        {optionList.map((optionElement) => {
          return (
            <option>{optionElement}</option>
          )
        })}
      </Select>
      {isError && <FormErrorMessage>{isRequiredMessage}</FormErrorMessage>}
    </FormControl>
  )
}

export default SelectFormControl
