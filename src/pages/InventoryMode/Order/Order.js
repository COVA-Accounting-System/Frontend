import React from "react";
import { useState } from "react";
import { Button } from "../../../components/Button/Button";

const Order = () => {
    const [orderOpenStyle, setOrderOpenStyle] = useState({})

  return (
    <div className="page-container">
      <h1 className="page-title">Pedidos</h1>
      <section className="order-task-bar">
        <div className="order-task-bar-status">
          <div className="button-change button-change-queque">En fila</div>
          <div className="button-change button-change-production">
            En producción
          </div>
          <div className="button-change button-change-finished">Terminado</div>
        </div>
        <div className="order-task-bar-create">
          <Button label={"Crear pedido"} type={"login"} system={"accounting"} />
          {/* <p>aca va el boton</p> */}
        </div>
      </section>
      <section className="order-list-container">
        <div className="order-element" ></div>
        <div className="order-element" ></div>
        <div className="order-element"></div>
        <div className="order-element"></div>
        <div className="order-element"></div>
        <div className="order-element"></div>
        <div className="order-element"></div>
        <div className="order-element"></div>
        <div className="order-element"></div>
        <div className="order-element"></div>
        <div className="order-element"></div>
        <div className="order-element"></div>
      </section>
    </div>
  );
};

export default Order;
