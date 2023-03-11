import React from 'react'

import './StateTag.scss'
import { Tag } from '@chakra-ui/react'

import { orderState } from '../../assets/orderState'

const StateTag = ({ data }) => {
  const { orderStateNumber } = data
  return (
    // <div className='state-tag'>
    //   <div
    //     className='state-tag-container'
    //     style={{ backgroundColor: orderState[orderStateNumber].color}}
    //   >
    //     {orderState[orderStateNumber].stateSpanish}
    //   </div>
    // </div>
    <div className='state-tag-container'>
      <Tag
        backgroundColor={orderState[orderStateNumber].color}
        color={'acsys.whiteTextColor'}
        fontWeight='600'
        fontSize={ '13px' }
        className='state-tag'
      >
        {orderState[orderStateNumber].stateSpanish.toLocaleUpperCase()}
      </Tag>
    </div>
  )
}

export default StateTag
