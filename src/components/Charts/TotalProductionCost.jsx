import React, { useState, useEffect } from 'react'

import { Stack } from '@chakra-ui/react'

import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  ResponsiveContainer
} from 'recharts'

const TotalProductionCost = ({ data }) => {
  const [formatedData, setFormatedData] = useState([
    { name: 'Materia prima', Costo: 0 },
    { name: 'Mano de obra directa', Costo: 0 },
    { name: 'Costos indirectos de fabricación', Costo: 0 }
  ])

  useEffect(() => {
    let rawMaterialCost = 0
    let laborCost = 0
    let indirectCost = 0

    if (data && data.length > 0) {
      for (let i = 0; i < data.length; i++) {
        if (data[i].expense.category === 'Materia prima') {
          rawMaterialCost = data[i].expense.amount + rawMaterialCost
        }
        if (data[i].expense.category === 'Mano de obra directa') {
          laborCost = data[i].expense.amount + laborCost
        }
        if (data[i].expense.category === 'Costos indirectos de fabricación') {
          indirectCost = data[i].expense.amount + indirectCost
        }
      }

      setFormatedData([
        { name: 'Materia prima', Costo: rawMaterialCost },
        { name: 'Mano de obra directa', Costo: laborCost },
        { name: 'Costos indirectos de fabricación', Costo: indirectCost }
      ])
    }
  }, [data])

  return (
    <Stack>
      {data && data.length > 0 ? (
        <BarChart width={1000} height={300} data={formatedData}>
          <CartesianGrid strokeDasharray='3 3' />

          <YAxis label={{ value: 'Bs.', angle: -90, position: 'insideLeft' }} />
          <XAxis dataKey='name' />
          <Tooltip
            formatter={value => `${value} Bs.`} 
          />
          <Bar dataKey='Costo' fill='#38B2AC' label={'Categoria'} />
        </BarChart>
      ) : null}
    </Stack>
  )
}

export default TotalProductionCost
