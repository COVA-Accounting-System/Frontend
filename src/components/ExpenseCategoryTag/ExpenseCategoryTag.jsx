import React from 'react'
import { Flex, Tag } from '@chakra-ui/react'

const ExpenseCategoryTag = ({ data }) => {
  return (
    <Flex alignItems={'center'} height={'100%'}>
      <Tag
    //   variant={'outline'}
        colorScheme={
          data.category === 'Materia prima'
            ? 'orange'
            :data.category === 'Mano de obra directa' ? 
            'blue'
            : data.category === 'Costos indirectos de fabricación'
            ? 'red'
            : ''
        }
        fontSize={'small'}
      >
        {data.category.toUpperCase()}
      </Tag>
    </Flex>
  )
}

export default ExpenseCategoryTag
