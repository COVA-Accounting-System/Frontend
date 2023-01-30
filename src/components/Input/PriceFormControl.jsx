import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  FormErrorMessage,
  InputRightAddon
} from '@chakra-ui/react'

const PriceFormControl = ({
  labelName,
  value,
  onInput,
  isSubmited,
  isRequired,
  isRequiredMessage
}) => {
  const isError = isSubmited && value === ''

  return (
    <>
      <FormControl mt={4} isInvalid={isError} isRequired={isRequired}>
        <FormLabel
          color='acsys.subtitleColor'
          mb='1'
          fontWeight='600'
          fontSize='13px'
        >
          {labelName}
        </FormLabel>
        <InputGroup maxW='330px'>
          <Input
            focusBorderColor='acsys.primaryColor'
            size='sm'
            value={value}
            onInput={(event) => {
              onInput(event.target.value)
            }}
            placeholder=''
            spellCheck='false'
            borderRadius='5px'
            fontSize='15px'
            height='35px'
            color='acsys.iconColor'
            type='number'
          />
          <InputRightAddon
            children='Bs.'
            height='35px'
            fontSize='15px'
            backgroundColor='acsys.backgroundColor'
          />
        </InputGroup>
        {isError && (<FormErrorMessage>{isRequiredMessage}</FormErrorMessage>)}
      </FormControl>
    </>
  )
}

export default PriceFormControl
