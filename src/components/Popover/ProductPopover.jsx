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

const ProductPopover = ({data, getProductData}) => {
    const product = getProductData(data)
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
            {product.uiName}
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
        {product.uiName}
      </PopoverHeader>
      <PopoverBody>
        <Stack direction={'column'} spacing={2}>
          <Stack direction={'row'} spacing={9}>
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
              TIPO DE UNIDAD:
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
              {product.productType}
            </Text>
          </Stack>
          <Stack direction={'row'} spacing={product.productType === 'Unidad' ? 3.5 : 9}>
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
              PRECIO POR {product.productType.toUpperCase()}:
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
              {product.productPrice} Bs.
            </Text>
          </Stack>
          <Stack direction={'row'} spacing={3}>
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
              PRECIO POR DOCENA:
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
              {product.productDozenPrice} Bs.
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
              CARACTERÍSTICAS:
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
              {/* {product.productFeatures} */}
            </Text>
          </Stack>
        </Stack>
      </PopoverBody>
    </PopoverContent>
  </Popover>
  )
}

export default ProductPopover