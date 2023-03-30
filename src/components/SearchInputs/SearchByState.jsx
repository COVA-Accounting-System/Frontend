import React, { useState } from 'react'

import {
  Checkbox,
  Menu,
  MenuButton,
  Button,
  MenuList,
  MenuItem,
  Flex
} from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons'

import { orderState } from '../../assets/orderState'

import StateTag from '../StateTags/StateTag'
import StateTagSquare from '../StateTags/StateTagSquare'

const SearchByState = ({
  filterByState,
  setFilterByState,
  externalFilterChanged
}) => {
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
          {filterByState.pending === true ? (
            <StateTagSquare color={orderState[0].color} />
          ) : null}
          {filterByState.inProgress === true ? (
            <StateTagSquare color={orderState[1].color} />
          ) : null}
          {filterByState.ready === true ? (
            <StateTagSquare color={orderState[2].color} />
          ) : null}
          {filterByState.delivered === true ? (
            <StateTagSquare color={orderState[3].color} />
          ) : null}
        </Flex>
      </MenuButton>
      <MenuList
        size='lg'
        // zIndex={1}
        fontSize='13px'
        minWidth='260px'
        color='acsys.titleColor'
        // gap={10}
      >
        <MenuItem padding={0} margin={0}>
          <Flex width={'100%'}>
            <Checkbox
              // w={'100%'}
              width={'100%'}
              _hover={{ bg: 'gray.100' }}
              p={1.5}
              pl={3}
              isChecked={filterByState.pending}
              onChange={e => {
                setFilterByState(prev => ({
                  ...prev,
                  pending: e.target.checked
                }))
                externalFilterChanged({
                  ...filterByState,
                  pending: e.target.checked
                })
              }}
            >
              <StateTag data={{ orderStateNumber: 0 }} />
            </Checkbox>
          </Flex>
        </MenuItem>
        <MenuItem padding={0} margin={0}>
          <Checkbox
            width={'100%'}
            _hover={{ bg: 'gray.100' }}
            p={1.5}
            pl={3}
            isChecked={filterByState.inProgress}
            onChange={e => {
              setFilterByState(prev => ({
                ...prev,
                inProgress: e.target.checked
              }))
              externalFilterChanged({
                ...filterByState,
                inProgress: e.target.checked
              })
            }}
          >
            <StateTag data={{ orderStateNumber: 1 }} />
          </Checkbox>
        </MenuItem>
        <MenuItem padding={0} margin={0}>
          <Checkbox
            width={'100%'}
            _hover={{ bg: 'gray.100' }}
            p={1.5}
            pl={3}
            isChecked={filterByState.ready}
            onChange={e => {
              setFilterByState(prev => ({
                ...prev,
                ready: e.target.checked
              }))
              externalFilterChanged({
                ...filterByState,
                ready: e.target.checked
              })
            }}
          >
            <StateTag data={{ orderStateNumber: 2 }} />
          </Checkbox>
        </MenuItem>
        <MenuItem padding={0} margin={0}>
          <Checkbox
            width={'100%'}
            _hover={{ bg: 'gray.100' }}
            p={1.5}
            pl={3}
            isChecked={filterByState.delivered}
            onChange={e => {
              setFilterByState(prev => ({
                ...prev,
                delivered: e.target.checked
              }))
              externalFilterChanged({
                ...filterByState,
                delivered: e.target.checked
              })
            }}
          >
            <StateTag data={{ orderStateNumber: 3 }} />
          </Checkbox>
        </MenuItem>
      </MenuList>
    </Menu>
  )
}

export default SearchByState
