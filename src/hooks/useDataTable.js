import { useState } from 'react'

export const useDataTable = () => {
  const [data, setData] = useState([])
  const [totalPrice, setTotalPrice] = useState(0)

  const addRow = (row) => {
    const { element, amount, price } = row
    const newAmount = {
      value: parseInt(amount.value),
      unit: amount.unit,
      unitSpanish: amount.unitSpanish
    }
    const newPrice = {
      value: parseFloat(price.value).toFixed(2),
      coinAbreviation: price.coinAbreviation
    }
    const newRow = { element, amount: newAmount, price: newPrice }

    setData([...data, newRow])
  }

  const addToTotalPrice = (value) => {
    setTotalPrice(
      parseFloat(parseFloat(totalPrice) + parseFloat(value)).toFixed(2)
    )
  }

  const deleteRow = (index) => {
    const newData = data.filter((row, i) => i !== index)
    setData(newData)
  }

  const removeFromTotalPrice = (value) => {
    setTotalPrice(
      parseFloat(parseFloat(totalPrice) - parseFloat(value)).toFixed(2)
    )
  }

  return {
    data,
    totalPrice,
    deleteRow,
    setData,
    addRow,
    addToTotalPrice,
    removeFromTotalPrice
  }
}
