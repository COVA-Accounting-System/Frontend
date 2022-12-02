import { useState } from 'react'

export const useSelectedElement = () => {
  const [element, setElement] = useState({})

  const onSelectElementAtInputFile = (element) => {
    if (element != undefined) {
      setElement(element.data)
    } else {
      setElement({})
    }
  }

  return {
    element,
    setElement,
    onSelectElementAtInputFile
  }
}
