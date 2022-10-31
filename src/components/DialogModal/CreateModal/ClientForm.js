import React from "react";
import "../DialogModal.scss";
import { Button } from "../../Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { createClient, updateClient } from "../../../reducers/clients";
import * as toast from "../../../services/toastService";
import { useState } from "react";

const ClientForm = ({ onRequestClose }) => {
  const entity = useSelector((state) => state.crud.entityName);
  const action = useSelector((state) => state.crud.action);
  const client = useSelector((state) => state.clients.actualClient);
  const dispatch = useDispatch();

  const [inputs, setInputs] = useState(
    action === "create"
      ? {
          name: "",
          lastName: "",
          phone: "",
          address: ""
        }
      : client
  );

  const handleInputChange = (event) => {
    setInputs({
      ...inputs,
      [event.target.name]: event.target.value,
    });
  };

  const onClickSave = () => {
    const clientStatus = dispatch(createClient(inputs));
    clientStatus.then((response) => {
      if (response) {
        toast.invetorySuccess("Cliente creado con éxito");
      } else {
        toast.inventoryError("Error al crear cliente");
      }
    });
    onRequestClose();
  };

  const onEditSave = () => {
    const clientStatus = dispatch(updateClient(inputs));
    clientStatus.then((response) => {
      if (response) {
        toast.invetorySuccess("Cliente actualizado con éxito");
      } else {
        toast.inventoryError("Error al editar cliente");
      }
    });
    onRequestClose();
  };

  return (
    <div>
      <div className="form-container">
        <h1 className="form-title">
          {action === "create" ? `Crear ${entity}` : `Editar ${entity}`}
        </h1>
        <div className="input-form-container">
          <input
            name="name"
            className="input-form"
            type="text"
            placeholder="Nombre"
            spellCheck="false"
            value={inputs.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="input-form-container">
          <input
            name="lastName"
            className="input-form"
            type="text"
            placeholder="Apellidos"
            spellCheck="false"
            value={inputs.lastName}
            onChange={handleInputChange}
          />
        </div>
        <div className="input-form-container">
          <input
            name="phone"
            className="input-form"
            type="text"
            placeholder="Teléfono"
            spellCheck="false"
            value={inputs.phone}
            onChange={handleInputChange}
          />
        </div>
        <div className="input-form-container">
          <input
            name="address"
            className="input-form"
            type="text"
            placeholder="Direccion"
            spellCheck="false"
            value={inputs.address}
            onChange={handleInputChange}
          />
        </div>
        <div className="input-form-container">
        </div>
        {/* <div className="in-debt-warning">
          <span className="material-symbols-outlined warning-icon">error</span>
          <span>
            Esta es la cantidad que adeuda el cliente al momento de registrarlo
            en el sistema
          </span>
        </div> */}
        <div className="button-container">
          <Button
            label={"Guardar"}
            type={"confirm"}
            onClick={action === "create" ? onClickSave : onEditSave}
          ></Button>
        </div>
        <div className="form-footer"></div>
      </div>
    </div>
  );
};

export default ClientForm;
