import React, { useEffect, useState } from 'react'

import {
  Stack,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Text,
  IconButton
} from '@chakra-ui/react'

import { DeleteIcon, EditIcon } from '@chakra-ui/icons'


import DeleteModal from '../../components/DeleteModal/DeleteModal'
import EditModalAdmin from './EditModalAdmin'

import { useUser } from '../../hooks/useUser'


const ListOfUsers = () => {
  const user = useUser()
  return (
    <>
      <Stack margin={12} spacing={6}>
        <Stack>
          <Text fontSize={'40px'} fontWeight={'800'} color={'acsys.titleColor'}>
            Lista de usuarios
          </Text>
        </Stack>
        <Stack>
          <TableContainer maxH={'calc(100vh - 190px)'} overflowY='auto'>
            <Table size='sm'>
              <Thead
                //Sticky header
                position={'sticky'}
                top={0}
                zIndex={1}
                bgColor={'white'}
                borderBottom={'1px'}
                borderColor={'#E2E8F0'}
                boxShadow={'0px 2px 4px rgba(0, 0, 0, 0.05)'}
              >
                <Tr>
                  <Th>Nombres</Th>
                  <Th>Apellidos</Th>
                  <Th>Rubro</Th>
                  <Th>Email</Th>
                  <Th>Teléfono</Th>
                  <Th></Th>
                  <Th></Th>
                </Tr>
              </Thead>
              <Tbody>
                {user.users.map((userElement, index) => {
                  return (
                    <Tr key={`${userElement.name}-${index}`}>
                      <Td color={'acsys.iconColor'}>{userElement.name}</Td>
                      <Td color={'acsys.iconColor'}>{userElement.lastName}</Td>
                      <Td color={'acsys.iconColor'}>{userElement.field}</Td>
                      <Td color={'acsys.iconColor'}>{userElement.email}</Td>
                      <Td color={'acsys.iconColor'}>{userElement.phone}</Td>
                      <Td>
                        <IconButton
                          size={'sm'}
                          color={'acsys.fontColor'}
                          icon={<EditIcon />}
                          onClick={() => {
                            user.setIsEditModalOpen(true)
                            user.loadFields(userElement)
                          }}
                        />
                      </Td>
                      <Td>
                        {' '}
                        <IconButton
                          size={'sm'}
                          _hover={{ color: 'red.500' }}
                          color={'acsys.fontColor'}
                          icon={<DeleteIcon />}
                          onClick={() => {
                            user.setIsDeleteModalOpen(true)
                            user.setActualUser(userElement)
                          }}
                        />
                      </Td>
                    </Tr>
                  )
                })}
                {/* <Tr>
                <Td>inches</Td>
                <Td>millimetres (mm)</Td>
                <Td isNumeric>25.4</Td>
              </Tr> */}
              </Tbody>
              <Tfoot>
                {/* <Tr>
                <Th>To convert</Th>
                <Th>into</Th>
                <Th isNumeric>multiply by</Th>
              </Tr> */}
              </Tfoot>
            </Table>
          </TableContainer>
        </Stack>
      </Stack>
      <DeleteModal
        isLoading={user.isLoading}
        modalIsOpen={user.isDeleteModalOpen}
        entityName='usuario'
        onClose={() => user.setIsDeleteModalOpen(false)}
        onDelete={user.handleDelete}
      />
      <EditModalAdmin
        userHook={user}
      />
    </>
  )
}

export default ListOfUsers
