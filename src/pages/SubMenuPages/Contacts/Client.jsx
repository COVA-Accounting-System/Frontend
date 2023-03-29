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
  Input
} from '@chakra-ui/react'

// COMPONENTS IMPORTS
import ViewClient from '../../../components/ViewModals/ViewClient'
import DataTableActions from '../../../components/DataTableActions/DataTableActions'
import TextFormControl from '../../../components/Input/TextFormControl'
import PhoneFormControl from '../../../components/Input/PhoneFormControl'
import DeleteModal from '../../../components/DeleteModal/DeleteModal'
import Table from '../../../components/Table/Table'
import { Button } from '../../../components/Button/Button'

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
          onView: data => {
            client.setActualClientRedux(data)
            client.setViewModalIsOpen(true)
          },
          onEdit: data => {
            client.setName(data.name)
            client.setLastName(data.lastName)
            client.setPhoneCountryCode(data.phoneCountryCode)
            client.setPhoneNumber(data.phoneNumber)
            client.setAddress(data.address)
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
    <div>
      <div className='page-container'>
        <h1 className='page-title'>Clientes</h1>
        <div className='elements-container'>
          <section className='task-bar-datatable'>
            <div className='input-container'>
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
            </div>
            <div className='button-container'>
              <Button
                label='Registrar cliente'
                type='login'
                system='accounting'
                onClick={() => {
                  client.openModal()
                  client.changeActionRedux('create')
                  // dispatch(changeAction("create"));
                }}
              />
            </div>
          </section>
          <section className='table-section'>
            <Table
              gridRef={gridRef}
              gridOptions={gridOptions}
              rowData={client.clientsList}
            />
          </section>
        </div>
      </div>
      <Modal
        // initialFocusRef={initialRef}
        // finalFocusRef={finalRef}
        size='sm'
        onClose={() => client.closeModal()}
        isOpen={client.modalIsOpen}
      >
        <ModalOverlay />
        <ModalContent userSelect='none'>
          <form>
            <ModalHeader
              color='acsys.titleColor'
              fontWeight='700'
              fontSize='25px'
            >
              {client.action === 'create' ? 'Registrar cliente' : 'Editar cliente'}
            </ModalHeader>
            <ModalCloseButton color={'acsys.titleColor'} />
            <ModalBody pb={3}>
              <TextFormControl
                labelName='Nombres'
                width='330px'
                paddingSpace={0}
                value={client.name}
                onInput={data => client.setName(data)}
                isSubmited={client.isSubmited}
                isRequired
                isRequiredMessage='Este campo es obligatorio'
              />
              <TextFormControl
                labelName='Apellidos'
                width='330px'
                paddingSpace={4}
                value={client.lastName}
                onInput={data => client.setLastName(data)}
                isSubmited={client.isSubmited}
                isRequired
                isRequiredMessage='Este campo es obligatorio'
              />

              <PhoneFormControl
                phoneNumberValue={client.phoneNumber}
                phoneCountryCodeValue={client.phoneCountryCode}
                phoneNumberOnInput={number => {
                  client.setPhoneNumber(number)
                }}
                phoneCountryCodeOnInput={number => {
                  client.setPhoneCountryCode(number)
                }}
              />

              <TextFormControl
                labelName='Dirección'
                width='330px'
                paddingSpace={4}
                value={client.address}
                onInput={data => client.setAddress(data)}
                isRequired={false}
              />
            </ModalBody>

            <ModalFooter>
              <Button
                label='Guardar'
                type='confirm'
                onClick={
                  client.action === 'create'
                    ? client.onClickSave
                    : client.onEditSave
                }
              />
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
      <ViewClient
        isOpen={client.viewModalIsOpen}
        onClose={() => {
          client.setViewModalIsOpen(false)
        }}
      />
      <DeleteModal
        modalIsOpen={client.deleteModalIsOpen}
        entityName='Cliente'
        onClose={() => client.closeDeleteModal()}
        onDelete={() => {
          client.deleteActualClient()
          client.closeDeleteModal()
        }}
      />
    </div>
  )
}

export default Client
