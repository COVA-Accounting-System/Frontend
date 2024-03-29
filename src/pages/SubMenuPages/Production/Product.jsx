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
import PriceFormControl from '../../../components/Input/PriceFormControl'
import SelectFormControl from '../../../components/Input/SelectFormControl'
import FeaturesFormControl from '../../../components/Input/FeaturesFormControl'
import DeleteModal from '../../../components/DeleteModal/DeleteModal'
import Table from '../../../components/Table/Table'
import FeaturesTooltip from '../../../components/Tooltip/FeaturesTooltip'
// import ViewProduct from '../../../components/ViewModals/ViewProduct'

// HOOKS IMPORTS
import { useProduct } from '../../../hooks/useProduct'

// STYLES IMPORTS
import '../Template.styles.scss'

const Product = () => {
  const product = useProduct()
  const gridRef = useRef()

  const columnDefs = useMemo(
    () => [
      {
        headerName: 'Producto',
        field: 'productName',
        resizable: true,
        sortable: true,
        suppressMovable: true,
        unSortIcon: true
      },
      {
        headerName: 'Caracteristicas',
        field: 'productFeatures',
        width: 270,
        resizable: true,
        sortable: true,
        unSortIcon: true,
        suppressMovable: true,
        valueGetter: data => {
          return data.data.productFeatures.map((feature, index) => {
            return `• ${feature.description}`
          })
        },
        cellRenderer: FeaturesTooltip,
        cellRendererParams: {
          getListOfFeatures: data => {
            return data.productFeatures
          }
        }
        // maxWidth: 160,
      },
      {
        headerName: 'Tipo de unidad',
        field: 'productType',
        resizable: true,
        sortable: true,
        suppressMovable: true,
        unSortIcon: true,
        width: 160
      },
      {
        headerName: 'Precio por unidad',
        field: 'productPrice',
        resizable: true,
        sortable: true,
        unSortIcon: true,
        suppressMovable: true,
        valueGetter: data => {
          return `${data.data.productPrice} Bs.`
        }
        // width: 130,
      },
      {
        headerName: 'Precio por docena',
        field: 'productDozenPrice',
        resizable: true,
        sortable: true,
        unSortIcon: true,
      
        suppressMovable: true,
        valueGetter: data => {
          return `${data.data.productDozenPrice} Bs.`
        }
      },
      {
        headerName: ' ',
        resizable: false,
        pinned: 'right',
        maxWidth: 160,
        cellRenderer: DataTableActions,
        suppressMovable: true,
        colId: 'Actions',
        cellStyle: { overflow: 'visible' },
        cellRendererParams: {
          // onView: data => {
          //   product.setActualProductRedux(data)
          //   product.setViewModalIsOpen(true)
          // },
          onEdit: data => {
            product.setProductName(data.productName)
            product.setProductFeatures(data.productFeatures)
            product.setProductType(data.productType)
            product.setProductPrice(data.productPrice)
            product.setProductDozenPrice(data.productDozenPrice)
            product.changeActionRedux('edit')
            product.setActualProductRedux(data)
            product.openModal()
          },
          onDelete: data => {
            product.setDeleteModalIsOpen(true)
            product.setActualProductRedux(data)
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
        params.api.sizeColumnsToFit()
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
        Productos
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
                onClick={() => {
                  product.openModal()
                  product.changeActionRedux('create')
                }}
              >
                Registrar producto
              </Button>
          </Stack>
          <Stack height={'100%'}>
          <Table
              gridRef={gridRef}
              gridOptions={gridOptions}
              rowData={product.productsList}
            />
          </Stack>
      <Modal
        size='sm'
        onClose={() => product.closeModal()}
        isOpen={product.modalIsOpen}
      >
        <ModalOverlay />
        <ModalContent userSelect='none' maxW='730px'>
          <ModalHeader
            color='acsys.titleColor'
            fontWeight='700'
            fontSize='25px'
          >
            {product.action === 'create'
              ? 'Registrar producto'
              : 'Editar producto'}
          </ModalHeader>
          <ModalCloseButton color={'acsys.titleColor'} />

          <ModalBody pb={3}>
            <form className='two-column-grid'>
              <div>
                <TextFormControl
                  labelName='Nombre del producto'
                  width='330px'
                  paddingSpace={0}
                  value={product.productName}
                  onInput={data => product.setProductName(data)}
                  isSubmited={product.isSubmited}
                  isRequired
                  isRequiredMessage='Este campo es obligatorio'
                />
                <SelectFormControl
                  labelName='Tipo de unidad'
                  paddingSpace={4}
                  value={product.productType}
                  onSelect={data => product.setProductType(data)}
                  isSubmited={product.isSubmited}
                  optionList={product.productTypeOptions}
                  isRequired
                  isRequiredMessage='Este campo es obligatorio'
                />
                <PriceFormControl
                  labelName={
                    product.productType !== ''
                      ? `Precio por ${product.productType.toLowerCase()}`
                      : 'Precio por unidad'
                  }
                  value={product.productPrice}
                  onInput={data => product.setProductPrice(data)}
                  isSubmited={product.isSubmited}
                  isRequired
                  isRequiredMessage='Este campo es obligatorio'
                />
                <PriceFormControl
                  labelName='Precio por docena'
                  value={product.productDozenPrice}
                  onInput={data => product.setProductDozenPrice(data)}
                  isSubmited={product.isSubmited}
                  isRequired
                  isRequiredMessage='Este campo es obligatorio'
                />
              </div>
              <div>
                {/* <div className='twoFieldsInOneRow'>
                </div> */}
                <FeaturesFormControl
                  listOfFeatures={product.productFeatures}
                  onAddFeature={data => {
                    product.setProductFeatures(data)
                  }}
                  onRemoveFeature={data => {
                    product.setProductFeatures(data)
                  }}
                  onEditFeature={data => {
                    product.setProductFeatures(data)
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
              isLoading={product.isLoading}
              onClick={
                product.action === 'create'
                  ? product.onClickSave
                  : product.onEditSave
              }
            >
              Guardar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <DeleteModal
        isLoading={product.isLoading}
        modalIsOpen={product.deleteModalIsOpen}
        entityName='Producto'
        onClose={() => product.closeDeleteModal()}
        onDelete={() => {
          product.deleteActualProduct()
        }}
      />
      {/* <ViewProduct
        onClose={() => product.setViewModalIsOpen(false)}
        isOpen={product.viewModalIsOpen}
      /> */}
    </Stack>
  )
}

export default Product
