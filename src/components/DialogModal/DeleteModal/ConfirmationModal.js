import React from "react";
import { Button } from "../../Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { deleteClient } from "../../../reducers/clients";
import { deleteEmployee } from "../../../reducers/employees";
import { deleteProduct } from "../../../reducers/products";
import { deleteProvider } from "../../../reducers/providers";
import * as toast from "../../../services/toastService";
import "../DialogModal.scss";

const ConfirmationModal = ({ onClickCancel }) => {
  const entityName = useSelector((state) => state.crud.entityName);
  const entity = useSelector((state) => state.crud.entity);
  const dispatch = useDispatch();

  const client = useSelector((state) => state.clients.actualClient);
  const employee = useSelector((state) => state.employees.actualEmployee);
  const product = useSelector((state) => state.products.actualProduct);
  const provider = useSelector((state) => state.providers.actualProvider);

  const onClickDelete = () => {
    switch (entity) {
      case "client":
        dispatch(deleteClient(client)).then((status) => {
          if (status) {
            toast.invetorySuccess("Cliente eliminado con éxito");
          } else { toast.inventoryError("Error al eliminar cliente"); }
        });
        break;
      case "employee":  
        dispatch(deleteEmployee(employee)).then((status) => {
          if (status) {
            toast.invetorySuccess("Empleado eliminado con éxito");
          } else { toast.inventoryError("Error al eliminar empleado"); }
        });
        break;
      case "product":
        dispatch(deleteProduct(product)).then((status) => {
          if (status) {
            toast.invetorySuccess("Producto eliminado con éxito");
          } else { toast.inventoryError("Error al eliminar producto"); }
        });
        break;
      case "provider":
        dispatch(deleteProvider(provider)).then((status) => {
          if (status) {
            toast.invetorySuccess("Proveedor eliminado con éxito");
          } else { toast.inventoryError("Error al eliminar proveedor"); }
        });
        break;
      default:
        break;
    }
    onClickCancel();
  };

  return (
    <div className="confirmation-container">
      <div>
        <h1 className="confirmation-title">Eliminar {entityName}</h1>
        <p className="confirmation-text">
          ¿Está seguro que desea eliminar este {entityName}?
        </p>
      </div>
      <div className="button-container">
        <Button
          className="button-cancel"
          label={"Eliminar"}
          type={"confirm-delete"}
          onClick={onClickDelete}
        />
        <Button label={"Cancelar"} type={"cancel"} onClick={onClickCancel} />
      </div>
    </div>
  );
};

export default ConfirmationModal;
