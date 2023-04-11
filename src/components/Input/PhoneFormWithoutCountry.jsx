import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  FormErrorMessage
} from '@chakra-ui/react'

const PhoneFormWithoutCountry = ({
  phoneNumberValue,
  phoneNumberOnInput,
  isSubmited,
  isRequired,
  isRequiredMessage
}) => {
  const isError = isSubmited && phoneNumberValue === ''
  return (
    <>
      <FormControl isInvalid={isError} isRequired={isRequired}>
        <FormLabel
          color='acsys.subtitleColor'
          mb='1'
          fontWeight='600'
          fontSize='13px'
        >
          Teléfono
        </FormLabel>

        <InputGroup maxW='330px'>
          <Input
            focusBorderColor='acsys.primaryColor'
            size='sm'
            value={phoneNumberValue}
            onInput={event => {
              phoneNumberOnInput(event.target.value)
            }}
            placeholder=''
            spellCheck='false'
            borderRadius='5px'
            fontSize='15px'
            height='35px'
            color='acsys.iconColor'
            type='number'
          />
        </InputGroup>
        {isError && <FormErrorMessage>{isRequiredMessage}</FormErrorMessage>}
      </FormControl>
    </>
  )
}

export default PhoneFormWithoutCountry
