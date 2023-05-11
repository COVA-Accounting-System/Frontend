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

const IndirectCostsExpensesTable = ({
  expenseData,
  totalIndirectCost,
  orderId
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
              backgroundColor={'white'}
              boxShadow={'0px 1px 1px rgba(0, 0, 0, 0.05)'}
            >
              <Tr>
                <Th fontSize={'12px'} paddingY={'10px'}>
                  N.º gasto
                </Th>
                <Th fontSize={'12px'} paddingY={'10px'}>
                  Fecha
                </Th>
                <Th fontSize={'12px'} paddingY={'10px'}>
                  Acreedor
                </Th>
                <Th fontSize={'12px'} paddingY={'10px'}>
                  Concepto
                </Th>
                <Th fontSize={'12px'} paddingY={'10px'}>
                  Monto (calculado)
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {expenseData.indirectCostsExpenses
                ? expenseData.indirectCostsExpenses.map((expense, index) => {
                    return (
                      <Tr key={`expense-${index}`} color={'acsys.iconColor'}>
                        <Td fontSize={'13px'} paddingY={'10px'}>
                          {expense.accountingSeat}
                        </Td>
                        <Td fontSize={'13px'} paddingY={'10px'}>
                          {new Date(expense.date).toLocaleDateString()}
                        </Td>
                        <Td fontSize={'13px'} paddingY={'10px'}>
                          {expense.creditorEntity}
                        </Td>
                        <Td fontSize={'13px'} paddingY={'10px'}>
                          {expense.concept}
                        </Td>
                        <Td fontSize={'13px'} paddingY={'10px'}>
                          {expense.orderList.map(order => {
                            if (order.order === orderId) {
                              return order.indirectCost
                            }
                          })}{' '}
                          Bs.
                        </Td>
                      </Tr>
                    )
                  })
                : null}
            </Tbody>
            <Tfoot>
              <Tr margin={0} padding={0}>
                <Th margin={0} padding={0}></Th>
                <Th margin={0} padding={0}></Th>
                <Th margin={0} padding={0}></Th>

                <Th paddingY={'10px'}>Precio total:</Th>
                <Th paddingY={'10px'}>{totalIndirectCost} Bs.</Th>
              </Tr>
            </Tfoot>
          </Table>
        </TableContainer>
      </Stack>
      <Stack direction={'row'} justifyContent={'flex-end'}>
        <Stack
          border={'1px'}
          borderColor={'gray.300'}
          borderRadius={'4px'}
          direction={'row'}
          padding={'10px'}

          // width={'100%'}
        >
          <Text
            color={'acsys.iconColor'}
            fontSize={'14px'}
            fontWeight={'medium'}
          >
            Costo en material:
          </Text>
          <Text
            color={'acsys.iconColor'}
            fontSize={'14px'}
            // fontWeight={'medium'}
          >
            {/* {data.orderMaterialCosts} Bs. */}
          </Text>
        </Stack>
      </Stack>
    </Stack>
  )
}

export default IndirectCostsExpensesTable
