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

const ClientPopover = ({ data, getClientData }) => {
  const client = getClientData(data)
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
              {client.uiName}
            </Text>
          </Tag>
        </Button>
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
          {client.uiName}
        </PopoverHeader>
        <PopoverBody>
          <Stack direction={'column'} spacing={2}>
            <Stack direction={'row'} spacing={6}>
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
                ADEUDA:
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
                500 Bs.
              </Text>
            </Stack>
            <Stack direction={'row'} spacing={3}>
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
                {client.phoneCountryCode} {client.phoneNumber}
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
                {client.address}
              </Text>
            </Stack>
          </Stack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}

export default ClientPopover
