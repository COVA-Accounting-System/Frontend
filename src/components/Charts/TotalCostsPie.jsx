import React, { useEffect, useState } from 'react'

import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts'

import { Stack } from '@chakra-ui/react'

const COLORS = ['#0088FE', '#00C49F', '#FFBB28']

const TotalCostsPie = ({ data }) => {

  const [formatedData, setFormatedData] = useState([
    { name: 'Materia prima', amount: 5 },
    { name: 'Mano de obra directa', amount: 5 },
    { name: 'Costos indirectos de fabricación', amount: 5 }
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
        { name: 'Materia prima', amount: rawMaterialCost },
        { name: 'Mano de obra directa', amount: laborCost },
        { name: 'Costos indirectos de fabricación', amount: indirectCost }
      ])
    }
  }, [data])

  return (
    <Stack>
      {data && data.length > 0 ? (
        <PieChart width={400} height={400}>
          <Pie
            data={formatedData}
            cx='50%'
            cy='50%'
            labelLine={false}
            outerRadius='80%'
            fill='#8884d8'
            dataKey='amount'
            label={({ name, amount }) => `${amount} Bs.`}
          >
            {formatedData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      ) : null}
    </Stack>
  )
}

export default TotalCostsPie
