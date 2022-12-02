import React, { useEffect, useState } from 'react'
import './Input.scss'

const InputSelect = ({ data, entityName, setSelectedElement }) => {
  const [isElementSelected, setIsElementSelected] = useState(false)
  const [filteredData, setFilteredData] = useState([])
  const [openInput, setOpenInput] = useState(false)

  const [elementInput, setElementInput] = useState('')

  useEffect(() => {
    setFilteredData(
      data.filter((element) => {
        const name = element.name.toLowerCase().replace(/ /g, '')
        return name.includes(elementInput.toLowerCase().replace(/ /g, ''))
      })
    )
  }, [elementInput])

  const filterInput = (event) => {
    setIsElementSelected(false)
    setElementInput(event.target.value)
    setSelectedElement(undefined)
  }

  const selectElement = (element) => {
    setSelectedElement(element)
    setIsElementSelected(true)
    setElementInput(element.name)
    setOpenInput(false)
  }

  const handleOnFocus = (boolean) => {
    // console.log(document.getElementById(`input-select-id-cliente`).focus())
    setOpenInput(boolean)
    if (elementInput === '') {
      setFilteredData(data)
    }
  }

  return (
    <>
      <div className='input-select-container'>
        <label className='input-select-label'>
          {entityName.charAt(0).toUpperCase() + entityName.slice(1)}
        </label>

        <input
          type='text'
          id={`input-select-id-${entityName}`}
          spellCheck='false'
          placeholder={`Seleccione un ${entityName}`}
          value={elementInput}
          className='input-select-element'
          onFocus={() => handleOnFocus(true)}
          onBlur={() => {
            setOpenInput(false)
          }}
          autoComplete='off'
          onInput={filterInput}
          style={isElementSelected ? { backgroundColor: '#f1f3f6' } : {}}
        />

        <div
          className='input-select-search-element'
          style={
            openInput ? {} : { maxHeight: '0px', margin: '0px', border: '0px' }
          }
        >
          <div
            style={
              openInput
                ? { overflow: 'auto', maxHeight: '140px', margin: '7px 0px' }
                : { overflow: 'auto', maxHeight: '0px' }
            }
          >
            {filteredData.map((element) => {
              return (
                <div
                  key={element.name}
                  className='input-search-list-element'
                  onMouseDown={() => selectElement(element)}
                >
                  {element.name}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}

export default InputSelect
