import React from "react";
import "../DialogModal.scss";
import { Button } from "../../Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { createProduct, updateProduct } from "../../../reducers/products";
import * as toast from "../../../services/toastService";
import { useState } from "react";

const ProductForm = ({ onRequestClose }) => {
  const entity = useSelector((state) => state.crud.entityName);
  const action = useSelector((state) => state.crud.action);
  const product = useSelector((state) => state.products.actualProduct);
  const dispatch = useDispatch();

  const [inputs, setInputs] = useState(
    action === "create"
      ? {
          name: "",
          description: "",
          unitPrice: "",
          dozenPrice: "",
        }
      : product
  );

  const handleInputChange = (event) => {
    setInputs({
      ...inputs,
      [event.target.name]: event.target.value,
    });
  };

  const onClickSave = () => {
    const productStatus = dispatch(createProduct(inputs));
    productStatus.then((response) => {
      if (response) {
        toast.invetorySuccess("Producto creado con éxito");
      } else {
        toast.inventoryError("Error al crear producto");
      }
    });
    onRequestClose();
  };

  const onEditSave = () => {
    const productStatus = dispatch(updateProduct(inputs));
    productStatus.then((response) => {
      if (response) {
        toast.invetorySuccess("Producto actualizado con éxito");
      } else {
        toast.inventoryError("Error al editar producto");
      }
    });
    onRequestClose();
  };

  return (
    <div>
        <div className="form-container">
          <h1 className="form-title">{action ==="create" ? `Crear ${entity}` : `Editar ${entity}`}</h1>
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
              name="description"
              className="input-form"
              type="text"
              placeholder="Descripcion"
              spellCheck="false"
              value={inputs.description}
              onChange={handleInputChange}
            />
          </div>
          <div className="input-form-container">
            <input
              name="unitPrice"
              className="input-form"
              type="text"
              placeholder="Precio de unidad"
              spellCheck="false"
              value={inputs.unitPrice}
              onChange={handleInputChange}
            />
          </div>
          <div className="input-form-container">
            <input
              name="dozenPrice"
              className="input-form"
              type="text"
              placeholder="Precio por docena"
              spellCheck="false"
              value={inputs.dozenPrice}
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

export default ProductForm;
