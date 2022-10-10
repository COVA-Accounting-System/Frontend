import React from "react";
import "../DialogModal.scss";
import { Button } from "../../Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { createProvider, updateProvider } from "../../../reducers/providers";
import * as toast from "../../../services/toastService";
import { useState } from "react";

const ProviderForm = ({ onRequestClose }) => {
  const entity = useSelector((state) => state.crud.entityName);
  const action = useSelector((state) => state.crud.action);
  const provider = useSelector((state) => state.providers.actualProvider);
  const dispatch = useDispatch();

  const [inputs, setInputs] = useState(
    action === "create"
      ? {
          storeName: "",
          nit: "",
          phone: "",
          city: "",
          country: "",
          address: "",
        }
      : provider
  );

  const handleInputChange = (event) => {
    setInputs({
      ...inputs,
      [event.target.name]: event.target.value,
    });
  };

  const onClickSave = () => {
    const providerStatus = dispatch(createProvider(inputs));
    providerStatus.then((response) => {
      if (response) {
        toast.invetorySuccess("Proveedor creado con éxito");
      } else {
        toast.inventoryError("Error al crear proveedor");
      }
    });
    onRequestClose();
  };

  const onEditSave = () => {
    const providerStatus = dispatch(updateProvider(inputs));
    providerStatus.then((response) => {
      if (response) {
        toast.invetorySuccess("Proveedor actualizado con éxito");
      } else {
        toast.inventoryError("Error al editar proveedor");
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
            name="storeName"
            className="input-form"
            type="text"
            placeholder="Nombre de la tienda"
            spellCheck="false"
            value={inputs.storeName}
            onChange={handleInputChange}
          />
        </div>
        <div className="input-form-container">
          <input
            name="nit"
            className="input-form"
            type="text"
            placeholder="NIT"
            spellCheck="false"
            value={inputs.nit}
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
            name="city"
            className="input-form"
            type="text"
            placeholder="Ciudad"
            spellCheck="false"
            value={inputs.city}
            onChange={handleInputChange}
          />
        </div>
        <div className="input-form-container">
          <input
            name="country"
            className="input-form"
            type="text"
            placeholder="País"
            spellCheck="false"
            value={inputs.country}
            onChange={handleInputChange}
          />
        </div>
        <div className="input-form-container">
          <input
            name="address"
            className="input-form"
            type="text"
            placeholder="Dirección"
            spellCheck="false"
            value={inputs.address}
            onChange={handleInputChange}
          />
        </div>
        <div className="button-container-employee">
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

export default ProviderForm