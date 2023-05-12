import React from 'react'

import { Stack, Text, Button, Checkbox } from '@chakra-ui/react'

import TextFormControl from '../../components/Input/TextFormControl'
import PhoneFormWithoutCountry from '../../components/Input/PhoneFormWithoutCountry'
import SelectFormControl from '../../components/Input/SelectFormControl'
import PasswordFormControl from '../../components/Input/PasswordFormControl'
import EmailFormControl from '../../components/Input/EmailFormControl'
import ConditionsCheckbox from '../../components/Checkbox/ConditionsCheckbox'

import { useUser } from '../../hooks/useUser'

const RegisterUser = () => {
  const user = useUser()

  return (
    <Stack
      // maxW={'700px'}
      // ml={'200px'}
      alignItems={'center'}
      justifyContent={'center'}
      h={'100vh'}
      spacing={'6'}
      minWidth={'700px'}
    >
      <Stack direction={'row'} justifyContent={'flex-start'}>
        <Text fontSize={'40px'} fontWeight={'800'} color={'acsys.titleColor'}>
          Registrar usuario
        </Text>
      </Stack>
      <form action=''>
        <Stack direction={'column'} spacing={5}>
          <Stack direction={'row'} spacing={5}>
            <TextFormControl
              labelName='Nombres'
              paddingSpace={0}
              value={user.name}
              onInput={data => user.setName(data)}
              isSubmited={user.isSubmited}
              isRequired
              isRequiredMessage='Este campo es obligatorio'
            />
            <TextFormControl
              labelName='Apellidos'
              paddingSpace={0}
              value={user.lastName}
              onInput={data => user.setLastName(data)}
              isSubmited={user.isSubmited}
              isRequired
              isRequiredMessage='Este campo es obligatorio'
            />
          </Stack>
          <Stack direction={'row'} spacing={5}>
            <PhoneFormWithoutCountry
              phoneNumberValue={user.phone}
              phoneNumberOnInput={number => {
                user.setPhone(number)
              }}
              isSubmited={user.isSubmited}
              isRequired
              isRequiredMessage='Este campo es obligatorio'
            />
            <SelectFormControl
              labelName='Rubro'
              paddingSpace={4}
              value={user.field}
              onSelect={data => user.setField(data)}
              isSubmited={user.isSubmited}
              optionList={user.fields}
              isRequired
              isRequiredMessage='Este campo es obligatorio'
            />
          </Stack>
          <Stack direction={'row'} spacing={5}>
            <EmailFormControl
              labelName='Correo electrónico'
              value={user.email}
              onInput={data => {
                user.setEmail(data)
                user.validateEmail(data)
              }}
              isSubmited={user.isSubmited}
              isRequired
              isRequiredMessage='Este campo es obligatorio'
              isEmailRight={user.isEmailRight}
              isEmailRightMessage='El correo electrónico no es válido'
            />
            <PasswordFormControl
              labelName='Contraseña'
              value={user.password}
              onInput={data => {
                user.setPassword(data)
                user.validatePassword(data)
              }}
              isSubmited={user.isSubmited}
              isPasswordRight={user.isPasswordRight}
              isPasswordRightMessage='La contraseña debe tener al menos 8 caracteres, 1 mayúscula, 1 minúscula y 1 número'
              isRequired
              isRequiredMessage='Este campo es obligatorio'
            />
          </Stack>
          <Stack>
            <ConditionsCheckbox
              isSubmited={user.isSubmited}
              isChecked={user.isAproved}
              setIsChecked={checked => {
                user.setIsAproved(checked)
              }}
            />
          </Stack>
          <Stack direction={'row'} justifyContent={'flex-end'}>
            <Button
              width={'100%'}
              colorScheme='teal'
              fontSize={'14px'}
              fontWeight={'600'}
              isLoading={user.isLoading}
              onClick={user.handleRegister}
            >
              Registrar
            </Button>
          </Stack>
        </Stack>
      </form>
    </Stack>
  )
}

export default RegisterUser
