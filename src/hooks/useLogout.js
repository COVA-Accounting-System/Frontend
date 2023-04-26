import { useDispatch } from 'react-redux'
import { logOut } from '../auth/authentication'
import { setLogged } from '../reducers/authentication'

import {
  setActualClient,
  setInitialState as setClientState
} from '../reducers/clients'
import {
  setActualEmployee,
  setInitialState as setEmployeeState
} from '../reducers/employees'
import { setInitialState as setConfigState } from '../reducers/config'
import {
  setActualExpense,
  setInitialState as setExpenseState
} from '../reducers/expenses'
import {
  setActualIncome,
  setInitialState as setIncomeState
} from '../reducers/incomes'
import {
  setActualInventoryInput,
  setInitialState as setInventoryInputState
} from '../reducers/inventoryInputs'
import {
  setActualInventoryOutput,
  setInitialState as setInventoryOutputState
} from '../reducers/inventoryOutputs'
import {
  setActualOrder,
  setInitialState as setOrderState
} from '../reducers/orders'
import {
  setActualProduct,
  setInitialState as setProductState
} from '../reducers/products'
import {
  setActualProvider,
  setInitialState as setProviderState
} from '../reducers/providers'
import {
  setActualRawMaterial,
  setInitialState as setrawMaterialState
} from '../reducers/rawMaterials'

export const useLogOut = () => {
  const dispatch = useDispatch()

  const logOutUser = () => {
    const response = logOut()
    if (response) {
      dispatch(setLogged(false))

      dispatch(setClientState([]))
      dispatch(setActualClient({}))

      dispatch(setEmployeeState([]))
      dispatch(setActualEmployee({}))

      dispatch(
        setConfigState({
          orderNumber: 0,
          inventoryInputNumber: 0,
          inventoryOutputNumber: 0,
          incomeNumber: 0,
          expenseNumber: 0
        })
      )

      dispatch(setExpenseState([]))
      dispatch(setActualExpense({}))

      dispatch(setIncomeState([]))
      dispatch(setActualIncome({}))

      dispatch(setInventoryInputState([]))
      dispatch(setActualInventoryInput({}))

      dispatch(setInventoryOutputState([]))
      dispatch(setActualInventoryOutput({}))

      dispatch(setOrderState([]))
      dispatch(setActualOrder({}))

      dispatch(setProductState([]))
      dispatch(setActualProduct({}))

      dispatch(setProviderState([]))
      dispatch(setActualProvider({}))

      dispatch(setrawMaterialState([]))
      dispatch(setActualRawMaterial({}))
    }
  }

  return { logOutUser }
}
