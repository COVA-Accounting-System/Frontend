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
  Text
} from '@chakra-ui/react'

// COMPONENTS IMPORTS
import DataTableActions from '../../../components/DataTableActions/DataTableActions'
import TextFormControl from '../../../components/Input/TextFormControl'
import PhoneFormControl from '../../../components/Input/PhoneFormControl'
import CountryFormControl from '../../../components/Input/CountryFormControl'
import DeleteModal from '../../../components/DeleteModal/DeleteModal'
import Table from '../../../components/Table/Table'

// HOOKS IMPORTS
import { useProvider } from '../../../hooks/useProvider'

// STYLES IMPORTS
import '../Template.styles.scss'

const Provider = () => {
  const gridRef = useRef()
  const provider = useProvider()

  const columnDefs = useMemo(
    () => [
      {
        headerName: 'Tienda',
        field: 'storeName',
        resizable: true,
        sortable: true,
        unSortIcon: true,
        suppressMovable: true,
        width: 250
      },
      {
        headerName: 'NIT',
        field: 'nit',
        resizable: true,
        sortable: true,
        unSortIcon: true,
        suppressMovable: true,
        width: 160
      },
      {
        headerName: 'Teléfono',
        field: 'phoneNumber',
        valueGetter: data => {
          return `${data.data.phoneCountryCode} ${data.data.phoneNumber}`
        },
        resizable: true,
        sortable: true,
        unSortIcon: true,
        suppressMovable: true,
      },
      {
        headerName: 'Ciudad',
        field: 'city',
        resizable: true,
        sortable: true,
        suppressMovable: true,
        unSortIcon: true
      },
      {
        headerName: 'Pais',
        field: 'country',
        resizable: true,
        sortable: true,
        suppressMovable: true,
        unSortIcon: true
      },
      {
        headerName: 'Direccion',
        field: 'address',
        resizable: true,
        sortable: true,
        unSortIcon: true,
        suppressMovable: true,
        width: 300
        // maxWidth: 320,
      },
      {
        headerName: ' ',
        resizable: false,
        pinned: 'right',
        maxWidth: 160,
        cellRenderer: DataTableActions,
        suppressMovable: true,
        colId: 'Actions',
        cellRendererParams: {
          // onView: () => {},
          onEdit: data => {
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
          onDelete: data => {
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
      onGridReady: params => {
        // params.columnApi.autoSizeAllColumns();
      },
      onGridSizeChanged: params => {
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
    <Stack h='100%' p={'8'} minW={'850px'}>
      <Text fontSize={'27px'} fontWeight={'bold'} color={'acsys.titleColor'}>
        Proveedores
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
            provider.openModal()
            provider.changeActionRedux('create')
          }}
        >
          Registrar proveedor
        </Button>
      </Stack>
      <Stack height={'100%'}>
        <Table
          gridRef={gridRef}
          gridOptions={gridOptions}
          rowData={provider.providersList.reverse()}
        />
      </Stack>
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
            {provider.action === 'create'
              ? 'Registrar proveedor'
              : 'Editar proveedor'}
          </ModalHeader>
          <ModalCloseButton color={'acsys.titleColor'} />

          <ModalBody pb={3}>
            <form className='three-rows-grid'>
              <div className='two-column-grid'>
                <TextFormControl
                  labelName='Nombre de la tienda'
                  paddingSpace={0}
                  value={provider.storeName}
                  onInput={data => provider.setStoreName(data)}
                  isSubmited={provider.isSubmited}
                  isRequired
                  isRequiredMessage='Este campo es obligatorio'
                />
                <TextFormControl
                  labelName='NIT'
                  paddingSpace={0}
                  value={provider.nit}
                  onInput={data => provider.setNit(data)}
                  // isSubmited={provider.isSubmited}
                  isRequired={false}
                  // isRequiredMessage="Este campo es obligatorio"
                />
              </div>
              <div className='two-column-grid'>
                <CountryFormControl
                  labelName='País'
                  value={provider.country}
                  onSelectCountry={data => provider.setCountry(data)}
                />
                <TextFormControl
                  labelName='Ciudad'
                  paddingSpace={4}
                  value={provider.city}
                  onInput={data => provider.setCity(data)}
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
                  onInput={data => provider.setAddress(data)}
                  // isSubmited={provider.isSubmited}
                  isRequired={false}
                  // isRequiredMessage='Este campo es obligatorio'
                />
                <PhoneFormControl
                  phoneNumberValue={provider.phoneNumber}
                  phoneCountryCodeValue={provider.phoneCountryCode}
                  phoneNumberOnInput={number => {
                    provider.setPhoneNumber(number)
                  }}
                  phoneCountryCodeOnInput={number => {
                    provider.setPhoneCountryCode(number)
                  }}
                />
              </div>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button
              backgroundColor={'acsys.primaryColor'}
              _hover={{ backgroundColor: '#098bb6' }}
              colorScheme='linkedin'
              isLoading={provider.isLoading}
              onClick={
                provider.action === 'create'
                  ? provider.onClickSave
                  : provider.onEditSave
              }
            >
              Guardar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <DeleteModal
        isLoading={provider.isLoading}
        modalIsOpen={provider.deleteModalIsOpen}
        entityName='Proveedor'
        onClose={() => provider.closeDeleteModal()}
        onDelete={() => {
          provider.deleteActualProvider()
        }}
      />
    </Stack>
  )
}

export default Provider
