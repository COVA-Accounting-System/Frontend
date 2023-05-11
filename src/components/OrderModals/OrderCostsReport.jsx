import React from 'react'

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Stack,
  ModalFooter
} from '@chakra-ui/react'

import RawMaterialUsedTable from '../Tables/RawMaterialUsedTable'
import LabourExpensesTable from '../Tables/LabourExpensesTable'
import IndirectCostsExpensesTable from '../Tables/IndirectCostsExpensesTable'

const OrderCostsReport = ({ orderData, modalIsOpen, onClose, expenseData }) => {
  return (
    <Modal size='full' onClose={() => onClose()} isOpen={modalIsOpen}>
      <ModalOverlay />
      <ModalContent userSelect='none'>
        <ModalHeader color='acsys.titleColor' fontWeight='700' fontSize='25px'>
          Material utilizado
        </ModalHeader>
        <ModalCloseButton color={'acsys.titleColor'} />

        <ModalBody pb={0}>
          <RawMaterialUsedTable data={orderData} />
          <LabourExpensesTable
            expenseData={expenseData}
            totalLabourCost={orderData.orderLabourCosts}
          />
          <IndirectCostsExpensesTable
            expenseData={expenseData}
            totalIndirectCost={orderData.orderIndirectCosts}
            orderId={orderData._id}
          />
        </ModalBody>
        <ModalFooter mt={0}></ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default OrderCostsReport
