import React from 'react'

import { Flex, Stack, Tooltip } from '@chakra-ui/react'

const MaterialsTooltip = ({ data, getListOfMaterials }) => {
  const listOfMaterials = getListOfMaterials(data)

  return (
    <Tooltip
      label={
        <Stack spacing={0} lineHeight={5} marginTop={2} marginBottom={2}>
          {listOfMaterials.map((material, index) => {
            return (
              <Flex key={material._id} columnGap={2}>
                <p>•</p>
                <p>{material.rawMaterial.uiName}</p>
                <p>{material.amount}</p>
                <p>{material.rawMaterial.unitMeasure.uiName.toLowerCase()}</p>
                <p>{material.price} Bs.</p>
              </Flex>
            )
          })}
        </Stack>
      }
    >
            <Stack spacing={0} lineHeight={5} marginTop={2} marginBottom={2}>
          {listOfMaterials.map((material, index) => {
            return (
              <Flex key={material._id} columnGap={2}>
                <p>•</p>
                <p>{material.rawMaterial.uiName}</p>
                <p>{material.amount}</p>
                <p>{material.rawMaterial.unitMeasure.uiName.toLowerCase()}</p>
                <p>{material.price} Bs.</p>
              </Flex>
            )
          })}
        </Stack>
    </Tooltip>
  )
}

export default MaterialsTooltip
