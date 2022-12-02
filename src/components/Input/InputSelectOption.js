import React, { useEffect, useState } from 'react'
import './Input.scss'

const InputSelectOption = ({ label, value, onInput, onSelectOption, optionValue, optionList, option }) => {
  const [isOpened, setIsOpened] = useState(false)
  const [amountType, setAmountType] = useState(optionList[0])
  const [widthStyle, setWidthStyle] = useState({
    label: {},
    input: {},
    searchBox: {}
  })
  const amountOrders = ['Unidad(es)', 'Pare(s)', 'Docena(s)']

  useEffect(() => {
    if (option === 'Amount') {
      setWidthStyle({
        container: { width: '200px' },
        input: { width: '85px' },
        selectBox: { width: '115px' },
        selectModal: { width: '99px' }
      })
    } else if (option === 'Price') {
      setWidthStyle({
        container: { width: '170px' },
        input: { width: '90px' },
        selectBox: { width: '85px' },
        selectModal: { width: '64px' }
      })
    }
  }, [])

  useEffect(() => {
    if (!isOpened) {
      document.getElementById('input-selected-amount-type').blur()
    }
  }, [isOpened])

  return (
    <div
      className='input-selected-amount-container'
      style={widthStyle.container}
    >
      <label className='input-selected-amount-label'>{label}</label>
      <div className='input-selected-container-element'>
        <input
          type='number'
          className='input-selected-amount-input'
          style={widthStyle.input}
          min={0}
          value={value}
          onInput={(event) => {
            onInput(event.target.value)
          }}
        />
        <div
          id='input-selected-amount-type'
          className='select-amount-element'
          tabIndex={0}
          onClick={() => setIsOpened(!isOpened)}
          onBlur={() => setIsOpened(false)}
          style={widthStyle.selectBox}
        >
          {optionValue}{' '}
          <span className='material-symbols-outlined input-icon-expand'>
            expand_more
          </span>
        </div>
        <div
          className='select-amount-options-container'
          style={
            isOpened
              ? widthStyle.selectModal
              : { maxHeight: '0px', padding: '0px', border: '0px' }
          }
        >
          {optionList.map((element) => {
            return (
              <div
                key={`${element}15252`}
                className='select-amount-options-elements'
                onMouseDown={() => {
                  // setAmountType(element);
                  onSelectOption(element)
                }}
              >
                {element}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default InputSelectOption
