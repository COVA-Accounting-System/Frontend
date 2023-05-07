import React from 'react'

// import FirstChart from '../../../components/Charts/FirstChart'
import TotalProductionCost from '../../../components/Charts/TotalProductionCost'
import TotalCostsPie from '../../../components/Charts/TotalCostsPie'
import DateFormControl from '../../../components/Input/DateFormControl'

import { Stack, Text, Grid, GridItem, Flex, Button } from '@chakra-ui/react'

import useCosts from '../../../hooks/useCosts'

const Costs = () => {
  const costs = useCosts()

  return (
    <Flex
      direction={'column'}
      rowGap={'4'}
      width={'100%'}
      height={'100vh'}
      px={'40px'}
      py={'25px'}
    >
      <Stack>
        <Text fontSize={'27px'} color={'acsys.titleColor'} fontWeight={'700'}>
          Costos
        </Text>
      </Stack>
      <Stack direction={'row'}>
        <DateFormControl
          labelName={'Fecha inicial'}
          value={costs.startDate}
          onInput={date => {
            costs.setStartDate(date)
          }}
        />
        <DateFormControl
          labelName={'Fecha de fin'}
          value={costs.endDate}
          onInput={date => {
            costs.setEndDate(date)
          }}
        />
        <Stack justifyContent={'end'}>
          <Button
            // px={5}
            maxH={'36px'}
            colorScheme='linkedin'
            bgColor={'acsys.primaryColor'}
            fontSize={'sm'}
            fontWeight={'600'}
            isDisabled={!costs.dateRangeIsValid}
            isLoading={costs.isLoading}
            onClick={costs.generateCostReport}
          >
            Generar reporte
          </Button>
        </Stack>
      </Stack>
      <Stack flexGrow={1}>
        <Grid
          // h='100%'
          // templateRows='repeat(3, 1fr)'
          // templateColumns='repeat(3, 1fr)'
          // gap={4}
          h='100%'
          templateRows='repeat(2, 1fr)'
          templateColumns='repeat(3, 1fr)'
          gap={4}
        >
          <GridItem rowSpan={1} colSpan={1}>
            <TotalProductionCost data={costs.costReportData.expenses} />
          </GridItem>
          <GridItem rowSpan={1} colSpan={1}  >
            <TotalCostsPie data={costs.costReportData.expenses}/> 
          </GridItem>
          <GridItem rowSpan={1} colSpan={1} bg='tomato' />
          <GridItem rowSpan={1} colSpan={1} bg='tomato' />
          <GridItem rowSpan={1} colSpan={1} bg='tomato' />
          <GridItem rowSpan={1} colSpan={1} bg='tomato' />
        </Grid>
      </Stack>
      {/* <h1>Gráfico de barras de ventas</h1>
      <TotalProductionCost data={chartData} /> */}
    </Flex>
  )
}

export default Costs
