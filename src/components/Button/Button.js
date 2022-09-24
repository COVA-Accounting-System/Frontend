import React from 'react'
import PropTypes from 'prop-types';
import "./Button.scss"

export const Button = ({label, type, system, onClick }) => {
  return (
    <button className={[`button`, `button-${type}`, `button-${system}-mode`].join(' ')} onClick={onClick}>
        {label}
    </button>
  )
}


Button.propTypes = {

    type: PropTypes.oneOf(['create', 'confirm', 'cancel', 'changeMode']),
    system: PropTypes.oneOf(['inventory', 'accounting']),
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func,
  };
  
  Button.defaultProps = {
    type: undefined,
    system: 'inventory',
    label: 'Crear Producto',
    onClick: undefined,
  };
  
