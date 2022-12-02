import React from 'react'
import {
  FormControl,
  FormLabel,
  Select
} from '@chakra-ui/react'

import countriesInfo from '../../assets/countriesInfo'

const CountryFormControl = ({ labelName, value, onSelectCountry }) => {
  return (
    <>
      <FormControl mt={4}>
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
          mb='3'
          value={value}
          maxWidth='330px'
          onChange={(e) => {
            onSelectCountry(e.target.value)
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
                  value={country.name}
                >
                  {country.flag} {country.name}
                </option>
              )
            })}
        </Select>
      </FormControl>
    </>
  )
}

export default CountryFormControl
