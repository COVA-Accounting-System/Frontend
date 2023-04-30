import React from 'react'

// import FirstChart from '../../../components/Charts/FirstChart'
import TotalProductionCost from '../../../components/Charts/TotalProductionCost'

import { Stack } from '@chakra-ui/react'

const Costs = () => {
  const chartData = [
    { name: 'Enero', value: 4000 },
    { name: 'Febrero', value: 3000 },
    { name: 'Marzo', value: 2000 },
    { name: 'Abril', value: 2780 },
    { name: 'Mayo', value: 1890 }
  ]

  return (
    <div>
      <h1>Gráfico de barras de ventas</h1>
      <TotalProductionCost data={chartData} />
    </div>
  )
}

export default Costs
