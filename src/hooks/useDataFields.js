import { useState, useEffect } from 'react'

export const useDataFields = (elementField, secondFieldValue, thirdFieldValue) => {
  const [isValid, setIsValid] = useState(false)

  useEffect(() => {
    if (
      elementField.element._id != undefined &&
      secondFieldValue != '' &&
      thirdFieldValue != ''
    ) {
      setIsValid(true)
    } else {
      setIsValid(false)
    }
  }, [elementField, secondFieldValue, thirdFieldValue])

  return {
    isValid
  }
}
