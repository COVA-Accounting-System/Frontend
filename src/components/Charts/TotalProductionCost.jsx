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
  console.log(data)
  return (
    <Stack>
      {data && data.length > 0 ? (
        <BarChart width={600} height={300} data={data}>
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='expense.date' />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey='expense.amount' stackId='a' fill='#8884d8' />
          {/* <Bar dataKey="uv" stackId="a" fill="#82ca9d" /> */}
        </BarChart>
      ) : null}
    </Stack>
  )
}

export default TotalProductionCost
