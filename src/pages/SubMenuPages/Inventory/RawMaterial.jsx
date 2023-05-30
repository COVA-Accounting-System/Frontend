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

import unitMeasures from '../../../assets/unitMeasures'

// COMPONENTS IMPORTS
import DataTableActions from '../../../components/DataTableActions/DataTableActions'
import FeaturesTooltip from '../../../components/Tooltip/FeaturesTooltip'
import TextFormControl from '../../../components/Input/TextFormControl'
import SelectEntityFormControl from '../../../components/Input/SelectEntityFormControl'
import FeaturesFormControl from '../../../components/Input/FeaturesFormControl'
import DeleteModal from '../../../components/DeleteModal/DeleteModal'
import Table from '../../../components/Table/Table'

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
        resizable: true,
        sortable: true,
        suppressMovable: true,
        unSortIcon: true
      },
      {
        headerName: 'Caracteristicas',
        resizable: true,
        sortable: true,
        unSortIcon: true,
        width: 270,
        suppressMovable: true,
        valueGetter: data => {
          return data.data.features.map((feature, index) => {
            return `• ${feature.description}`
          })
        },
        cellRenderer: FeaturesTooltip,
        cellRendererParams: {
          getListOfFeatures: data => {
            return data.features
          }
        },
    
        // maxWidth: 160,
      },
      {
        headerName: 'Medida',
        field: 'unitMeasure.pluralSpanishName',
        resizable: true,
        sortable: true,
        suppressMovable: true,
        unSortIcon: true,
      },
      {
        headerName: 'Nomeclatura',
        field: 'unitMeasure.uiName',
        resizable: true,
        sortable: true,
        suppressMovable: true,
        unSortIcon: true
      },
      {
        headerName: ' ',
        resizable: false,
        pinned: 'right',
        maxWidth: 160,
        cellRenderer: DataTableActions,
        colId: 'Actions',
        cellStyle: { overflow: 'visible' },
        suppressMovable: true,
        cellRendererParams: {
          // onView: data => {},
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
        params.api.sizeColumnsToFit();
      },
      onGridSizeChanged: params => {
        params.api.sizeColumnsToFit();
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
    <Stack h='100%' p={'8'} minW={'1000px'}>
      <Text fontSize={'27px'} fontWeight={'bold'} color={'acsys.titleColor'}>
        Materia Prima
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
            rawMaterial.openModal()
            rawMaterial.changeActionRedux('create')
          }}
        >
          Registrar materia prima
        </Button>
      </Stack>
      <Stack height={'100%'}>
        <Table
          gridRef={gridRef}
          gridOptions={gridOptions}
          rowData={rawMaterial.rawMaterialsList}
        />
      </Stack>
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
            {rawMaterial.action === 'create'
              ? 'Registrar materia prima'
              : 'Editar materia prima'}
          </ModalHeader>
          <ModalCloseButton color={'acsys.titleColor'} />

          <ModalBody pb={3}>
            <form className='two-column-grid'>
              <div>
                <TextFormControl
                  labelName='Nombre de la materia prima'
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
                  onEditFeature={data => {
                    console.log(data)
                    rawMaterial.setFeatures(data)
                  }}
                  marginTop={0}
                />
              </div>
            </form>
          </ModalBody>

          <ModalFooter>
            <Button
              backgroundColor={'acsys.primaryColor'}
              _hover={{ backgroundColor: '#098bb6' }}
              colorScheme='linkedin'
              isLoading={rawMaterial.isLoading}
              onClick={
                rawMaterial.action === 'create'
                  ? rawMaterial.onClickSave
                  : rawMaterial.onEditSave
              }
            >
              Guardar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <DeleteModal
        isLoading={rawMaterial.isLoading}
        modalIsOpen={rawMaterial.deleteModalIsOpen}
        entityName='Material'
        onClose={() => rawMaterial.closeDeleteModal()}
        onDelete={() => {
          rawMaterial.deleteActualRawMaterial()
        }}
      />
    </Stack>
  )
}

export default RawMaterial
