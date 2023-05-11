import React from 'react'

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
   Divider
} from '@chakra-ui/react'

import RawMaterialUsedTable from '../Tables/RawMaterialUsedTable'
import LabourExpensesTable from '../Tables/LabourExpensesTable'
import IndirectCostsExpensesTable from '../Tables/IndirectCostsExpensesTable'
import CostResumeTable from '../Tables/CostResumeTable'

const OrderCostsReport = ({ orderData, modalIsOpen, onClose, expenseData }) => {
  return (
    <Modal size='full' onClose={() => onClose()} isOpen={modalIsOpen}>
      <ModalOverlay />
      <ModalContent userSelect='none'>
        <ModalHeader color='acsys.titleColor' fontWeight='700' fontSize='25px'>
          Costos de producción
        </ModalHeader>
        <ModalCloseButton color={'acsys.titleColor'} />

        <ModalBody pb={0}>
          <Stack direction={'column'} spacing={10}>
            <Stack textAlign={'center'}>
         
              <CostResumeTable
                orderMaterialCosts={orderData.orderMaterialCosts}
                orderLabourCosts={orderData.orderLabourCosts}
                orderIndirectCosts={orderData.orderIndirectCosts}
              />
            </Stack>
            <Divider />
            <Stack textAlign={'left'}>
            <Text color={'gray.600'} fontSize={'15px'} fontWeight={'medium'}>
                Materiales utilizados
              </Text>
              <RawMaterialUsedTable data={orderData} />
            </Stack>
            <Stack textAlign={'left'}>
            <Text color={'gray.600'} fontSize={'15px'} fontWeight={'medium'}>
                Mano de obra directa
              </Text>
              <LabourExpensesTable
                expenseData={expenseData}
                totalLabourCost={orderData.orderLabourCosts}
              />
            </Stack>
            <Stack textAlign={'left'}>
              <Text color={'gray.600'} fontSize={'15px'} fontWeight={'medium'}>
                Costos indirectos de fabricación
              </Text>
              <IndirectCostsExpensesTable
                expenseData={expenseData}
                totalIndirectCost={orderData.orderIndirectCosts}
                orderId={orderData._id}
              />
            </Stack>
          </Stack>
        </ModalBody>
        <ModalFooter mt={0}></ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default OrderCostsReport
