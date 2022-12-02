import { useEffect, useState } from 'react'

export const useAmount = () => {
  const [value, setValue] = useState('')
  const [unit, setUnit] = useState('unit')
  const [unitSpanish, setUnitSpanish] = useState('Unidad(es)')
  const [unitList, setUnitList] = useState([])
  const [unitSpanishList, setUnitSpanishList] = useState([])

  const uList = ['unit', 'pair', 'dozen']
  const uSpanishList = ['Unidad(es)', 'Pare(s)', 'Docena(s)']

  useEffect(() => {
    setUnitSpanishList(uSpanishList)
    setUnitList(uList)
  }, [])

  const changeUnit = (unitSpanish) => {
    setUnitSpanish(unitSpanish)
    if (unitSpanish === 'Unidad(es)') {
      setUnit('unit')
    }
    if (unitSpanish === 'Pare(s)') {
      setUnit('pair')
    }
    if (unitSpanish === 'Docena(s)') {
      setUnit('dozen')
    }
  }

  return {
    value,
    setValue,
    unit,
    setUnit,
    unitSpanish,
    setUnitSpanish: changeUnit,
    unitList,
    unitSpanishList
  }
}
