import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getAllClients } from '../reducers/clients'
import { createOrder } from '../reducers/orders'
import { getAllProducts } from '../reducers/products'
import * as toast from '../services/toastService'

export const useOrder = (onRequestClose, orderNumber, client, date, dataTable) => {
  const entity = useSelector((state) => state.crud.entityName)
  const action = useSelector((state) => state.crud.action)
  //   const order = useSelector((state) => state.orders.actualOrder);
  const clients = useSelector((state) => state.clients.data)
  const products = useSelector((state) => state.products.data)

  const dispatch = useDispatch()

  const [order, setOrder] = useState({})

  useEffect(() => {
    dispatch(getAllClients())
    dispatch(getAllProducts())
    // console.log(action)
  }, [dispatch])

  useEffect(() => {
    const newDataTable = dataTable.map((item) => {
      return {
        product: item.element._id,
        amount: item.amount.value,
        price: item.price.value
      }
    })
    // setOrder({...order, orderNumber})
    setOrder({ ...order, orderNumber, client, creationDate: date, dataTable: newDataTable })
  }, [orderNumber, client, date, dataTable])

  const onClickSave = () => {
    const orderStatus = dispatch(createOrder(order))
    orderStatus.then((response) => {
      if (response) {
        toast.invetorySuccess('Pedido creado con éxito')
      } else {
        toast.inventoryError('Error al crear pedido')
      }
    })
    onRequestClose()
    // console.log(order)
  }

  const onEditSave = () => {
    // const orderStatus = dispatch(updateOrder(inputs));
    // orderStatus.then((response) => {
    //   if (response) {
    //     toast.invetorySuccess("Pedido actualizado con éxito");
    //   } else {
    //     toast.inventoryError("Error al editar pedido");
    //   }
    // });
    // onRequestClose();
  }

  return {
    order,
    setOrder,
    entity,
    action,
    clients,
    products,
    order,
    onClickSave,
    onEditSave

  }
}
