import {
  FormControl,
  FormLabel,
  InputGroup,
  NumberInput,
  NumberInputField,
  FormErrorMessage,
  InputRightAddon,
  Input
} from '@chakra-ui/react'

const PriceFormControl = ({
  labelName,
  width,
  value,
  onInput,
  isSubmited,
  isRequired,
  isRequiredMessage,
  maxAllowed,
  isDisabled = false,
  mt = 4
}) => {
  const isError = isSubmited && value === ''
  return (
    <>
      <FormControl mt={mt} isInvalid={isError} isRequired={isRequired}>
        <FormLabel
          color='acsys.subtitleColor'
          mb='1'
          fontWeight='600'
          fontSize='13px'
        >
          {labelName}
        </FormLabel>
        <InputGroup >
            <NumberInput
              precision={2}
              step={0.2}
              min={0}
              max={maxAllowed}
              value={value}
              isDisabled={isDisabled}
            >
              <NumberInputField
                focusBorderColor='acsys.primaryColor'
                size='md'
                onInput={event => {
                  onInput(event.target.value)
                }}
                placeholder=''
                spellCheck='false'
                borderRadius='5px'
                fontSize='15px'
                height='35px'
                color={isDisabled ? 'gray.900 !important' : 'acsys.iconColor'}
                bgColor={isDisabled ? 'gray.200' : 'transparent'}
                type='number'
                min={0}
                // width='320px'
                borderRightRadius={0}
              />
            </NumberInput>
          {/* <Input></Input> */}
          <InputRightAddon
            children='Bs.'
            // width='102px'
            height='35px'
            fontSize='15px'
            color={isDisabled ? 'gray.400' : 'acsys.iconColor'}
            bgColor={isDisabled ? 'gray.100' : 'acsys.backgroundColor'}
          />
        </InputGroup>
        {isError && <FormErrorMessage>{isRequiredMessage}</FormErrorMessage>}
      </FormControl>
    </>
  )
}

export default PriceFormControl
