import React, { useState } from 'react'
import {
  FormControl,
  FormLabel,
  Input,
  UnorderedList,
  ListItem,
  Editable,
  EditablePreview,
  EditableInput,
  IconButton,
  Stack,
  Flex
} from '@chakra-ui/react'

import { AddIcon, DeleteIcon } from '@chakra-ui/icons'
import { Button } from '../Button/Button'
import FeaturesEditable from './FeaturesEditable'

const FeaturesFormControl = ({
  listOfFeatures,
  onAddFeature,
  onEditFeature,
  onRemoveFeature,
  marginTop,
  isExtended = false
}) => {
  const [featureInputValue, setFeatureInputValue] = useState('')
  return (
    <FormControl mt={marginTop}>
      <FormLabel
        color='acsys.subtitleColor'
        mb='1'
        fontWeight='600'
        fontSize='13px'
      >
        Caracteristicas
      </FormLabel>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '330px'
          //   gap: '15px'
        }}
      >
        <Input
          focusBorderColor='acsys.primaryColor'
          size='sm'
          value={featureInputValue}
          onInput={event => {
            setFeatureInputValue(event.target.value)
          }}
          placeholder=''
          spellCheck='false'
          borderRadius='5px'
          fontSize='15px'
          height='35px'
          color='acsys.iconColor'
          type='string'
          marginRight='10px'
        />
        <IconButton
          size={'sm'}
          height={'35px'}
          isDisabled={featureInputValue !== '' ? false : true}
          backgroundColor={'acsys.primaryColor'}
          colorScheme='linkedin'
          _hover={{ backgroundColor: '#098bb6' }}
          icon={<AddIcon />}
          // colorScheme='blue'
          onClick={event => {
            event.preventDefault()
            const newListOfFeatures = [...listOfFeatures]
            newListOfFeatures.push({ description: featureInputValue })
            onAddFeature(newListOfFeatures)
            setFeatureInputValue('')
          }}
        />
        {/* {featureInputValue !== '' ? (
          <Button
            label='+'
            type='add'
            system='accounting'

          />
        ) : (
          <Button label='+' type='add-disabled' isDisabled={true} />
        )} */}
      </div>
      <div className='features-list-container' style={isExtended ? {height: '229px'}: {}}>
 
        <UnorderedList>
          {listOfFeatures.map((feature, index) => {
            return (
              <ListItem mb={1}>
                {' '}
                <Editable
                  defaultValue={feature.description}
                  onSubmit={value => {
                    const featureToUpdate = { ...listOfFeatures[index] }
                    featureToUpdate.description = value
                    const newListOfFeatures = [...listOfFeatures]
                    newListOfFeatures[index] = featureToUpdate
                    onEditFeature(newListOfFeatures)
                  }}
                >
                  <Flex
                    flexDirection={'row'}
                    justifyContent={'space-between'}
                    maxW={'100%'}
                  >
                    <EditablePreview />
                    <EditableInput />
                    <Flex alignItems={'center'} columnGap={1} ml={2}>
                      <FeaturesEditable />
                      <IconButton
                        size={'xs'}
                        icon={<DeleteIcon />}
                        color='acsys.fontColor'
                        _hover={{
                          color: 'acsys.redColor',
                          cursor: 'pointer'
                        }}
                        onClick={() => {
                          const newListOfFeatures = [...listOfFeatures]
                          newListOfFeatures.splice(index, 1)
                          onRemoveFeature(newListOfFeatures)
                        }}
                      />
                    </Flex>
                  </Flex>
                </Editable>
                {/* <p style={{paddingRight: '20px'}}>{feature.description}</p> */}
              </ListItem>
            )
          })}
        </UnorderedList>

      </div>
    </FormControl>
  )
}

export default FeaturesFormControl
