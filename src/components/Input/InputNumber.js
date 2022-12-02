import React from 'react'
import './Input.scss'

const InputNumber = ({ value, onInput }) => {
  const handleOnInputChange = (event) => {
    onInput(event.target.value)
  }

  return (
    <div className='number-input-container'>
      <label htmlFor='' className='number-input-label'>
        Nº de pedido
      </label>
      <input
        type='number'
        className='number-input-input'
        min={0}
        value={value}
        onInput={handleOnInputChange}
      />
    </div>
  )
}

export default InputNumber
