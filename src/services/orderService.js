import axios from 'axios'

const orderInstance = axios.create({
  baseURL: `${process.env.REACT_APP_DATA_API}/order`,
  // timeout: 10000,
  headers: { 'x-access-token': localStorage.getItem('token') }
})

const getAllOrders = async () => {
  try {
    const orders = await orderInstance.get('/')
    return orders.data
  } catch (err) {
    console.error(err)
  }
}

const getOneOrder = data => {}

const changeStateForward = data => {
    try {
        return orderInstance.put(`/changeStateFordward`, data)
    } catch (err) {
        console.error(err)
    }
}

const changeStateBackward = data => {
    try {
        return orderInstance.put(`/changeStateBackward`, data)
    } catch (err) {
        console.error(err)
    }
}

const createOrder = data => {
  try {
    return orderInstance.post('/', data)
  } catch (err) {
    console.error(err)
  }
}

const updateOrder = data => {
  try {
    return orderInstance.put(`/update`, data)
  } catch (err) {
    console.error(err)
  }
}

const deleteOrder = data => {
  try {
    return orderInstance.put(`/delete`, data)
  } catch (err) {
    console.error(err)
  }
}

export {
  getAllOrders,
  getOneOrder,
  createOrder,
  updateOrder,
  deleteOrder,
  changeStateForward,
  changeStateBackward
}
