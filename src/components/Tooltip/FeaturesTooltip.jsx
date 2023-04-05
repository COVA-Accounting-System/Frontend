import React from 'react'

import { Tooltip } from '@chakra-ui/react'

const FeaturesTooltip = ({ data, getListOfFeatures }) => {
  const listOfFeatures = getListOfFeatures(data)
  return (
    <Tooltip
      label={
        <div>
          {listOfFeatures.map(feature => (
            <div>{`  ${feature.description}`}</div>
          ))}
        </div>
      }
    >
      <div>
        {listOfFeatures.map((feature, index) => (
          <span>{` • ${feature.description}`}&nbsp; </span>
        ))}
      </div>
    </Tooltip>
  )
}

export default FeaturesTooltip
