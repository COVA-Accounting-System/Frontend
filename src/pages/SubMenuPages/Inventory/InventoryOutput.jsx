import React, { useMemo, useCallback, useRef } from 'react'

// CHAKRA UI IMPORTS
import { Input, Button, Stack, Text } from '@chakra-ui/react'

// COMPONENTS IMPORTS
import DataTableActions from '../../../components/DataTableActions/DataTableActions'
import DeleteModal from '../../../components/DeleteModal/DeleteModal'
import Table from '../../../components/Table/Table'
import RegisterInventoryOutput from '../../../components/InventoryOutputModal/RegisterInventoryOutput'
import MaterialsTooltip from '../../../components/Tooltip/MaterialsTooltip'

// HOOKS IMPORTS
import { useInventoryOutput } from '../../../hooks/useInventoryOutput'

// STYLES IMPORTS
import '../Template.styles.scss'

const InventoryOutput = () => {
  const gridRef = useRef()
  const inventoryOutput = useInventoryOutput()

  const columnDefs = useMemo(
    () => [
      {
        headerName: 'Nº de salida',
        field: 'numberOfInput',
        resizable: true,
        sortable: true,
        suppressMovable: true,
        unSortIcon: true,
        width: 150,
        sort: 'desc', defaultSort: true
      },
      {
        headerName: 'Pedido',
        valueGetter: data => {
          return `Pedido #${data.data.order.orderNumber} - ${data.data.order.orderProduct.uiName}`
        },
        resizable: true,
        sortable: true,
        unSortIcon: true,
        suppressMovable: true,
        width: 270
      },
      {
        headerName: 'Fecha de salida',
        field: 'date',
        valueGetter: data => {
          return new Date(data.data.date).toLocaleDateString()
        },
        resizable: true,
        sortable: true,
        suppressMovable: true,
        unSortIcon: true
      },
      {
        headerName: 'Materiales',
        field: '',
        width: 300,
        resizable: true,
        sortable: true,
        unSortIcon: true,
        autoHeight: true,
        cellRenderer: MaterialsTooltip,
        suppressMovable: true,
        cellRendererParams: {
          getListOfMaterials: data => {
            return data.listOfMaterials
          }
        }
      },
      {
        headerName: 'Precio estimado',
        field: 'estimatedPrice',
        resizable: true,
        sortable: true,
        unSortIcon: true,
        suppressMovable: true,
        valueGetter: data => {
          return `${data.data.estimatedPrice} Bs.`
        },
      },
      {
        headerName: ' ',
        resizable: false,
        pinned: 'right',
        maxWidth: 160,
        cellRenderer: DataTableActions,
        cellStyle: { overflow: 'visible' },
        suppressMovable: true,
        colId: 'Actions',
        cellRendererParams: {
          // onView: data => {
          //   product.setActualProductRedux(data)
          //   product.setViewModalIsOpen(true)
          // },
          onEdit: data => {
            inventoryOutput.setNumberOfInput(data.numberOfInput)
            inventoryOutput.setDate(data.date)
            inventoryOutput.setEstimatedPrice(data.estimatedPrice)

            inventoryOutput.setOrder(data.order)
            inventoryOutput.setOrderId(data.order._id)
            inventoryOutput.setListOfMaterials(data.listOfMaterials)

            inventoryOutput.changeActionRedux('edit')
            inventoryOutput.setActualInventoryOutputRedux(data)
            inventoryOutput.openModal()
          },
          onDelete: data => {
            inventoryOutput.setDeleteModalIsOpen(true)
            inventoryOutput.setActualInventoryOutputRedux(data)
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
    <Stack h='100%' p={'8'} minW={'850px'}>
      <Text fontSize={'27px'} fontWeight={'bold'} color={'acsys.titleColor'}>
        Salidas de inventario
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
            inventoryOutput.setNumberOfInputFromConfig()
            inventoryOutput.openModal()
            inventoryOutput.changeActionRedux('create')
          }}
        >
          Registrar salida
        </Button>
      </Stack>
      <Stack height={'100%'}>
        <Table
          gridRef={gridRef}
          gridOptions={gridOptions}
          rowData={inventoryOutput.inventoryOutputsList}
        />
      </Stack>
      <RegisterInventoryOutput inventoryOutputHook={inventoryOutput} />
      <DeleteModal
        isLoading={inventoryOutput.isLoading}
        modalIsOpen={inventoryOutput.deleteModalIsOpen}
        entityName='Entrada'
        onClose={() => inventoryOutput.closeDeleteModal()}
        onDelete={() => {
          inventoryOutput.deleteActualInventoryOutput()
        }}
      />
    </Stack>
  )
}

export default InventoryOutput
