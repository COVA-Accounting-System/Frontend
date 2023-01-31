import {
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    FormErrorMessage,
    InputRightAddon,
    Select
  } from '@chakra-ui/react'
  
  const InputWithSelectFormControl = ({
    labelName,
    width,
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
          <InputGroup maxW={width}>
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
            //   children='Bs.'
              height='35px'
              p={0}
              m={0}
              fontSize='15px'
              backgroundColor='acsys.backgroundColor'
            >
                <Select
                p={0}
                m={0}
                h='33px'
                border={0}
                borderLeftRadius={0}
                >
                    <option value="Unidad">Unidad</option>
                    <option value="Docena">Docena</option>
                </Select>
            </InputRightAddon>
          </InputGroup>
          {isError && (<FormErrorMessage>{isRequiredMessage}</FormErrorMessage>)}
        </FormControl>
      </>
    )
  }
  
  export default InputWithSelectFormControl
  