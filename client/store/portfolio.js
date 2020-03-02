import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const BUY_STOCK = 'BUY_STOCK'

/**
 * ACTION CREATORS
 */
const buyStock = () => ({type: BUY_STOCK})

/**
 * THUNK CREATORS
 */
export const buyStockThunk = data => async dispatch => {
  try {
    // pass the cookies to the api
    await axios.post('/api/transactions', data, {withCredentials: true})
    dispatch(buyStock())
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = {}, action) {
  switch (action.type) {
    case BUY_STOCK:
      return state
    default:
      return state
  }
}
