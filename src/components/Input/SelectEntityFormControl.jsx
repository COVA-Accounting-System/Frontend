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
  width,
  paddingSpace,
  entityList,
  isSubmited,
  isRequired,
  isRequiredMessage
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
        color='acsys.iconColor'
        // value="asdasd"
        maxWidth={width}
        onChange={e => {
          onSelect(entityList[e.target.options.selectedIndex - 1])
        }}
      >
        <option uiname='' hidden>
          Seleccione un {labelName.toLowerCase()}
        </option>
        {entityList.map(element => {
          return (
            <option>
              {element.uiName}
            </option>
          )
        })}
      </Select>
      {isError && <FormErrorMessage>{isRequiredMessage}</FormErrorMessage>}
    </FormControl>
  )
}

export default SelectEntityFormControl
