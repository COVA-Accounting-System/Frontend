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
import DateFormControl from '../../../components/Input/DateFormControl'
import CountryFormControl from '../../../components/Input/CountryFormControl'
import DeleteModal from '../../../components/DeleteModal/DeleteModal'
import Table from '../../../components/Table/Table'
import ViewEmployee from '../../../components/ViewModals/ViewEmployee'

// HOOKS IMPORTS
import { useEmployee } from '../../../hooks/useEmployee'

// STYLES IMPORTS
import '../Template.styles.scss'

const Employee = () => {
  const gridRef = useRef()
  const employee = useEmployee()

  const columnDefs = useMemo(
    () => [
      {
        headerName: 'Nombres',
        field: 'name',
        resizable: true,
        sortable: true,
        unSortIcon: true,
        suppressMovable: true
        // width: 160
        // minWidth: 120,
        // maxWidth: 250,
      },
      {
        headerName: 'Apellidos',
        field: 'lastName',
        resizable: true,
        sortable: true,
        unSortIcon: true,
        suppressMovable: true
        // minWidth: 130,
        // width: 210
        // maxWidth: 250,
      },
      {
        headerName: 'CI',
        field: 'ci',
        resizable: true,
        sortable: true,
        unSortIcon: true,
        width: 150,
        suppressMovable: true
        // minWidth: 60,
        // maxWidth: 160,
      },
      {
        headerName: 'Teléfono',
        valueGetter: data => {
          return `${data.data.phoneCountryCode} ${data.data.phoneNumber}`
        },
        resizable: true,
        sortable: true,
        unSortIcon: true,
        suppressMovable: true
        // width: 140
        // minWidth: 110,
        // maxWidth: 160,
      },
      {
        headerName: 'Fecha de inicio',
        // field: 'startDate',
        valueGetter: data => {
          return new Date(data.data.startDate).toLocaleDateString()
        },
        resizable: true,
        sortable: true,
        unSortIcon: true,
        suppressMovable: true
        // width: 150
      },
      {
        headerName: 'Nacionalidad',
        // field: 'nationality',
        valueGetter: data => {
          return `${data.data.nationality}`
        },
        resizable: true,
        sortable: true,
        unSortIcon: true,
        suppressMovable: true
        // width: 150
        // minWidth: 140,
      },
      {
        headerName: 'Fecha de nacimiento',
        // field: 'birthday',
        valueGetter: data => {
          return new Date(data.data.birthday).toLocaleDateString()
        },
        resizable: true,
        sortable: true,
        unSortIcon: true,
        suppressMovable: true
        // width: 190
        // minWidth: 190,
      },
      {
        headerName: ' ',
        resizable: false,
        pinned: 'right',
        maxWidth: 160,
        cellRenderer: DataTableActions,
        colId: 'Actions',
        suppressMovable: true,
        cellRendererParams: {
          // onView: data => {
          //   employee.setActualEmployeeRedux(data)
          //   employee.setViewModalIsOpen(true)
          // },
          onEdit: data => {
            employee.setName(data.name)
            employee.setLastName(data.lastName)
            employee.setPhoneCountryCode(data.phoneCountryCode)
            employee.setPhoneNumber(data.phoneNumber)
            employee.setBirthday(data.birthday)
            employee.setNationality(data.nationality)
            employee.setStartDate(data.startDate)
            employee.setCi(data.ci)
            employee.changeActionRedux('edit')
            employee.setActualEmployeeRedux(data)
            employee.openModal()
          },
          onDelete: data => {
            employee.setDeleteModalIsOpen(true)
            employee.setActualEmployeeRedux(data)
          }
        }
      }
    ],
    []
  )

  const gridOptions = useMemo(
    () => ({
      pagination: false,
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
      Operadores
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
                  employee.openModal()
                  employee.changeActionRedux('create')
                }}
              >
                Registrar operador
              </Button>
          </Stack>
          <Stack height={'100%'}>
          <Table
              gridRef={gridRef}
              gridOptions={gridOptions}
              rowData={employee.employeesList.reverse()}
            />
          </Stack>
      <Modal
        size='sm'
        onClose={() => employee.closeModal()}
        isOpen={employee.modalIsOpen}
      >
        <ModalOverlay />
        <ModalContent userSelect='none' maxW='730px'>
          <ModalHeader
            color='acsys.titleColor'
            fontWeight='700'
            fontSize='25px'
          >
            {employee.action === 'create'
              ? 'Registrar operador'
              : 'Editar operador'}
          </ModalHeader>
          <ModalCloseButton color={'acsys.titleColor'} />

          <ModalBody pb={3}>
            <form className='two-column-grid'>
              <div>
                <TextFormControl
                  labelName='Nombres'
                  width='330px'
                  paddingSpace={0}
                  value={employee.name}
                  onInput={data => employee.setName(data)}
                  isSubmited={employee.isSubmited}
                  isRequired
                  isRequiredMessage='Este campo es obligatorio'
                />
                <TextFormControl
                  labelName='CI'
                  width='330px'
                  paddingSpace={4}
                  value={employee.ci}
                  onInput={data => employee.setCi(data)}
                  isSubmited={employee.isSubmited}
                  isRequired
                  isRequiredMessage='Este campo es obligatorio'
                />
                <DateFormControl
                  labelName='Fecha de nacimiento'
                  width='330px'
                  paddingSpace={4}
                  value={employee.birthday}
                  onInput={data => employee.setBirthday(data)}
                  isRequired={false}
                />
                <DateFormControl
                  labelName='Fecha de inicio'
                  width='330px'
                  paddingSpace={4}
                  value={employee.startDate}
                  onInput={data => employee.setStartDate(data)}
                  isRequired={false}
                />
              </div>

              <div>
                <TextFormControl
                  labelName='Apellidos'
                  width='330px'
                  paddingSpace={0}
                  value={employee.lastName}
                  onInput={data => employee.setLastName(data)}
                  isSubmited={employee.isSubmited}
                  isRequired
                  isRequiredMessage='Este campo es obligatorio'
                />
                <CountryFormControl
                  labelName='Nacionalidad'
                  value={employee.nationality}
                  onSelectCountry={data => employee.setNationality(data)}
                />
                <PhoneFormControl
                  phoneNumberValue={employee.phoneNumber}
                  phoneCountryCodeValue={employee.phoneCountryCode}
                  phoneNumberOnInput={number => {
                    employee.setPhoneNumber(number)
                  }}
                  phoneCountryCodeOnInput={number => {
                    employee.setPhoneCountryCode(number)
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
              isLoading={employee.isLoading}
              onClick={
                employee.action === 'create'
                  ? employee.onClickSave
                  : employee.onEditSave
              }
            >
              Guardar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <ViewEmployee
        isOpen={employee.viewModalIsOpen}
        onClose={() => {
          employee.setViewModalIsOpen(false)
        }}
      />
      <DeleteModal
        isLoading={employee.isLoading}
        modalIsOpen={employee.deleteModalIsOpen}
        entityName='Operador'
        onClose={() => employee.closeDeleteModal()}
        onDelete={() => {
          employee.deleteActualEmployee()
        }}
      />
    </Stack>
  )
}

export default Employee
