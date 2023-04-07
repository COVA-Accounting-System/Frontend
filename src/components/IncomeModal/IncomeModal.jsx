import React from 'react'

// CHAKRA UI IMPORTS
import { Modal, ModalOverlay, ModalContent } from '@chakra-ui/react'

import SelectTypeOfIncome from './SelectTypeOfIncome'
import RegisterIncome from './RegisterIncome'

const IncomeModal = ({income}) => {
    return (
        <Modal
        size='sm'
        onClose={() => income.closeModal()}
        isOpen={income.modalIsOpen}
      >
          <ModalOverlay />
          <ModalContent
            userSelect='none'
            maxW={
                income.page === 0
                ? '520'
                : income.page === 1
                ? '650'
                : '650'
            }
            transition='max-width 0.3s ease-in-out, height 5s ease-in-out'
          >
            {income.page === 0 ? (
              <SelectTypeOfIncome
                income={income}
              />
            ) : income.page === 1 ? (
              <RegisterIncome
                income={income}
              />
            ) : (
              null
            )}
          </ModalContent>
        </Modal>
      )
}

export default IncomeModal