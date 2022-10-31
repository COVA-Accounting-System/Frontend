import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getAllClients } from "../reducers/clients";
import { getAllProducts } from "../reducers/products";
import * as toast from "../services/toastService";

export const useOrder = (onRequestClose) => {
  const entity = useSelector((state) => state.crud.entityName);
  const action = useSelector((state) => state.crud.action);
  //   const order = useSelector((state) => state.orders.actualOrder);
  const clients = useSelector((state) => state.clients.data);
  const products = useSelector((state) => state.products.data);

  const dispatch = useDispatch();
  const [order, setOrder] = useState({});

  useEffect(() => {
    dispatch(getAllClients());
    dispatch(getAllProducts());
    // console.log(action)
  }, [dispatch]);


  const setData = (data) => {
    setOrder({
      client: data.client,
      date: data.date,
      orderNumber: data.orderNumber,
      dataTable: data.dataTable,
    });
  };

  const onClickSave = () => {
    // const orderStatus = dispatch(updateOrder(inputs));
    console.log(order)
    console.log("aaaaaaa")
    // const orderStatus = "";
    // orderStatus.then((response) => {
    //   if (response) {
    //     toast.invetorySuccess("Pedido creado con éxito");
    //   } else {
    //     toast.inventoryError("Error al crear pedido");
    //   }
    // });
    // onRequestClose();
  };

  const onEditSave = () => {
    // const orderStatus = dispatch(updateOrder(inputs));
    const orderStatus = "";
    orderStatus.then((response) => {
      if (response) {
        toast.invetorySuccess("Pedido actualizado con éxito");
      } else {
        toast.inventoryError("Error al editar pedido");
      }
    });
    onRequestClose();
  };

  return {
    entity,
    action,
    clients,
    products,
    order,
    onClickSave,
    onEditSave,
    setData,
  };
};
