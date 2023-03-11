import React, { useState } from 'react'

import { Checkbox } from '@chakra-ui/react'
import './SearchByState.scss'

import { ChevronDownIcon } from '@chakra-ui/icons'

const SearchByState = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  
  return (
    <div className='search-by-state'>
      <div></div>
      <div className='search-by-state-icon'>
        <ChevronDownIcon />
      </div>
      <div className='search-by-state-modal'>
        <div className='search-by-state-modal-element'>
          <Checkbox>EN FILA</Checkbox>
        </div>
        <div className='search-by-state-modal-element'>
          <Checkbox>EN PRODUCCION</Checkbox>
        </div>
        <div className='search-by-state-modal-element'>
          <Checkbox>TERMINADO</Checkbox>
        </div>
        <div className='search-by-state-modal-element'>
          <Checkbox>ENTREGADO</Checkbox>
        </div>
      </div>
    </div>
  )
}

export default SearchByState
