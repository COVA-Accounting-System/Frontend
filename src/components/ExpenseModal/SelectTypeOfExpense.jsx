import React from 'react'
// CHAKRA UI IMPORTS
import {
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Stack,
  Checkbox,
  ModalFooter
} from '@chakra-ui/react'

import { Button } from '../Button/Button'

const SelectTypeOfExpense = ({ expenseHook, setPages }) => {
  return (
    <>

      <ModalHeader color='acsys.titleColor' fontWeight='700' fontSize='25px'>
        Seleccione un tipo de gasto
      </ModalHeader>
      <ModalCloseButton color={'acsys.titleColor'} />

      <ModalBody pb={3}>
        <Stack direction='column' spacing={1} pl={2}>
          <Checkbox
            p={2}
            isChecked={expenseHook.typeOfExpense.rawMaterial}
            _hover={{ bg: 'acsys.backgroundColor', borderRadius: '2px' }}
            colorScheme={'blue'}
            size='md'
            color={'acsys.titleColor'}
            onChange={e =>
              expenseHook.setTypeOfExpense({
                rawMaterial: e.target.checked,
                labour: false,
                indirectCosts: false
              })
            }
          >
            Materia prima
          </Checkbox>
          <Checkbox
            p={2}
            isChecked={expenseHook.typeOfExpense.labour}
            _hover={{ bg: 'acsys.backgroundColor', borderRadius: '2px' }}
            colorScheme={'blue'}
            size='md'
            color={'acsys.titleColor'}
            onChange={e =>
              expenseHook.setTypeOfExpense({
                rawMaterial: false,
                labour: e.target.checked,
                indirectCosts: false
              })
            }
          >
            Mano de obra directa
          </Checkbox>
          <Checkbox
            p={2}
            isChecked={expenseHook.typeOfExpense.indirectCosts}
            _hover={{ bg: 'acsys.backgroundColor', borderRadius: '2px' }}
            colorScheme={'blue'}
            size='md'
            color={'acsys.titleColor'}
            onChange={e =>
              expenseHook.setTypeOfExpense({
                rawMaterial: false,
                labour: false,
                indirectCosts: e.target.checked
              })
            }
          >
            Costos indirectos de fabricación
          </Checkbox>
        </Stack>
      </ModalBody>
      <ModalFooter>
          <Button
            label='Siguiente'
            type='confirm'
            onClick={
              // expenseHook.action === 'create'
              //   ? expenseHook.onClickSave
              //   : expenseHook.onEditSave
              () => setPages([false, true, false])
            }
          />
        </ModalFooter>

    </>
  )
}

export default SelectTypeOfExpense
