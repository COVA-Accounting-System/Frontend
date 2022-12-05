import React, { useState, useEffect } from 'react'
import { Button } from '../../components/Button/Button'
// import ModalContainer from "../../../components/DialogModal/ModalContainer";
// import {  } from 'react-redux'
import { changeAction, changeEntity } from '../../reducers/crud'
import { useDispatch, useSelector } from 'react-redux'
import { getAllOrders } from '../../reducers/orders'
// import dayjs from "dayjs"

const Order = () => {
  const [quequeIsActive, setQuequeIsActive] = useState(false)
  const [productionIsActive, setProductionIsActive] = useState(false)
  const [finishedIsActive, setFinishedIsActive] = useState(false)
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const orders = useSelector((state) => state.orders.data)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllOrders())
    console.log(orders)
    dispatch(changeEntity({ entity: 'order', entityName: 'Pedido' }))
  }, [dispatch])

  const handleOpenOrder = (e) => {
    if (e.target.style.height === '150px') {
      e.target.style.height = '70px'
    } else {
      e.target.style.height = '150px'
    }
  }

  const openOrderStyle = {
    height: '60px',
    marginTop: '-20px'
  }

  return (
    <div className='page-container'>
      <h1 className='page-title'>Pedidos</h1>
      <section className='order-task-bar'>
        <div className='order-task-bar-status'>
          <div
            className='button-change button-change-queque'
            style={quequeIsActive ? openOrderStyle : {}}
            onClick={() => {
              setQuequeIsActive(!quequeIsActive)
              setProductionIsActive(false)
              setFinishedIsActive(false)
            }}
          >
            En fila
          </div>
          <div
            className='button-change button-change-production'
            style={productionIsActive ? openOrderStyle : {}}
            onClick={() => {
              setQuequeIsActive(false)
              setProductionIsActive(!productionIsActive)
              setFinishedIsActive(false)
            }}
          >
            En producción
          </div>
          <div
            className='button-change button-change-finished'
            style={finishedIsActive ? openOrderStyle : {}}
            onClick={() => {
              setQuequeIsActive(false)
              setProductionIsActive(false)
              setFinishedIsActive(!finishedIsActive)
            }}
          >
            Terminado
          </div>
        </div>
        <div className='order-task-bar-create'>
          <Button
            label='Crear pedido'
            type='login'
            system='accounting'
            onClick={() => {
              dispatch(changeAction('create'))
              setModalIsOpen(true)
            }}
          />
        </div>
      </section>
      <section className='order-list-container'>
        {orders.map((order) => {
          return (
            <div className='order-element'>
              <div className='order-element-container'>
                <h3 className='order-element-title'>EN FILA</h3>
                <p
                  className='order-element-text'
                  // style={{ marginTop: "12px", marginLeft: "20px" }}
                >
                  Pedido {order.orderNumber}
                </p>
              </div>
              <div className='order-element-container'>
                <h3 className='order-element-title'>CLIENTE</h3>
                <p className='order-element-text'>{order.client}</p>
              </div>
              <div className='order-element-container'>
                <h3 className='order-element-title'>FECHA</h3>
                {/* <p className="order-element-text">{dayjs(order.creationDate).format('DD/MM/YY')  }</p> */}
              </div>
              <div className='order-element-container'>
                <h3 className='order-element-title'>PRODUCTO:</h3>
                <p className='order-element-text'>{}</p>
              </div>

              <div className='order-element-container'>
                <h3 className='order-element-title'>CANTIDAD</h3>
                <p className='order-element-text'>1 Docena</p>
              </div>
              <div className='order-element-container'>
                <h3 className='order-element-title'>PRECIO</h3>
                <p className='order-element-text'>200 Bs</p>
              </div>
            </div>
          )
        })}

        {/* <div className="order-element" onClick={handleOpenOrder}></div>
        <div className="order-element" onClick={handleOpenOrder}></div>
        <div className="order-element" onClick={handleOpenOrder}></div>
        <div className="order-element" onClick={handleOpenOrder}></div> */}
      </section>

    </div>
  )
}

export default Order
