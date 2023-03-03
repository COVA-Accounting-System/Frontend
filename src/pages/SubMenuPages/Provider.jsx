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
import DataTableActions from '../../components/DataTableActions/DataTableActions'
import TextFormControl from '../../components/Input/TextFormControl'
import PhoneFormControl from '../../components/Input/PhoneFormControl'
import CountryFormControl from '../../components/Input/CountryFormControl'
import DeleteModal from '../../components/DeleteModal/DeleteModal'
import Table from '../../components/Table/Table'
import { Button } from '../../components/Button/Button'

// HOOKS IMPORTS
import { useProvider } from '../../hooks/useProvider'

// STYLES IMPORTS
import './Template.styles.scss'

const Provider = () => {
  const gridRef = useRef()
  const provider = useProvider()

  const columnDefs = useMemo(
    () => [
      {
        headerName: 'Tienda',
        field: 'storeName',
        resizable: false,
        sortable: true,
        // minWidth: 110,
        width: 220
        // maxWidth: 300,
      },
      {
        headerName: 'NIT',
        field: 'nit',
        resizable: false,
        sortable: true,
        // minWidth: 100,
        width: 130
        // maxWidth: 160,
      },
      {
        headerName: 'Teléfono',
        field: 'phoneNumber',
        resizable: false,
        cellRenderer: (data) => {
          return `${data.data.phoneCountryCode} ${data.data.phoneNumber}`
        },
        // minWidth: 120,
        width: 147
        // maxWidth: 177,
      },
      {
        headerName: 'Ciudad',
        field: 'city',
        resizable: false,
        sortable: true,
        // minWidth: 120,
        width: 150
        // maxWidth: 180,
      },
      {
        headerName: 'Pais',
        field: 'country',
        resizable: false,
        sortable: true,
        width: 150
        // minWidth: 100,
        // maxWidth: 180,
      },
      {
        headerName: 'Direccion',
        field: 'address',
        resizable: false,
        sortable: true,
        // minWidth: 130,
        width: 240
        // maxWidth: 320,
      },
      {
        headerName: ' ',
        resizable: false,
        pinned: 'right',
        maxWidth: 160,
        cellRenderer: DataTableActions,
        colId: 'Actions',
        cellRendererParams: {
          onView: () => {},
          onEdit: (data) => {
            provider.setStoreName(data.storeName)
            provider.setNit(data.nit)
            provider.setCountry(data.country)
            provider.setCity(data.city)
            provider.setPhoneCountryCode(data.phoneCountryCode)
            provider.setPhoneNumber(data.phoneNumber)
            provider.setAddress(data.address)
            provider.changeActionRedux('edit')
            provider.setActualProviderRedux(data)
            provider.openModal()
          },
          onDelete: (data) => {
            provider.setDeleteModalIsOpen(true)
            provider.setActualProviderRedux(data)
          }
        }
      }
    ],
    []
  )

  const gridOptions = useMemo(
    () => ({
      pagination: false,
      onGridReady: (params) => {
        // params.columnApi.autoSizeAllColumns();
      },
      onGridSizeChanged: (params) => {
        // params.columnApi.autoSizeAllColumns();
      },
      columnDefs,
      cacheQuickFilter: true,
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
        <h1 className='page-title'>Proveedores</h1>
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
              />
            </div>
            <div className='button-container'>
              <Button
                label='Crear proveedor'
                type='login'
                system='accounting'
                onClick={() => {
                  provider.openModal()
                  provider.changeActionRedux('create')
                }}
              />
            </div>
          </section>
          <section className='table-section'>
            <Table
              gridRef={gridRef}
              gridOptions={gridOptions}
              rowData={provider.providersList}
            />
          </section>
        </div>
      </div>
      <Modal
        size='sm'
        onClose={() => provider.closeModal()}
        isOpen={provider.modalIsOpen}
      >
        <ModalOverlay />
        <ModalContent userSelect='none' maxW='730px'>
          <ModalHeader
            color='acsys.titleColor'
            fontWeight='700'
            fontSize='25px'
          >
            Crear proveedor
          </ModalHeader>
          <ModalCloseButton color={'acsys.titleColor'}/>

          <ModalBody pb={3}>
            <form className='three-rows-grid'>
              <div className='two-column-grid'>
                <TextFormControl
                  labelName='Nombre de la tienda'
                  paddingSpace={0}
                  value={provider.storeName}
                  onInput={(data) => provider.setStoreName(data)}
                  isSubmited={provider.isSubmited}
                  isRequired
                  isRequiredMessage='Este campo es obligatorio'
                />
                <TextFormControl
                  labelName='NIT'
                  paddingSpace={0}
                  value={provider.nit}
                  onInput={(data) => provider.setNit(data)}
                  // isSubmited={provider.isSubmited}
                  isRequired={false}
                  // isRequiredMessage="Este campo es obligatorio"
                />
              </div>
              <div className='two-column-grid'>
                <CountryFormControl
                  labelName='País'
                  value={provider.country}
                  onSelectCountry={(data) => provider.setCountry(data)}
                />
                <TextFormControl
                  labelName='Ciudad'
                  paddingSpace={4}
                  value={provider.city}
                  onInput={(data) => provider.setCity(data)}
                  // isSubmited={provider.isSubmited}
                  isRequired={false}
                  // isRequiredMessage='Este campo es obligatorio'
                />
              </div>
              <div className='two-column-grid'>
                <TextFormControl
                  labelName='Dirección'
                  paddingSpace={4}
                  value={provider.address}
                  onInput={(data) => provider.setAddress(data)}
                  // isSubmited={provider.isSubmited}
                  isRequired={false}
                  // isRequiredMessage='Este campo es obligatorio'
                />
                <PhoneFormControl
                  phoneNumberValue={provider.phoneNumber}
                  phoneCountryCodeValue={provider.phoneCountryCode}
                  phoneNumberOnInput={(number) => {
                    provider.setPhoneNumber(number)
                  }}
                  phoneCountryCodeOnInput={(number) => {
                    provider.setPhoneCountryCode(number)
                  }}
                />
              </div>
            </form>
          </ModalBody>

          <ModalFooter>
            <Button
              label='Guardar'
              type='confirm'
              onClick={
                provider.action === 'create'
                  ? provider.onClickSave
                  : provider.onEditSave
              }
            />
          </ModalFooter>
        </ModalContent>
      </Modal>

      <DeleteModal
        modalIsOpen={provider.deleteModalIsOpen}
        entityName='Proveedor'
        onClose={() => provider.closeDeleteModal()}
        onDelete={() => {
          provider.deleteActualProvider()
          provider.closeDeleteModal()
        }}
      />
    </div>
  )
}

export default Provider
