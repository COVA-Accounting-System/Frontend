import React from 'react'

// CHAKRA UI IMPORTS
import { Modal, ModalOverlay, ModalContent } from '@chakra-ui/react'

import SelectTypeOfExpense from './SelectTypeOfExpense'
import RegisterInventoryEntry from './RegisterInventoryEntry'
import RegisterExpense from './RegisterExpense'

const ExpenseModal = ({ expenseHook, inventoryInputHook, isFromExpense }) => {
  return (
    <Modal
      size='lg'
      onClose={() => expenseHook.closeModal()}
      isOpen={expenseHook.modalIsOpen}
    >
      <ModalOverlay />
      <ModalContent
        userSelect='none'
        maxW={
          expenseHook.page === 0
            ? '520'
            : expenseHook.page === 1 && expenseHook.typeOfExpense.rawMaterial
            ? '850'
            : '650'
        }
        transition='max-width 0.3s ease-in-out, height 5s ease-in-out'
      >
        {expenseHook.page === 0 ? (
          <SelectTypeOfExpense
            expenseHook={expenseHook}
            inventoryInputHook={inventoryInputHook}
          />
        ) : expenseHook.page === 1 && expenseHook.typeOfExpense.rawMaterial ? (
          <RegisterInventoryEntry
            expenseHook={expenseHook}
            inventoryInputHook={inventoryInputHook}
            isFromExpense={isFromExpense}
          />
        ) : (
          <RegisterExpense
            expenseHook={expenseHook}
            inventoryInputHook={inventoryInputHook}
          />
        )}
      </ModalContent>
    </Modal>
  )
}

export default ExpenseModal
