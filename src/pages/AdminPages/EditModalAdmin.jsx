import React, { useEffect } from 'react'

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Stack,
  Text
} from '@chakra-ui/react'

import TextFormControl from '../../components/Input/TextFormControl'
import PhoneFormWithoutCountry from '../../components/Input/PhoneFormWithoutCountry'
import SelectFormControl from '../../components/Input/SelectFormControl'
import EmailFormControl from '../../components/Input/EmailFormControl'

const EditModalAdmin = ({ userHook }) => {
  return (
    <Modal
      size={'xl'}
      onClose={() => userHook.setIsEditModalOpen(false)}
      isOpen={userHook.isEditModalOpen}
    >
      <ModalOverlay />
      <ModalContent userSelect='none' w='600px'>
        <form>
          <ModalHeader
            color='acsys.titleColor'
            fontWeight='700'
            fontSize='25px'
          >
            Editar usuario
          </ModalHeader>
          <ModalCloseButton color={'acsys.titleColor'} />
          <ModalBody pb={3}>
            <Stack
              //center content
              // alignItems={'center'}
              //   maxW={'700px'}
              //   ml={'200px'}
              //center content
              justifyContent={'center'}
              //full screen
              //   h={'100vh'}
              //full screen
              spacing={'6'}
            >
              <Stack direction={'column'} spacing={5}>
                <Stack direction={'row'} spacing={5}>
                  <TextFormControl
                    labelName='Nombres'
                    paddingSpace={0}
                    value={userHook.name}
                    onInput={data => userHook.setName(data)}
                    isSubmited={userHook.isSubmited}
                    isRequired
                    isRequiredMessage='Este campo es obligatorio'
                  />
                  <TextFormControl
                    labelName='Apellidos'
                    paddingSpace={0}
                    value={userHook.lastName}
                    onInput={data => userHook.setLastName(data)}
                    isSubmited={userHook.isSubmited}
                    isRequired
                    isRequiredMessage='Este campo es obligatorio'
                  />
                </Stack>
                <Stack direction={'row'} spacing={5}>
                  <PhoneFormWithoutCountry
                    phoneNumberValue={userHook.phone}
                    phoneNumberOnInput={number => {
                      userHook.setPhone(number)
                    }}
                    isSubmited={userHook.isSubmited}
                    isRequired
                    isRequiredMessage='Este campo es obligatorio'
                  />
                  <SelectFormControl
                    labelName='Rubro'
                    paddingSpace={4}
                    value={userHook.field}
                    onSelect={data => userHook.setField(data)}
                    isSubmited={userHook.isSubmited}
                    optionList={userHook.fields}
                    isRequired
                    isRequiredMessage='Este campo es obligatorio'
                  />
                </Stack>
                <Stack direction={'row'} spacing={5}>
                  <EmailFormControl
                    labelName='Correo electrónico'
                    value={userHook.email}
                    onInput={data => {
                      userHook.setEmail(data)
                      userHook.validateEmail(data)
                    }}
                    isSubmited={userHook.isSubmited}
                    isRequired
                    isRequiredMessage='Este campo es obligatorio'
                    isEmailRight={userHook.isEmailRight}
                    isEmailRightMessage='El correo electrónico no es válido'
                  />
                </Stack>
              </Stack>
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Button
              backgroundColor={'acsys.primaryColor'}
              _hover={{ backgroundColor: '#098bb6' }}
              colorScheme='linkedin'
              isLoading={userHook.isLoading}
              onClick={userHook.handleEdit}
            >
              Guardar
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  )
}

export default EditModalAdmin
