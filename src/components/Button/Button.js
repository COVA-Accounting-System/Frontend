import React from "react";
import PropTypes from "prop-types";
import "./Button.scss";

export const Button = ({
  label,
  type,
  system,
  onClick,
  isDisabled = false
}) => {
  return (
    <button
      className={[`button`, `button-${type}`, `button-${system}-mode`].join(
        " "
      )}
      onClick={onClick}
      disabled={isDisabled}
      style={{ cursor: isDisabled ? "not-allowed" : "pointer" }}
    >
      {label}
    </button>
  );
};

Button.propTypes = {
  type: PropTypes.oneOf([
    "add",
    "add-disabled",
    "create",
    "confirm",
    "confirm-disabled",
    "cancel",
    "confirm-delete",
    "cancel-delete",
    "login",
  ]).isRequired,
  system: PropTypes.oneOf(["inventory", "accounting"]),
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  type: undefined,
  system: "inventory",
  label: "Crear Producto",
  onClick: undefined,
};
