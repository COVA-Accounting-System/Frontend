import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  Select
} from '@chakra-ui/react'
// import CountryPhoneList from '../CountryPhoneList/CountryPhoneList'
import countriesInfo from '../../assets/countriesInfo'

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
          Teléfono
        </FormLabel>
        <Select
          height='35px'
          fontSize='15px'
          color='acsys.iconColor'
          mb='3'
          value={phoneCountryCodeValue}
          maxWidth='330px'
          onChange={(e) => {
            phoneCountryCodeOnInput(e.target.value)
          }}
        >
          <option value='' disabled hidden>
            Seleccione un pais
          </option>
          {countriesInfo
            .filter(
              (country) =>
                country.code != 'UM' &&
                country.code != 'AQ' &&
                country.code != 'SH' &&
                country.code != 'GS' &&
                country.code != 'TF' &&
                country.code != 'VI' &&
                country.code != 'VG' &&
                country.code != 'IO'
            )
            .map((country) => {
              return (
                <option
                  key={country.code}
                  data-country-code={country.code}
                  value={country.phoneCode}
                >
                  {country.flag} {country.name} ({country.phoneCode})
                </option>
              )
            })}
        </Select>
        <InputGroup maxW='330px'>
          <InputLeftAddon
            children={`${phoneCountryCodeValue}`}
            height='35px'
            fontSize='15px'
            color= 'acsys.iconColor'
            backgroundColor='acsys.backgroundColor'
          />
          <Input
            focusBorderColor='acsys.primaryColor'
            size='sm'
            value={phoneNumberValue}
            onInput={(event) => {
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
      </FormControl>
    </>
  )
}

export default PhoneFormControl
