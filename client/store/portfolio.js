import axios from 'axios'
import history from '../history'
import me from './user'

/**
 * ACTION TYPES
 */
const GET_PORTFOLIO = 'GET_PORTFOLIO'

/**
 * ACTION CREATORS
 */
const getPortfolio = portfolio => ({type: GET_PORTFOLIO, portfolio})

/**
 * THUNK CREATORS
 */
export const getPortfolioThunk = () => async dispatch => {
  try {
    // pass the cookies to the api
    const res = await axios.get('/api/stocks', {withCredentials: true})
    dispatch(getPortfolio(res.data))
  } catch (err) {
    console.error(err)
  }
}

export const buyStockThunk = data => async dispatch => {
  try {
    // pass the cookies to the api
    await axios.post('/api/transactions', data, {withCredentials: true})
    dispatch(getPortfolioThunk())
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = {}, action) {
  switch (action.type) {
    case GET_PORTFOLIO:
      return {...state, portfolio: action.portfolio}
    default:
      return state
  }
}
