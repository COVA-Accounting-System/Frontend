import React from 'react'

import { BiLogOut } from 'react-icons/bi'

import { Stack, Text, IconButton, Box, Center, Tooltip } from '@chakra-ui/react'

const SidebarM = () => {
  return (
    <Stack
      height={'100%'}
      width={'245px'}
      borderRight={'1px'}
      borderColor={'gray.300'}
      direction={'column'}
      justifyContent={'space-between'}
      padding={5}
    >
      <Stack></Stack>
      <Stack></Stack>
      <Stack
        direction={'row'}
        justifyContent={'space-between'}
        alignItems={'center'}
        maxWidth={'245px'}
      >
        <Stack>
          <Center
            bgColor={'acsys.primaryColor'}
            height={'37px'}
            width={'35px'}
            borderRadius={3}
            fontWeight={'bold'}
          >
            J
          </Center>
        </Stack>
        <Stack direction={'column'} spacing={1} maxW={'120px'}>
          <Tooltip label={'Jacobo Covarrubias Zapata'}>
            <Text
              color={'acsys.iconColor'}
              fontWeight={'bold'}
              fontSize={'13px'}
              textOverflow={'ellipsis'}
              overflow={'hidden'}
              whiteSpace={'nowrap'}
            >
              Jacobo Covarrubias. Z.
            </Text>
          </Tooltip>
          <Tooltip label={'jacovzapcovarrubias@gmail.com'}>
            <Text
              color={'acsys.fontColor'}
              fontSize={'10px'}
              fontWeight={'medium'}
              textOverflow={'ellipsis'}
              overflow={'hidden'}
              whiteSpace={'nowrap'}
            >
              jacovzapcovarrubias@gmail.com
            </Text>
          </Tooltip>
        </Stack>
        <Stack minW={'20px'}>
          <Tooltip label={'Cerrar sesion'}>
            <IconButton
              color={'acsys.iconColor'}
              size={'sm'}
              icon={<BiLogOut />}
            />
          </Tooltip>
        </Stack>
      </Stack>
    </Stack>
  )
}

export default SidebarM
