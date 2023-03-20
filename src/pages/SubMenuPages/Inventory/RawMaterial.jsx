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

import unitMeasures from '../../../assets/unitMeasures'

// COMPONENTS IMPORTS
import DataTableActions from '../../../components/DataTableActions/DataTableActions'
import TextFormControl from '../../../components/Input/TextFormControl'
import SelectEntityFormControl from '../../../components/Input/SelectEntityFormControl'
import FeaturesFormControl from '../../../components/Input/FeaturesFormControl'
import DeleteModal from '../../../components/DeleteModal/DeleteModal'
import Table from '../../../components/Table/Table'
import { Button } from '../../../components/Button/Button'

// HOOKS IMPORTS
import { useRawMaterial } from '../../../hooks/useRawMaterial'

// STYLES IMPORTS
import '../Template.styles.scss'

const RawMaterial = () => {
  //   const product = useProduct()
  const gridRef = useRef()
  const rawMaterial = useRawMaterial()

  const columnDefs = useMemo(
    () => [
      {
        headerName: 'Material',
        field: 'name',
        resizable: false,
        sortable: true,
        // minWidth: 110,
        width: 220
        // maxWidth: 300,
      },
      {
        headerName: 'Caracteristicas',
        // field: 'productFeatures',
        resizable: false,
        sortable: true,
        // minWidth: 100,
        width: 130
        // maxWidth: 160,
      },
      {
        headerName: 'Medida',
        field: 'unitMeasure.spanishName',
        resizable: false,
        sortable: true,
        // minWidth: 120,
        width: 147
        // maxWidth: 177,
      },
      {
        headerName: 'Medida Abreviada',
        field: 'unitMeasure.abbreviation',
        resizable: false,
        sortable: true,
        // minWidth: 120,
        width: 150
        // maxWidth: 180,
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
            // product.setActualProductRedux(data)
            // product.setViewModalIsOpen(true)
          },
          onEdit: data => {
            rawMaterial.setName(data.name)
            rawMaterial.setUnitMeasure(data.unitMeasure)
            rawMaterial.setFeatures(data.features)

            rawMaterial.changeActionRedux('edit')
            rawMaterial.setActualRawMaterialRedux(data)
            rawMaterial.openModal()
          },
          onDelete: data => {
            rawMaterial.setDeleteModalIsOpen(true)
            rawMaterial.setActualRawMaterialRedux(data)
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
        // params.api.sizeColumnsToFit();
      },
      onGridSizeChanged: params => {
        // params.api.sizeColumnsToFit();
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
        <h1 className='page-title'>Materiales</h1>
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
                label='Registrar material'
                type='login'
                system='accounting'
                onClick={() => {
                  rawMaterial.openModal()
                  rawMaterial.changeActionRedux('create')
                }}
              />
            </div>
          </section>
          <section className='table-section'>
            <Table
              gridRef={gridRef}
              gridOptions={gridOptions}
              rowData={rawMaterial.rawMaterialsList}
            />
          </section>
        </div>
      </div>
      <Modal
        size='sm'
        onClose={() => rawMaterial.closeModal()}
        isOpen={rawMaterial.modalIsOpen}
      >
        <ModalOverlay />
        <ModalContent userSelect='none' maxW='730px'>
          <ModalHeader
            color='acsys.titleColor'
            fontWeight='700'
            fontSize='25px'
          >
            Registrar producto
          </ModalHeader>
          <ModalCloseButton color={'acsys.titleColor'} />

          <ModalBody pb={3}>
            <form className='two-column-grid'>
              <div>
                <TextFormControl
                  labelName='Nombre del material'
                  width='330px'
                  paddingSpace={0}
                  value={rawMaterial.name}
                  onInput={data => rawMaterial.setName(data)}
                  isSubmited={rawMaterial.isSubmited}
                  isRequired
                  isRequiredMessage='Este campo es obligatorio'
                />
                <SelectEntityFormControl
                  labelName='Unidad de medida'
                  paddingSpace={4}
                  value={rawMaterial.unitMeasure}
                  onSelect={data => {
                    rawMaterial.setUnitMeasure(data)
                  }}
                  isSubmited={rawMaterial.isSubmited}
                  entityList={unitMeasures}
                  isRequired={true}
                  isRequiredMessage='Este campo es obligatorio'
                />
              </div>
              <div>
                <FeaturesFormControl
                  listOfFeatures={rawMaterial.features}
                  onAddFeature={data => {
                    rawMaterial.setFeatures(data)
                  }}
                  onRemoveFeature={data => {
                    rawMaterial.setFeatures(data)
                  }}
                  marginTop={0}
                />
              </div>
            </form>
          </ModalBody>

          <ModalFooter>
            <Button
              label='Guardar'
              type='confirm'
              onClick={
                rawMaterial.action === 'create'
                  ? rawMaterial.onClickSave
                  : rawMaterial.onEditSave
              }
            />
          </ModalFooter>
        </ModalContent>
      </Modal>

      <DeleteModal
        modalIsOpen={rawMaterial.deleteModalIsOpen}
        entityName='Material'
        onClose={() => rawMaterial.closeDeleteModal()}
        onDelete={() => {
          rawMaterial.deleteActualRawMaterial()
          rawMaterial.closeDeleteModal()
        }}
      />
      {/* <ViewProduct
        onClose={() => product.setViewModalIsOpen(false)}
        isOpen={product.viewModalIsOpen}
      /> */}
    </div>
  )
}

export default RawMaterial
