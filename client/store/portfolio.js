import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const BUY_STOCK = 'BUY_STOCK'
const GET_PORTFOLIO = 'GET_PORTFOLIO'

/**
 * ACTION CREATORS
 */
const buyStock = () => ({type: BUY_STOCK})
const getPortfolio = portfolio => ({type: GET_PORTFOLIO, portfolio})

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

export const getPortfolioThunk = () => async dispatch => {
  try {
    // pass the cookies to the api
    const res = await axios.get('/api/stocks', {withCredentials: true})
    console.log(res.data)
    dispatch(getPortfolio(res.data))
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
    case GET_PORTFOLIO:
      return {...state, portfolio: action.portfolio}
    default:
      return state
  }
}
