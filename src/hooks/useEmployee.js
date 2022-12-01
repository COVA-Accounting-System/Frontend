import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllEmployees,
  setActualEmployee,
  createEmployee,
  deleteEmployee,
  updateEmployee,
} from "../reducers/employees";
import * as toast from "../services/toastService";
import { changeAction, changeEntity } from "../reducers/crud";

export const useEmployee = () => {
  const dispatch = useDispatch();

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);

  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [ci, setCi] = useState("");
  const [nationality, setNationality] = useState("");
  const [birthday, setBirthday] = useState("");
  const [phoneCountryCode, setPhoneCountryCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [startDate, setStartDate] = useState("");

  // const [address, setAddress] = useState("");
  const [isSubmited, setIsSubmited] = useState(false);

  const action = useSelector((state) => state.crud.action);

  const actualEmployee = useSelector((state) => state.employees.actualEmployee);

  const employeesList = useSelector((state) =>
    state.employees.data.filter((param) => param.isVisible === true)
  );

  useEffect(() => {
    dispatch(getAllEmployees());
    dispatch(changeEntity({ entity: "employee", entityName: "employee" }));
  }, [dispatch]);

  const changeActionRedux = (action) => {
    dispatch(changeAction(action));
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const emptyFields = () => {
    setName("");
    setLastName("");
    setPhoneCountryCode("");
    setPhoneNumber("");

    setCi("");
    setNationality("");
    setBirthday("");

    setStartDate("");
  };

  const closeModal = () => {
    setModalIsOpen(false);
    emptyFields();
    setIsSubmited(false);
  };

  const closeDeleteModal = () => {
    setDeleteModalIsOpen(false);
    emptyFields();
    setIsSubmited(false);
  };

  const deleteActualEmployee = () => {
    dispatch(deleteEmployee(actualEmployee)).then((status) => {
      if (status) {
        toast.invetorySuccess("Empleado eliminado con éxito");
      } else {
        toast.inventoryError("Error al eliminar empleado");
      }
    });
  };

  const setActualEmployeeRedux = (data) => {
    dispatch(setActualEmployee(data));
  };

  const onClickSave = (e) => {
    e.preventDefault();
    setIsSubmited(true);
    if (name !== "" && lastName !== "" && ci !== "") {
      dispatch(
        createEmployee({
          name,
          lastName,
          ci,
          nationality,
          birthday,
          //   phone,
          phoneCountryCode,
          phoneNumber,
          startDate,
        })
      ).then((status) => {
        if (status) {
          toast.invetorySuccess("Empleado creado con éxito");
        } else {
          toast.inventoryError("Error al crear empleado");
        }
      });
      closeModal();
    }
  };

  const onEditSave = (e) => {
    e.preventDefault();
    setIsSubmited(true);
    if (name !== "" && lastName !== "" && ci !== "") {
      dispatch(
        updateEmployee({
          ...actualEmployee,
          name,
          lastName,
          ci,
          nationality,
          birthday,
          phoneCountryCode,
          phoneNumber,
          startDate,
        })
      ).then((status) => {
        if (status) {
          toast.invetorySuccess("Empleado editado con éxito");
        } else {
          toast.inventoryError("Error al editar empleado");
        }
      });
      closeModal();
    }
  };

  return {
    action,
    modalIsOpen,
    openModal,
    closeModal,
    closeDeleteModal,
    deleteModalIsOpen,
    setDeleteModalIsOpen,
    setActualEmployeeRedux,
    name,
    setName,
    lastName,
    setLastName,
    phoneCountryCode,
    setPhoneCountryCode,
    phoneNumber,
    setPhoneNumber,
    ci,
    setCi,
    nationality,
    setNationality,
    birthday,
    setBirthday,
    startDate,
    setStartDate,
    isSubmited,
    employeesList,
    changeActionRedux,
    deleteActualEmployee,
    onClickSave,
    onEditSave,
  };
};
