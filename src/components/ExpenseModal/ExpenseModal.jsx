import React, { useState } from 'react'

// CHAKRA UI IMPORTS
import { Modal, ModalOverlay, ModalContent } from '@chakra-ui/react'

import SelectTypeOfExpense from './SelectTypeOfExpense'
import RegisterInventoryEntry from './RegisterInventoryEntry'

const ExpenseModal = ({ expenseHook }) => {
  const [pages, setPages] = useState([true, false, false])
  return (
    <Modal
      size='lg'
      onClose={() => expenseHook.closeModal()}
      isOpen={expenseHook.modalIsOpen}
    >
      <ModalOverlay />
      <ModalContent
        userSelect='none'
        maxW={pages[0] ? '500' : '720px'}
        transition='all 0.3s ease-in-out'
      >
        {pages[0] ? (
          <SelectTypeOfExpense expenseHook={expenseHook} setPages={setPages} />
        ) : (
          <RegisterInventoryEntry
            expenseHook={expenseHook}
            setPages={setPages}
          />
        )}
      </ModalContent>
    </Modal>
  )
}

export default ExpenseModal
