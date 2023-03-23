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
import PriceFormControl from '../../../components/Input/PriceFormControl'
import SelectFormControl from '../../../components/Input/SelectFormControl'
import FeaturesFormControl from '../../../components/Input/FeaturesFormControl'
import DeleteModal from '../../../components/DeleteModal/DeleteModal'
import Table from '../../../components/Table/Table'
import ViewProduct from '../../../components/ViewModals/ViewProduct'
import { Button } from '../../../components/Button/Button'

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
        unSortIcon: true,
      },
      {
        headerName: 'Caracteristicas',
        resizable: true,
        sortable: true,
        unSortIcon: true,
        // maxWidth: 160,
      },
      {
        headerName: 'Tipo de unidad',
        field: 'productType',
        resizable: true,
        sortable: true,
        unSortIcon: true,
        width: 160,
      },
      {
        headerName: 'Precio por unidad',
        field: 'productPrice',
        resizable: true,
        sortable: true,
        unSortIcon: true,
        valueGetter: data => {
          return `${data.data.productPrice} Bs.`
        },
        // width: 130,
      },
      {
        headerName: 'Precio por docena',
        field: 'productDozenPrice',
        resizable: true,
        sortable: true,
        unSortIcon: true,
        flex: 1,
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
        colId: 'Actions',
        cellRendererParams: {
          onView: (data) => {
            product.setActualProductRedux(data)
            product.setViewModalIsOpen(true)
          },
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
        // params.api.sizeColumnsToFit();
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
    <div>
      <div className='page-container'>
        <h1 className='page-title'>Productos</h1>
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
                label='Registrar producto'
                type='login'
                system='accounting'
                onClick={() => {
                  product.openModal()
                  product.changeActionRedux('create')
                }}
              />
            </div>
          </section>
          <section className='table-section'>
            <Table
              gridRef={gridRef}
              gridOptions={gridOptions}
              rowData={product.productsList}
            />
          </section>
        </div>
      </div>
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
            Registrar producto
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
                product.action === 'create'
                  ? product.onClickSave
                  : product.onEditSave
              }
            />
          </ModalFooter>
        </ModalContent>
      </Modal>

      <DeleteModal
        modalIsOpen={product.deleteModalIsOpen}
        entityName='Producto'
        onClose={() => product.closeDeleteModal()}
        onDelete={() => {
          product.deleteActualProduct()
          product.closeDeleteModal()
        }}
      />
      <ViewProduct
        onClose={() => product.setViewModalIsOpen(false)}
        isOpen={product.viewModalIsOpen}
      />
    </div>
  )
}

export default Product
