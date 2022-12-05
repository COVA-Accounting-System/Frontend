import React from 'react'
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage
} from '@chakra-ui/react'

const TextFormControl = ({ labelName, paddingSpace, value, onInput, isSubmited, isRequired, isRequiredMessage }) => {
  // const inputName = labelName.toLowerCase()
  const isError = isSubmited && value === ''

  return (
    <>
      <FormControl mt={paddingSpace} isInvalid={isError} isRequired={isRequired}>
        <FormLabel
          color='acsys.subtitleColor'
          mb='1'
          fontWeight='600'
          fontSize='13px'
        >
          {labelName}
        </FormLabel>
        <Input
          focusBorderColor='acsys.primaryColor'
          size='sm'
            // width={337}
          width='330px'
          //    borderColor="gray.300"
          value={value}
          spellCheck='false'
          borderRadius='5px'
          fontSize='15px'
          height='35px'
          color='acsys.iconColor'
          onInput={(event) => onInput(event.target.value)}
          placeholder=''
          isRequired
        />
        {isError && (<FormErrorMessage>{isRequiredMessage}</FormErrorMessage>)}
        {/* <FormErrorMessage>Este campo es obligatorio</FormErrorMessage> */}
      </FormControl>
    </>
  )
}

export default TextFormControl
