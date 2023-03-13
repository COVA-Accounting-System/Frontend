import { useState } from 'react'

export const useOrderState = () => {
  const [onHoldingCheck, setOnHoldingCheck] = useState(true)
  const [onProductionCheck, setOnProductionCheck] = useState(true)
  const [finishedCheck, setFinishedCheck] = useState(true)
  const [deliveredCheck, setDeliveredCheck] = useState(true)


  return {
    onHoldingCheck,
    setOnHoldingCheck,
    onProductionCheck,
    setOnProductionCheck,
    finishedCheck,
    setFinishedCheck,
    deliveredCheck,
    setDeliveredCheck
  }
}
 
