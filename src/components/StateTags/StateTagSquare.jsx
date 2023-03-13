import { Center, Square } from '@chakra-ui/react'
import React from 'react'

import './StateTag.scss'

const StateTagSquare = ({ color }) => {
  return (
    <Center ml={2}>
      {' '}
      <Square size={4} bg={color} borderRadius={2}></Square>
    </Center>
  )
}

export default StateTagSquare
