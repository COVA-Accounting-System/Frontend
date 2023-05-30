import React from 'react'

// import FirstChart from '../../../components/Charts/FirstChart'
import TotalProductionCost from '../../../components/Charts/TotalProductionCost'
import TotalCostsPie from '../../../components/Charts/TotalCostsPie'
import DateFormControl from '../../../components/Input/DateFormControl'
import ProductListWithUnitCost from '../../../components/Charts/ProductListWithUnitCost'

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
      <Stack
        position={'sticky'}
        top={'0'}
        zIndex={'1'}
        bgColor={'white'}
        pb={4}
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
      </Stack>

      <Stack>
        <TotalProductionCost data={costs.costReportData.expenses} />
      </Stack>
      <Stack w={'100%'} justifyContent={'center'} direction={'row'}>
        <TotalCostsPie data={costs.costReportData.expenses} />
      </Stack>

      <ProductListWithUnitCost data={costs.costReportData.orders} />

      {/* <h1>Gráfico de barras de ventas</h1>
      <TotalProductionCost data={chartData} /> */}
    </Flex>
  )
}

export default Costs
