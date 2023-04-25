import React from 'react'

import OrderPaidTag from '../OrderPaidTag/OrderPaidTag'

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Stack,
  ModalFooter,
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

const IncomesPayed = ({ data, modalIsOpen, onClose }) => {
  console.log(data)
  return (
    <Modal size='lg' onClose={() => onClose()} isOpen={modalIsOpen}>
      <ModalOverlay />
      <ModalContent userSelect='none' maxW='700'>
        <ModalHeader
          color='acsys.titleColor'
          fontWeight='700'
          fontSize='25px'
          pb={0}
        >
          Pagos realizados
        </ModalHeader>
        <ModalCloseButton color={'acsys.titleColor'} />
        <ModalBody>
          <Stack spacing={3}>
            <Stack direction={'row'} justifyContent={'space-between'}>
              <Stack spacing={'7px'}>
                <Stack direction={'row'} alignItems={'flex-end'} >
                  <Text
                    fontSize={'12px'}
                    fontWeight={'600'}
                    color={'acsys.titleColor'}
                  >
                    Estado:
                  </Text>
                  <OrderPaidTag data={data} />
                </Stack>

                <Stack direction={'row'} alignItems={'center'}>
                  <Text
                    fontSize={'12px'}
                    fontWeight={'600'}
                    color={'acsys.titleColor'}
                  >
                    Cliente:
                  </Text>
                  <Text fontSize={'12px'} color={'gray.600'}>
                    {data.orderClient && data.orderClient.uiName}
                  </Text>
                </Stack>
                <Stack direction='row' alignItems={'center'}>
                  <Text
                    fontSize={'12px'}
                    fontWeight={'600'}
                    color={'acsys.titleColor'}
                  >
                    Producto:
                  </Text>
                  <Text fontSize={'12px'} color={'gray.600'}>
                    {data.orderProduct && data.orderProduct.uiName}
                  </Text>
                </Stack>
              </Stack>
              <Stack
                border={'1px'}
                borderRadius={'4px'}
                borderColor={'gray.300'}
              >
                <Stack direction={'row'} spacing={0}>
                  <Stack>
                    <Stack
                      backgroundColor={'gray.100'}
                      color={'gray.600'}
                      paddingX={4}
                      paddingY={2}
                      fontSize={'x-small'}
                      fontWeight={'semibold'}
                      borderTopLeftRadius={'4px'}
                    >
                      <Text>PRECIO TOTAL</Text>
                    </Stack>
                    <Stack>
                      <Text
                        color={'gray.600'}
                        fontSize={'smaller'}
                        paddingX={4}
                      >
                        {data.orderPrice} Bs.
                      </Text>
                    </Stack>
                  </Stack>
                  <Stack>
                    <Stack>
                      <Text
                        backgroundColor={'gray.100'}
                        color={'gray.600'}
                        paddingX={4}
                        paddingY={2}
                        fontSize={'x-small'}
                        fontWeight={'semibold'}
                      >
                        MONTO PAGADO
                      </Text>
                    </Stack>
                    <Stack>
                      <Text
                        color={'gray.600'}
                        fontSize={'smaller'}
                        paddingX={4}
                      >
                        {data.orderPayedPrice} Bs.
                      </Text>
                    </Stack>
                  </Stack>
                  <Stack>
                    <Stack>
                      <Text
                        backgroundColor={'gray.100'}
                        color={'gray.600'}
                        paddingX={4}
                        paddingY={2}
                        fontSize={'x-small'}
                        fontWeight={'semibold'}
                        borderTopRightRadius={'4px'}
                      >
                        SALDO
                      </Text>
                    </Stack>
                    <Stack >
                      <Text
                        color={'gray.600'}
                        fontSize={'smaller'}
                        paddingX={4}
                      >
                        {data.orderBalance} Bs.
                      </Text>
                    </Stack>
                  </Stack>
                </Stack>
              </Stack>
            </Stack>
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
                    // borderRadius={5}
                  >
                    <Tr>
                      <Th fontSize={'12px'} paddingY={'10px'}>
                        N.º ingreso
                      </Th>
                      <Th fontSize={'12px'} paddingY={'10px'}>
                        Fecha
                      </Th>
                      <Th fontSize={'12px'} paddingY={'10px'}>
                        Tipo
                      </Th>
                      <Th fontSize={'12px'} paddingY={'10px'}>
                        Monto
                      </Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {data.listOfIncomes
                      ? data.listOfIncomes.map((income, index) => {
                          console.log(income)
                          return (
                            <Tr
                              key={`income-${index}`}
                              color={'acsys.iconColor'}
                            >
                              <Td fontSize={'13px'} paddingY={'10px'}>
                                {income.income.accountingSeat}
                              </Td>
                              <Td fontSize={'13px'} paddingY={'10px'}>
                                {new Date(
                                  income.income.date
                                ).toLocaleDateString()}
                              </Td>
                              <Td fontSize={'13px'} paddingY={'10px'}>
                                {income.income.typeOfIncome}
                              </Td>
                              <Td fontSize={'13px'} paddingY={'10px'}>
                                {income.income.amount} Bs.
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
                      {/* <Th paddingY={'10px'}>Precio total:</Th>
                 <Th paddingY={'10px'}>{data.orderMaterialCosts} Bs.</Th> */}
                      <Th margin={0} padding={0}></Th>
                    </Tr>
                  </Tfoot>
                </Table>
              </TableContainer>
            </Stack>
          </Stack>
        </ModalBody>
        <ModalFooter mt={0}></ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default IncomesPayed
