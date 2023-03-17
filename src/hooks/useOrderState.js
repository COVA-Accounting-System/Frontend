import { useEffect, useState } from 'react'

export const useOrderState = (gridApi) => {
  // console.log(props)
  const [onHoldingCheck, setOnHoldingCheck] = useState(true)
  const [onProductionCheck, setOnProductionCheck] = useState(true)
  const [finishedCheck, setFinishedCheck] = useState(true)
  const [deliveredCheck, setDeliveredCheck] = useState(true)

  // const [data, setData] = useState([])
  const [filteredOrderList, setFilteredOrderList] = useState([])

  const filterChecked = state => {
    if (
      (onHoldingCheck && state.orderStateNumber === 0) ||
      (onProductionCheck && state.orderStateNumber === 1) ||
      (finishedCheck && state.orderStateNumber === 2) ||
      (deliveredCheck && state.orderStateNumber === 3)
    ) {
      return true
    }
    return false
  }

  const filterList = (data) => {
    // setFilteredOrderList(data)
    setFilteredOrderList(data)
    return data.filter(param => param.isVisible === true && filterChecked(param))
  }

  // const ordersList = useSelector(state => {
  //   return state.orders.data.filter(param => param.isVisible === true && filterChecked(param))
  // })

  useEffect(() => {
    if(gridApi) {
      gridApi.setRowData(filterList(gridApi.rowData))
    }
  }, [onHoldingCheck, onProductionCheck, finishedCheck, deliveredCheck])

  return {
    // ordersList,
    filterList,
    filteredOrderList,

    onHoldingCheck,
    setOnHoldingCheck,
    onProductionCheck,
    setOnProductionCheck,
    finishedCheck,
    setFinishedCheck,
    deliveredCheck,
    setDeliveredCheck
  }
}
