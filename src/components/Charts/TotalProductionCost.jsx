import React from 'react'

import { Stack } from '@chakra-ui/react'

import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar
} from 'recharts'

const TotalProductionCost = ({data}) => {
  return (
    <Stack>
      <BarChart width={600} height={300} data={data}>
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='name' />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey='value' fill='#8884d8' />
      </BarChart>
    </Stack>
  )
}

export default TotalProductionCost
