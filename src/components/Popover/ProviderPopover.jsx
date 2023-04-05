import React from 'react'

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverCloseButton,
  Button,
  Stack,
  Text,
  Tag
} from '@chakra-ui/react'

const ProviderPopover = ({ data, getProviderData }) => {
  const provider = getProviderData(data)
  return (
    <Popover preventOverflow={false}>
      <PopoverTrigger>
        <Button p={0} m={0} h={'25px'}>
          <Tag _hover={{ cursor: 'pointer' }}>
            <Text
              fontWeight={400}
              m={0}
              p={0}
              fontSize={'13px'}
              color={'acsys.iconColor'}
            >
              {provider.uiName}
            </Text>
          </Tag>
        </Button>
        {/* </Flex> */}

        {/* <Button>{client.uiName}</Button> */}
      </PopoverTrigger>
      <PopoverContent>
        {/* <PopoverArrow /> */}
        <PopoverCloseButton />
        <PopoverHeader
          lineHeight={'5'}
          fontWeight={'semibold'}
          overflowWrap={'break-word'}
          wordWrap={'break-word'}
          hyphens={'auto'}
          whiteSpace={'pre-wrap'}
          fontSize={'13px'}
          rowGap={0}
          pt={2}
          pb={2}
          pr={10}
        >
          {provider.uiName}
        </PopoverHeader>
        <PopoverBody>
          <Stack direction={'column'} spacing={2}>
            <Stack direction={'row'} spacing={'50px'}>
              <Text
                lineHeight={'5'}
                //avoid text to overflow visible outside the popover and break line to show all text
                overflowWrap={'break-word'}
                wordWrap={'break-word'}
                hyphens={'auto'}
                whiteSpace={'pre-wrap'}
                fontSize={'11px'}
                fontWeight={600}
                color={'gray.500'}
              >
                NIT:
              </Text>
              <Text
                lineHeight={'5'}
                //avoid text to overflow visible outside the popover and break line to show all text
                overflowWrap={'break-word'}
                wordWrap={'break-word'}
                hyphens={'auto'}
                whiteSpace={'pre-wrap'}
                fontSize={'13px'}
                fontWeight={400}
              >
                {provider.nit}
              </Text>
            </Stack>
           
            <Stack direction={'row'} spacing={'45px'}>
              {' '}
              <Text
                lineHeight={'5'}
                //avoid text to overflow visible outside the popover and break line to show all text
                overflowWrap={'break-word'}
                wordWrap={'break-word'}
                hyphens={'auto'}
                whiteSpace={'pre-wrap'}
                fontSize={'11px'}
                fontWeight={600}
                color={'gray.500'}
              >
                PAÍS:
              </Text>
              <Text
                lineHeight={'5'}
                //avoid text to overflow visible outside the popover and break line to show all text
                overflowWrap={'break-word'}
                wordWrap={'break-word'}
                hyphens={'auto'}
                whiteSpace={'pre-wrap'}
                fontSize={'13px'}
                fontWeight={400}
              >
                {provider.country}
              </Text>
            </Stack>
            <Stack direction={'row'} spacing={'27px'}>
              {' '}
              <Text
                lineHeight={'5'}
                //avoid text to overflow visible outside the popover and break line to show all text
                overflowWrap={'break-word'}
                wordWrap={'break-word'}
                hyphens={'auto'}
                whiteSpace={'pre-wrap'}
                fontSize={'11px'}
                fontWeight={600}
                color={'gray.500'}
              >
                CIUDAD:
              </Text>
              <Text
                lineHeight={'5'}
                //avoid text to overflow visible outside the popover and break line to show all text
                overflowWrap={'break-word'}
                wordWrap={'break-word'}
                hyphens={'auto'}
                whiteSpace={'pre-wrap'}
                fontSize={'13px'}
                fontWeight={400}
              >
                {provider.city}
              </Text>
            </Stack>
            <Stack
              direction={'row'}
              spacing={3}
            >
              <Text
                lineHeight={'5'}
                //avoid text to overflow visible outside the popover and break line to show all text
                overflowWrap={'break-word'}
                wordWrap={'break-word'}
                hyphens={'auto'}
                whiteSpace={'pre-wrap'}
                fontSize={'11px'}
                fontWeight={600}
                color={'gray.500'}
              >
                TELÉFONO:
              </Text>
              <Text
                lineHeight={'5'}
                //avoid text to overflow visible outside the popover and break line to show all text
                overflowWrap={'break-word'}
                wordWrap={'break-word'}
                hyphens={'auto'}
                whiteSpace={'pre-wrap'}
                fontSize={'13px'}
                fontWeight={400}
              >
                {provider.phoneCountryCode} {provider.phoneNumber}
              </Text>
            </Stack>
            <Stack direction={'row'} spacing={2.5}>
              {' '}
              <Text
                lineHeight={'5'}
                //avoid text to overflow visible outside the popover and break line to show all text
                overflowWrap={'break-word'}
                wordWrap={'break-word'}
                hyphens={'auto'}
                whiteSpace={'pre-wrap'}
                fontSize={'11px'}
                fontWeight={600}
                color={'gray.500'}
              >
                DIRECCIÓN:
              </Text>
              <Text
                lineHeight={'5'}
                //avoid text to overflow visible outside the popover and break line to show all text
                overflowWrap={'break-word'}
                wordWrap={'break-word'}
                hyphens={'auto'}
                whiteSpace={'pre-wrap'}
                fontSize={'13px'}
                fontWeight={400}
              >
                {provider.address}
              </Text>
            </Stack>
            
          </Stack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}

export default ProviderPopover
