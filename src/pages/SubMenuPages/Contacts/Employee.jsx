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
import DataTableActions from '../../../components/DataTableActions/DataTableActions'
import TextFormControl from '../../../components/Input/TextFormControl'
import PhoneFormControl from '../../../components/Input/PhoneFormControl'
import DateFormControl from '../../../components/Input/DateFormControl'
import CountryFormControl from '../../../components/Input/CountryFormControl'
import DeleteModal from '../../../components/DeleteModal/DeleteModal'
import Table from '../../../components/Table/Table'
import { Button } from '../../../components/Button/Button'

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
        unSortIcon: true
        // width: 160
        // minWidth: 120,
        // maxWidth: 250,
      },
      {
        headerName: 'Apellidos',
        field: 'lastName',
        resizable: true,
        sortable: true,
        unSortIcon: true
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
        width: 150
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
        unSortIcon: true
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
        unSortIcon: true
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
        unSortIcon: true
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
        unSortIcon: true
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
        cellRendererParams: {
          onView: () => {},
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
    <div>
      <div className='page-container'>
        <h1 className='page-title'>Operadores</h1>
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
                label='Registrar operador'
                type='login'
                system='accounting'
                onClick={() => {
                  employee.openModal()
                  employee.changeActionRedux('create')
                }}
              />
            </div>
          </section>
          <section className='table-section'>
            <Table
              gridRef={gridRef}
              gridOptions={gridOptions}
              rowData={employee.employeesList}
            />
          </section>
        </div>
      </div>
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
            Registrar operador
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
              label='Guardar'
              type='confirm'
              onClick={
                employee.action === 'create'
                  ? employee.onClickSave
                  : employee.onEditSave
              }
            />
          </ModalFooter>
        </ModalContent>
      </Modal>

      <DeleteModal
        modalIsOpen={employee.deleteModalIsOpen}
        entityName='Operador'
        onClose={() => employee.closeDeleteModal()}
        onDelete={() => {
          employee.deleteActualEmployee()
          employee.closeDeleteModal()
        }}
      />
    </div>
  )
}

export default Employee
