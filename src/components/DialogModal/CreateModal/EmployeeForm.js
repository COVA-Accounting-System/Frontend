import React from "react";
import "../DialogModal.scss";
import { Button } from "../../Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { createEmployee, updateEmployee } from "../../../reducers/employees";
import * as toast from "../../../services/toastService";
import { useState } from "react";

const EmployeeForm = ({ onRequestClose }) => {
  const entity = useSelector((state) => state.crud.entityName);
  const action = useSelector((state) => state.crud.action);
  const employee = useSelector((state) => state.employees.actualEmployee);
  const dispatch = useDispatch();

  const [inputs, setInputs] = useState(
    action === "create"
      ? {
          name: "",
          lastName: "",
          phone: "",
          ci: "",
          startDate: "",
          nationality: "",
          dateOfBirth: ""
        }
      : employee
  );

  const handleInputChange = (event) => {
    setInputs({
      ...inputs,
      [event.target.name]: event.target.value,
    });
  };

  const onClickSave = () => {
    const employeeStatus = dispatch(createEmployee(inputs));
    employeeStatus.then((response) => {
      if (response) {
        toast.invetorySuccess("Empleado creado con éxito");
      } else {
        toast.inventoryError("Error al crear empleado");
      }
    });
    onRequestClose();
  };

  const onEditSave = () => {
    const employeeStatus = dispatch(updateEmployee(inputs));
    employeeStatus.then((response) => {
      if (response) {
        toast.invetorySuccess("Empleado actualizado con éxito");
      } else {
        toast.inventoryError("Error al editar empleado");
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
          <div className="input-form-container-employee">
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
          <div className="input-form-container-employee">
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
          <div className="input-form-container-employee">
            <input
              name="ci"
              className="input-form"
              type="text"
              placeholder="Ci"
              spellCheck="false"
              value={inputs.ci}
              onChange={handleInputChange}
            />
          </div>
          <div className="input-form-container-employee">
            <input
              name="startDate"
              className="input-form"
              type="text"
              placeholder="Fecha de inicio"
              spellCheck="false"
              value={inputs.startDate}
              onChange={handleInputChange}
            />
          </div>
          <div className="input-form-container-employee">
            <input
              name="nationality"
              className="input-form"
              type="text"
              placeholder="Nacionalidad"
              spellCheck="false"
              value={inputs.nationality}
              onChange={handleInputChange}
            />
          </div>
          <div className="input-form-container-employee">
            <input
              name="dateOfBirth"
              className="input-form"
              type="text"
              placeholder="Fecha de nacimiento"
              spellCheck="false"
              value={inputs.dateOfBirth}
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

export default EmployeeForm;
