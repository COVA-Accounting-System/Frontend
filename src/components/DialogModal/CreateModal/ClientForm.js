import React from "react";
import "../DialogModal.scss";
import { Button } from "../../Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { createClient, updateClient } from "../../../reducers/clients";
import { useState } from "react";

const ClientForm = ({ onRequestClose }) => {
  const entity = useSelector((state) => state.crud.entityName);
  const action = useSelector((state) => state.crud.action);
  const editClient = useSelector((state) => state.clients.actualClient);

  const [inputs, setInputs] = useState(
    action === "create"
      ? {
          name: "",
          lastName: "",
          phone: "",
          inDebt: "",
        }
      : editClient
  );

  const dispatch = useDispatch();

  const handleInputChange = (event) => {
    setInputs({
      ...inputs,
      [event.target.name]: event.target.value,
    });
  };

  const onClickSave = () => {
    dispatch(createClient(inputs));
    onRequestClose();
  };

  const onEditSave = () => {
    console.log(inputs)
    dispatch(updateClient(inputs));
    onRequestClose();
  };

  return (
    <div>
        <div className="form-container">
          <h1 className="form-title">Crear {entity}</h1>
          <div className="input-form-container">
            <input
              name="name"
              className="input-form"
              type="text"
              placeholder="Nombre"
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
              value={inputs.phone}
              onChange={handleInputChange}
            />
          </div>
          <div className="input-form-container">
            <input
              name="inDebt"
              className="input-form"
              type="text"
              placeholder="Deuda"
              value={inputs.inDebt}
              onChange={handleInputChange}
            />
          </div>
          <div className="in-debt-warning">
            <span className="material-symbols-outlined warning-icon">
              error
            </span>
            <span>
              Esta es la cantidad que adeuda el cliente al momento de
              registrarlo en el sistema
            </span>
          </div>
          <div className="button-container">
            <Button
              label={"Guardar"}
              type={"confirm"}
              onClick={action === "create" ? onClickSave : onEditSave}
              // onClick={onClickSave}
            ></Button>
          </div>
          <div className="form-footer"></div>
        </div>
    </div>
  );
};

export default ClientForm;
