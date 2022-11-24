import React from "react";
import "../DialogModal.scss";
import { Button } from "../../Button/Button";
import InputSelect from "../../Input/InputSelect";
import InputDate from "../../Input/InputDate";
import InputNumber from "../../Input/InputNumber";
import InputSelectOption from "../../Input/InputSelectOption";
import { useState, useEffect } from "react";
import { usePrice } from "../../../hooks/usePrice";
import { useAmount } from "../../../hooks/useAmount";
import { useSelectedElement } from "../../../hooks/useSelectedElement";
import { useDataFields } from "../../../hooks/useDataFields";
import { useDataTable } from "../../../hooks/useDataTable";
import { useOrder } from "../../../hooks/useOrder";

const OrderForm = ({ onRequestClose }) => {

  const amount = useAmount();
  const client = useSelectedElement();
  const product = useSelectedElement();
  const dataTable = useDataTable();
  const price = usePrice(product.element, amount);

  const [date, setDate] = useState("");
  const [orderNumber, setOrderNumber] = useState("");

  const orderDataField = useDataFields(client, date, orderNumber);
  const orderTableDataField = useDataFields(product, amount.value, price.value);

  const order = useOrder(
    onRequestClose,
    orderNumber,
    client.element._id,
    date,
    dataTable.data
  );


  const onClickSave = () => {
    if (order.action === "create") {
      order.onClickSave();
    }
    if (order.action === "edit") {
      order.onEditSave();
    }
  };

  return (
    <div className="oia-form">
      <h1 className="oia-form-title">
        {order.action === "create"
          ? `Crear ${order.entity}`
          : `Editar ${order.entity}`}
      </h1>
      <div className="oia-static-form-principal-input-data">
        <InputSelect
          entityName={"cliente"}
          data={order.clients.map((client) => {
            return { name: client.name + " " + client.lastName, data: client };
          })}
          setSelectedElement={client.onSelectElementAtInputFile}
        />
        <InputDate
          value={date}
          onInput={(value) => {
            setDate(value);
          }}
        />
        <InputNumber
          value={orderNumber}
          onInput={(value) => {
            setOrderNumber(parseInt(value));
          }}
        />
      </div>
      <div className="oia-variable-form-input-data">
        <InputSelect
          entityName={"producto"}
          data={order.products.map((product) => {
            return { name: product.name, data: product };
          })}
          setSelectedElement={product.onSelectElementAtInputFile}
        />
        <InputSelectOption
          label={"Cantidad"}
          optionList={amount.unitSpanishList}
          option={"Amount"}
          onSelectOption={(value) => {
            // setAmount({ ...amount, unit: value });
            amount.setUnitSpanish(value);
          }}
          optionValue={amount.unitSpanish}
          value={amount.value}
          onInput={(value) => {
            // setAmount({ ...amount, value: value });
            amount.setValue(parseInt(value));
          }}
        />
        <InputSelectOption
          label={"Precio"}
          optionList={price.coinAbreviationList}
          option={"Price"}
          onSelectOption={(value) => {
            price.setCoinAbreviation(value);
          }}
          optionValue={price.coinAbreviation}
          value={price.value}
          onInput={(value) => {
            price.setValue(value);
          }}
        />
        <div style={{ display: "flex", alignItems: "flex-end" }}>
          <Button
            label={"+"}
            type={orderTableDataField.isValid ? "add" : "add-disabled"}
            onClick={() => {
              dataTable.addToTotalPrice(price.value);
              dataTable.addRow({ element: product.element, amount, price });
              amount.setValue("");
              price.setValue("");
            }}
            isDisabled={!orderTableDataField.isValid}
          ></Button>
        </div>
      </div>
      <section className="oia-data-selected-view">
        <div className="oia-data-view-title-container ">
          <div className="oia-view-column-grid">
            <h3 className="oia-data-view-title oia-data-margin-left">Nº</h3>
            <h3 className="oia-data-view-title">Producto</h3>
            <h3 className="oia-data-view-title">Cantidad</h3>
            <h3 className="oia-data-view-title">Precio</h3>
            <h3 className="oia-data-view-title">Quitar</h3>
          </div>
        </div>

        <div className="oia-data-view-table ">
          {dataTable.data.map((data, index) => {
            return (
              <div className="oia-view-column-grid" key={index}>
                <div className="oia-data-view-table-element oia-data-margin-left">
                  1
                </div>
                <div className="oia-data-view-table-element">
                  {data.element.name}
                </div>
                <div className="oia-data-view-table-element ">
                  {data.amount.value} {data.amount.unitSpanish}
                </div>
                <div className="oia-data-view-table-element ">
                  {data.price.value} {data.price.coinAbreviation}
                </div>
                <div className="oia-data-view-table-element">
                  <span
                    id="delete"
                    className="material-symbols-outlined oia-data-view-icon-delete"
                    title="Quitar"
                    onClick={() => {
                      dataTable.deleteRow(index);
                      dataTable.removeFromTotalPrice(data.price.value);
                    }}
                  >
                    delete
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="oia-data-view-total oia-view-column-grid">
          <div></div>
          <div></div>

          <div></div>
          <div className="oia-total-underline">
            {dataTable.totalPrice} {price.coinAbreviation}
          </div>
          <div></div>
        </div>
      </section>

      <div className="oia-form-save-button-container">
        <Button
          label={"Guardar"}
          type={orderDataField.isValid ? "confirm" : "confirm-disabled"}
          isDisabled={!orderDataField.isValid}
          onClick={onClickSave}
        ></Button>
      </div>
    </div>
  );
};

export default OrderForm;
