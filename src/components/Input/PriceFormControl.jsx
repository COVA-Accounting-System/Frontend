import {
  FormControl,
  FormLabel,
  InputGroup,
  NumberInput,
  NumberInputField,
  FormErrorMessage,
  InputRightAddon,
  FormHelperText
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
  formHelperText = '',
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
        <InputGroup>
          <NumberInput
            precision={2}
            step={10}
            min={0}
            max={maxAllowed}
            value={value}
            onChange={valueString => {
              onInput(valueString)
            }}
            isDisabled={isDisabled}
          >
            <NumberInputField
              focusBorderColor='acsys.primaryColor'
              size='md'
              // onInput={event => {
              //   onInput(event.target.value)
              // }}
              spellCheck='false'
              // value={value}
              borderRadius='5px'
              fontSize='15px'
              height='35px'
              color={isDisabled ? 'gray.900 !important' : 'acsys.iconColor'}
              bgColor={isDisabled ? 'gray.200' : 'transparent'}
              borderRightRadius={0}
            />
          </NumberInput>

          <InputRightAddon
            children='Bs.'
            // width='102px'
            height='35px'
            fontSize='15px'
            color={isDisabled ? 'gray.400' : 'acsys.iconColor'}
            bgColor={isDisabled ? 'gray.100' : 'acsys.backgroundColor'}
          />
        </InputGroup>
        {formHelperText !== '' && (
          <FormHelperText fontSize={'12px'} mt={1}>Precio calculado del pedido: {formHelperText}</FormHelperText>
        )}
        {isError && <FormErrorMessage>{isRequiredMessage}</FormErrorMessage>}
      </FormControl>
    </>
  )
}

export default PriceFormControl
