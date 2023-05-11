import React from 'react'

import {
  Stack,
  Text,
  TableContainer,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td
} from '@chakra-ui/react'

const CostResumeTable = ({
  orderMaterialCosts,
  orderLabourCosts,
  orderIndirectCosts
}) => {
  return (
    <Stack spacing={3}>
      <Stack border={'1px'} borderColor={'gray.300'} borderRadius={'4px'}>
        <TableContainer
          maxHeight={'300px'}
          overflowY={'auto'}
          borderRadius={'4px'}
        >
          <Table variant='simple' size='sm'>
            <Thead
              //stick header
              position={'sticky'}
              top={0}
              zIndex={1}
              backgroundColor={'blue.100'}
              boxShadow={'0px 1px 1px rgba(0, 0, 0, 0.05)'}

            >
              <Tr>
                <Th fontSize={'12px'} paddingY={'10px'}>
                  Material utilizado
                </Th>
                <Th fontSize={'12px'} paddingY={'10px'}>
                  Mano de obra
                </Th>
                <Th fontSize={'12px'} paddingY={'10px'}>
                  Costos indirectos
                </Th>
                <Th fontSize={'12px'} paddingY={'10px'} >
                  Costo del pedido
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr color={'acsys.iconColor'}>
                <Td fontSize={'13px'} paddingY={'10px'}>
                  {orderMaterialCosts} Bs.
                </Td>
                <Td fontSize={'13px'} paddingY={'10px'}>
                  {orderLabourCosts} Bs.
                </Td>
                <Td fontSize={'13px'} paddingY={'10px'}>
                  {orderIndirectCosts} Bs.
                </Td>
                <Td fontSize={'13px'} paddingY={'10px'} fontWeight={'bold'}>
                  {orderMaterialCosts + orderLabourCosts + orderIndirectCosts} Bs.
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
      </Stack>
    </Stack>
  )
}

export default CostResumeTable
