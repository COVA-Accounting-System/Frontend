import React from 'react'

import {
  Checkbox,
  FormControl,
  FormErrorMessage
} from '@chakra-ui/react'

const ConditionsCheckbox = ({ isChecked, isSubmited, setIsChecked }) => {
  return (
    <FormControl isRequired isInvalid={isSubmited && !isChecked}>
      <Checkbox
        color={'gray.600'}
        size='sm'
        colorScheme='teal'
        isRequired={true}
        isChecked={isChecked}
        onChange={e => setIsChecked(e.target.checked)}
      >
        Conozco y acepto los términos y condiciones de uso de la aplicación
      </Checkbox>
      <FormErrorMessage>
        Debes aceptar los términos y condiciones
      </FormErrorMessage>
    </FormControl>
  )
}

export default ConditionsCheckbox
