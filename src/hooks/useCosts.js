import { useEffect, useState } from 'react'
import axios from 'axios'
import { invetorySuccess, inventoryError } from '../services/toastService'

const costReportInstance = axios.create({
  baseURL: `${process.env.REACT_APP_DATA_API}/cost`,
  timeout: 10000,
  headers: { 'x-access-token': localStorage.getItem('token') }
})

const useCosts = () => {
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [dateRangeIsValid, setDateRangeIsValid] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const [costReportData, setCostReportData] = useState([])

  useEffect(() => {
    if (startDate > endDate || startDate === '' || endDate === '') {
      setDateRangeIsValid(false)
    } else {
      setDateRangeIsValid(true)
    }
  }, [startDate, endDate])

  useEffect(() => {
    generateInitialCostReport()
  }, [])

  const getCostReportData = async () => {
    const response = await costReportInstance.get('/')
    if (response.status === 200) {
      setCostReportData(response.data)
      setStartDate(response.data.startDate)
      setEndDate(response.data.endDate)
      // console.log('hablado de mas ')
      // console.log(response.data)
      // invetorySuccess('Reporte recuperado con éxito')
      // return response.data
    }
      // inventoryError('Error al recuperar el reporte')
  }

  const generateInitialCostReport = async () => {
    setIsLoading(true)
    try{
      const response = await costReportInstance.post('/generateInitialReport')
      if (response.status === 200) {
        setStartDate(response.data.startDate)
        setEndDate(response.data.endDate)
        setCostReportData(response.data)
        invetorySuccess('Reporte de costos generado con éxito')
      }    
    }
    catch(error){
      console.log(error)
    }
    setIsLoading(false)
  }

  const generateCostReport = async () => {
    setIsLoading(true)
    const response = await costReportInstance.post('/generateReport', { startDate, endDate })
    if (response.status === 200) {
      invetorySuccess('Reporte de costos generado con éxito')
      setCostReportData(response.data)
    } else {
      inventoryError('Error al generar el reporte de costos')
    }
    setIsLoading(false)
  }

  return {
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    dateRangeIsValid,
    isLoading,
    costReportData,
    generateCostReport
  }
}

export default useCosts
