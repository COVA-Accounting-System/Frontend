import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon
} from '@chakra-ui/react'
import CountryPhoneList from '../CountryPhoneList/CountryPhoneList'

const PhoneFormControl = ({
  phoneNumberValue,
  phoneCountryCodeValue,
  phoneNumberOnInput,
  phoneCountryCodeOnInput
}) => {
  return (
    <>
      <FormControl mt={4}>
        <FormLabel
          color='acsys.subtitleColor'
          mb='1'
          fontWeight='600'
          fontSize='13px'
        >
          Telefono
        </FormLabel>
        <CountryPhoneList value={phoneCountryCodeValue} onSelect={(value) => { phoneCountryCodeOnInput(value) }} />

        <InputGroup maxW='330px'>
          <InputLeftAddon
            // width="80px"
            children={`+${phoneCountryCodeValue}`}
            // children="+591"
            height='35px'
            fontSize='15px'
            backgroundColor='acsys.backgroundColor'
          />
          <Input
            focusBorderColor='acsys.primaryColor'
            size='sm'
            // width={330}
            // width="290px"
            value={phoneNumberValue}
            onInput={(event) => { phoneNumberOnInput(event.target.value) }}
            placeholder=''
            spellCheck='false'
            borderRadius='5px'
            fontSize='15px'
            height='35px'
            color='acsys.iconColor'
            type='number'
          />
        </InputGroup>
      </FormControl>
    </>
  )
}

export default PhoneFormControl
