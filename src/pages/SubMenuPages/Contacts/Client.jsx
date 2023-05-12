// REACT IMPORTS
import React, { useMemo, useCallback, useRef } from 'react'

// CHAKRA UI IMPORTS
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  Button,
  Stack,
  Flex,
  IconButton,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  Text,
  PopoverBody,
  PopoverCloseButton
} from '@chakra-ui/react'

import { QuestionIcon } from '@chakra-ui/icons'

// COMPONENTS IMPORTS
// import ViewClient from '../../../components/ViewModals/ViewClient'
import DataTableActions from '../../../components/DataTableActions/DataTableActions'
import TextFormControl from '../../../components/Input/TextFormControl'
import PhoneFormControl from '../../../components/Input/PhoneFormControl'
import PriceFormControl from '../../../components/Input/PriceFormControl'
import DeleteModal from '../../../components/DeleteModal/DeleteModal'
import Table from '../../../components/Table/Table'

// HOOKS IMPORTS
import { useClient } from '../../../hooks/useClient'

// STYLES IMPORTS
import '../Template.styles.scss'

const Client = () => {
  const gridRef = useRef()
  const client = useClient()

  const columnDefs = useMemo(
    () => [
      {
        headerName: 'Nombres',
        field: 'name',
        resizable: true,
        sortable: true,
        unSortIcon: true
        // width: 180,
        // minWidth: 100,

        // maxWidth: 230,
      },
      {
        headerName: 'Apellidos',
        field: 'lastName',
        resizable: true,
        sortable: true,
        unSortIcon: true
        // minWidth: 100,
        // width: 230
        // maxWidth: 270,
      },
      {
        headerName: 'Teléfono',
        // field: 'phoneCountryCode', 'phoneNumber',
        valueGetter: data => {
          return `${data.data.phoneCountryCode} ${data.data.phoneNumber}`
        },
        unSortIcon: true,
        sortable: true,
        resizable: true
        // minWidth: 100,
        // width: 190
        // maxWidth: 200,
      },
      {
        headerName: 'Adeuda',
        // field: 'phoneCountryCode', 'phoneNumber',
        valueGetter: data => {
          return `${data.data.balance} Bs.`
        },
        unSortIcon: true,
        sortable: true,
        resizable: true
        // minWidth: 100,
        // width: 190
        // maxWidth: 200,
      },
      {
        headerName: 'Dirección',
        field: 'address',
        resizable: true,
        sortable: true,
        // minWidth: 110,
        flex: 1
      },
      {
        headerName: ' ',
        resizable: false,
        pinned: 'right',
        maxWidth: 160,
        cellRenderer: DataTableActions,
        colId: 'Actions',
        cellRendererParams: {
          // onView: data => {
          //   client.setActualClientRedux(data)
          //   client.setViewModalIsOpen(true)
          // },
          onEdit: data => {
            client.setName(data.name)
            client.setLastName(data.lastName)
            client.setPhoneCountryCode(data.phoneCountryCode)
            client.setPhoneNumber(data.phoneNumber)
            client.setAddress(data.address)
            client.setBalance(data.balance)
            client.changeActionRedux('edit')
            client.setActualClientRedux(data)
            client.openModal()
          },
          onDelete: data => {
            client.setDeleteModalIsOpen(true)
            client.setActualClientRedux(data)
          }
        }
      }
    ],
    []
  )

  const gridOptions = useMemo(
    () => ({
      pagination: false,
      onGridReady: params => {
        // params.api.sizeColumnsToFit()
        // params.columnApi.autoSizeAllColumns();
      },
      onGridSizeChanged: params => {
        // params.api.sizeColumnsToFit();
      },
      columnDefs,
      cacheQuickFilter: true,
      // rowSelection: "single",
      animateRows: true
    }),
    [columnDefs]
  )

  const onFilterTextBoxChanged = useCallback(() => {
    gridRef.current.api.setQuickFilter(
      document.getElementById('filter-text-box').value
    )
  }, [])

  return (
    <Stack h='100%' p={'8'}>
        <Text fontSize={'27px'} fontWeight={'bold'} color={'acsys.titleColor'}>
          Clientes
        </Text>
          <Stack direction={'row'} justifyContent={'space-between'}>
              <Input
                focusBorderColor='acsys.primaryColor'
                placeholder='Buscar...'
                size='sm'
                width={350}
                onChange={onFilterTextBoxChanged}
                color='acsys.iconColor'
                id='filter-text-box'
                spellCheck='false'
                borderRadius='5px'
                height='35px'
                fontSize='15px'
                autoComplete='off'
                borderColor={'gray.200'}
              />    
              <Button
                backgroundColor={'acsys.primaryColor'}
                _hover={{ backgroundColor: '#098bb6' }}
                colorScheme='linkedin'
                // color='white'
                onClick={() => {
                  client.openModal()
                  client.changeActionRedux('create')
                  // dispatch(changeAction("create"));
                }}
              >
                Registrar cliente
              </Button>
          </Stack>
          <Stack height={'100%'}>
            <Table
              gridRef={gridRef}
              gridOptions={gridOptions}
              rowData={client.clientsList}
            />
          </Stack>
      <Modal
        // initialFocusRef={initialRef}
        // finalFocusRef={finalRef}
        size={'xl'}
        onClose={() => client.closeModal()}
        isOpen={client.modalIsOpen}
      >
        <ModalOverlay />
        <ModalContent userSelect='none' maxW='350px'>
          <form>
            <ModalHeader
              color='acsys.titleColor'
              fontWeight='700'
              fontSize='25px'
            >
              {client.action === 'create'
                ? 'Registrar cliente'
                : 'Editar cliente'}
            </ModalHeader>
            <ModalCloseButton color={'acsys.titleColor'} />
            <ModalBody pb={3}>
              <Stack direction={'column'} rowGap={1}>
                <TextFormControl
                  labelName='Nombres'
                  paddingSpace={0}
                  value={client.name}
                  onInput={data => client.setName(data)}
                  isSubmited={client.isSubmited}
                  isRequired
                  isRequiredMessage='Este campo es obligatorio'
                />
                <TextFormControl
                  labelName='Apellidos'
                  paddingSpace={0}
                  value={client.lastName}
                  onInput={data => client.setLastName(data)}
                  isSubmited={client.isSubmited}
                  isRequired
                  isRequiredMessage='Este campo es obligatorio'
                />
                <Stack direction={'row'}>
                  <PriceFormControl
                    mt={0}
                    labelName='Monto que adeuda'
                    value={client.balance}
                    onInput={data => client.setBalance(data)}
                    isSubmited={client.isSubmited}
                    isRequired
                    isRequiredMessage='Este campo es obligatorio'
                  />
                  <Flex alignItems={'flex-end'}>
                    <Popover>
                      <PopoverTrigger>
                        <IconButton
                          height={'35px'}
                          width={'35px'}
                          icon={<QuestionIcon />}
                          color={'acsys.titleColor'}
                        />
                      </PopoverTrigger>
                      <PopoverContent>
                        <PopoverCloseButton />
                        <PopoverBody color={'acsys.iconColor'} fontSize={'sm'}>
                          Este es el monto que adeuda el cliente al momento del
                          registro, si el cliente no adeuda nada, puede dejar
                          este campo en 0. Este monto se
                          <span style={{ fontWeight: '600', color: '#109AC6' }}>
                            {' '}
                            actualiza automáticamente
                          </span>{' '}
                          cuando un pedido es entregado o cuando se registra un
                          ingreso.
                        </PopoverBody>
                      </PopoverContent>
                    </Popover>
                  </Flex>
                </Stack>
                <TextFormControl
                  labelName='Dirección'
                  // width='330px'

                  paddingSpace={0}
                  value={client.address}
                  onInput={data => client.setAddress(data)}
                  isRequired={false}
                />
                <PhoneFormControl
                  phoneNumberValue={client.phoneNumber}
                  mt={0}
                  phoneCountryCodeValue={client.phoneCountryCode}
                  phoneNumberOnInput={number => {
                    client.setPhoneNumber(number)
                  }}
                  phoneCountryCodeOnInput={number => {
                    client.setPhoneCountryCode(number)
                  }}
                />
              </Stack>
            </ModalBody>

            <ModalFooter>
              <Button
                backgroundColor={'acsys.primaryColor'}
                _hover={{ backgroundColor: '#098bb6' }}
                colorScheme='linkedin'
                isLoading={client.isLoading}
                onClick={
                  client.action === 'create'
                    ? client.onClickSave
                    : client.onEditSave
                }
              >
                Guardar
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
      <DeleteModal
        isLoading={client.isLoading}
        modalIsOpen={client.deleteModalIsOpen}
        entityName='Cliente'
        onClose={() => client.closeDeleteModal()}
        onDelete={() => {
          client.deleteActualClient()
        }}
      />
    </Stack>
  )
}

export default Client
