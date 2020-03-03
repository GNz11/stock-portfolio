import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_TRANSACTIONS = 'GET_TRANSACTIONS'

/**
 * ACTION CREATORS
 */
const getTransactions = transactions => ({type: GET_TRANSACTIONS, transactions})

/**
 * INITIAL STATE
 */
const initialState = {}

/**
 * THUNK CREATORS
 */
export const getTransactionsThunk = () => async dispatch => {
  try {
    // pass the cookies to the api
    const res = await axios.get('/api/transactions', {withCredentials: true})
    dispatch(getTransactions(res.data))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_TRANSACTIONS:
      return {...state, transactions: action.transactions}
    default:
      return state
  }
}
