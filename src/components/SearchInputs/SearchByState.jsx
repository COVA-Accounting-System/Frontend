import React, { useState } from 'react'

import {
  Checkbox,
  Menu,
  MenuButton,
  Button,
  MenuList,
  MenuItem,
  Flex,
  Stack
} from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons'

import { orderState } from '../../assets/orderState'
import { useOrderState } from '../../hooks/useOrderState'

import StateTag from '../StateTags/StateTag'
import StateTagSquare from '../StateTags/StateTagSquare'

const SearchByState = () => {
  const orderStateHook = useOrderState()
  // const [onHoldingCheck, setOnHoldingCheck] = useState(true)
  // const [onProductionCheck, setOnProductionCheck] = useState(true)
  // const [finishedCheck, setFinishedCheck] = useState(true)
  // const [deliveredCheck, setDeliveredCheck] = useState(true)
  return (
    <Menu closeOnSelect={false}>
      <MenuButton
        width={'260px'}
        as={Button}
        rightIcon={<ChevronDownIcon />}
        fontWeight={500}
        fontSize='13px'
        color='acsys.titleColor'
        height='35px'
        textAlign={'left'}
      >
        <Flex>
          Filtar por estado:
          {orderStateHook.onHoldingCheck ? (
            <StateTagSquare color={orderState[0].color} />
          ) : null}
          {orderStateHook.onProductionCheck ? (
            <StateTagSquare color={orderState[1].color} />
          ) : null}
          {orderStateHook.finishedCheck ? (
            <StateTagSquare color={orderState[2].color} />
          ) : null}
          {orderStateHook.deliveredCheck ? (
            <StateTagSquare color={orderState[3].color} />
          ) : null}
        </Flex>
      </MenuButton>
      <MenuList
        size='lg'
        zIndex={1}
        fontSize='13px'
        minWidth='260px'
        color='acsys.titleColor'
        gap={10}
      >
        <Stack spacing={0}>
          <Checkbox
            // w={'100%'}
            _hover={{ bg: 'gray.100' }}
            p={1.5}
            pl={3}
            isChecked={orderStateHook.onHoldingCheck}
            onChange={e => orderStateHook.setOnHoldingCheck(e.target.checked)}
          >
            <StateTag data={{ orderStateNumber: 0 }} />
          </Checkbox>
          <Checkbox
            _hover={{ bg: 'gray.100' }}
            p={1.5}
            pl={3}
            isChecked={orderStateHook.onProductionCheck}
            onChange={e => orderStateHook.setOnProductionCheck(e.target.checked)}
          >
            <StateTag data={{ orderStateNumber: 1 }} />
          </Checkbox>
          <Checkbox
            _hover={{ bg: 'gray.100' }}
            p={1.5}
            pl={3}
            isChecked={orderStateHook.finishedCheck}
            onChange={e => orderStateHook.setFinishedCheck(e.target.checked)}
          >
            <StateTag data={{ orderStateNumber: 2 }} />
          </Checkbox>
          <Checkbox
            _hover={{ bg: 'gray.100' }}
            p={1.5}
            pl={3}
            isChecked={orderStateHook.deliveredCheck}
            onChange={e => orderStateHook.setDeliveredCheck(e.target.checked)}
          >
            <StateTag data={{ orderStateNumber: 3 }} />
          </Checkbox>
        </Stack>
      </MenuList>
    </Menu>
  )
}

export default SearchByState
