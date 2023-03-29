import React from 'react'

import {
  useEditableControls,
  ButtonGroup,
  IconButton
} from '@chakra-ui/react'

import { CloseIcon, EditIcon, CheckIcon } from '@chakra-ui/icons'

const FeaturesEditable = () => {
  const {
    isEditing,
    getSubmitButtonProps,
    getCancelButtonProps,
    getEditButtonProps
  } = useEditableControls()

  return isEditing ? (
    <ButtonGroup size='xs' spacing={1} color='acsys.fontColor'>
      <IconButton icon={<CheckIcon />} {...getSubmitButtonProps()}/>
      <IconButton icon={<CloseIcon />} {...getCancelButtonProps()} />
    </ButtonGroup>
  ) : (
    // <Container >
    <IconButton
      size='xs'
      color='acsys.fontColor'
      icon={<EditIcon />}
      {...getEditButtonProps()}
    />
    // </Container>
  )
}

export default FeaturesEditable
