import React from 'react'

import { Flex, Tag } from '@chakra-ui/react'

const OrderPaidTag = ({ data }) => {
  // console.log(data)
  return (
    // <Flex justifyContent={'center'} alignItems={'center'} >
    <Flex height={'100%'} alignItems={'center'}>
      {data.orderPayedPrice === 0 ? (
        <Tag colorScheme={'red'} fontSize={'small'} fontWeight={'semibold'}>
          NO PAGADO
        </Tag>
      ) : data.orderPayedPrice !== data.orderPrice ? (
        <Tag colorScheme={'yellow'} fontSize={'small'} fontWeight={'semibold'}>
          EN PAGO
        </Tag>
      ) : (
        <Tag colorScheme={'green'} fontSize={'small'} fontWeight={'semibold'}>
          PAGADO
        </Tag>
      )}
    </Flex>

    //  </Flex>
  )
}

export default OrderPaidTag
