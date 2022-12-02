import { useEffect, useState } from 'react'

export const usePrice = (product, amount) => {
  const [value, setValue] = useState('')
  const [coinName, setCoinName] = useState('Bolivianos')
  const [coinAbreviation, setCoinAbreviation] = useState('Bs')
  const [coinAbreviationList, setCoinAbreviationList] = useState([])

  const listOfCoins = [
    { coinName: 'Bolivianos', coinAbreviation: 'Bs.' }
    // { coinName: "Dolares", coinAbreviation: "USD." },
  ]

  useEffect(() => {
    const list = listOfCoins.map((coin) => coin.coinAbreviation)
    setCoinAbreviationList(list)
  }, [])

  useEffect(() => {
    if (product._id != undefined && amount.value != '') {
      console.log('entra')
      if (amount.unit === 'unit') {
        setValue(product.unitPrice * amount.value)
      }
      if (amount.unit === 'pair') {
        setValue((product.dozenPrice / 6) * amount.value)
      }
      if (amount.unit === 'dozen') {
        setValue(product.dozenPrice * amount.value)
      }
    }
  }, [product, amount.value, amount.unit])

  return {
    value,
    setValue,
    coinName,
    setCoinName,
    coinAbreviation,
    setCoinAbreviation,
    coinAbreviationList
  }
}
