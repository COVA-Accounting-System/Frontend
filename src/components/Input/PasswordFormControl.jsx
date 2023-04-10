import React, { useState } from 'react'
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  InputGroup,
  InputRightElement,
  Button,
  Flex,
  IconButton
} from '@chakra-ui/react'

import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'

const PasswordFormControl = ({
  labelName,
  value,
  onInput,
  isSubmited,
  isRequired,
  isRequiredMessage
}) => {
  const [show, setShow] = useState(false)
  const isError = isSubmited && value === ''

  const handleClick = () => {
    setShow(!show)
  }

  return (
    <>
      <FormControl isInvalid={isError} isRequired={isRequired}>
        <FormLabel
          color='acsys.subtitleColor'
          mb='1'
          fontWeight='600'
          fontSize='13px'
        >
          {labelName}
        </FormLabel>
        <InputGroup>
          <Input
            type={show ? 'text' : 'password'}
            focusBorderColor='acsys.primaryColor'
            size='sm'
            value={value}
            spellCheck='false'
            borderRadius='5px'
            fontSize='15px'
            height='35px'
            color={'acsys.iconColor'}
            onInput={event => onInput(event.target.value)}
            placeholder=''
            isRequired
            //   bgColor={'gray.200'}
            // isDisabled={true}
          />
          <InputRightElement height={'100%'} pr={'5px'}>
            <Flex alignItems={'center'}>
              <IconButton
                borderRadius={'3px'}
                icon={show ? <AiFillEyeInvisible /> : <AiFillEye />}
                height={'30px'}
                width={'20px'}
                color={'acsys.iconColor'}
                onClick={handleClick}
              />
            </Flex>
          </InputRightElement>
        </InputGroup>

        {isError && <FormErrorMessage>{isRequiredMessage}</FormErrorMessage>}
        {/* <FormErrorMessage>Este campo es obligatorio</FormErrorMessage> */}
      </FormControl>
    </>
  )
}

export default PasswordFormControl
