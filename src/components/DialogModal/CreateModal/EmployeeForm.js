import React from "react";
import "../DialogModal.scss";
import { Button } from "../../Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { createEmployee, updateEmployee } from "../../../reducers/employees";
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
    dispatch(createEmployee(inputs));
    onRequestClose();
  };

  const onEditSave = () => {
    dispatch(updateEmployee(inputs));
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
              value={inputs.ci}
              onChange={handleInputChange}
            />
          </div>
          <div className="input-form-container-employee">
            <input
              name="startDate"
              className="input-form"
              type="text"
              placeholder="Fecha de nacimiento"
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
