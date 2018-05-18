import { combineReducers } from 'redux'
import {
  REQUEST_CURRENCIES,
  RECEIVE_CURRENCIES
} from '../actions/currencies'
import {
  REQUEST_PORTFOLIOS,
  RECEIVE_PORTFOLIO_TOTAL,
  RECEIVE_PORTFOLIOS
} from '../actions/portfolios'

const portfolios = (state = {
  isFetching: false,
  currentPage: 1,
  total: 0,
  data: []
}, action) => {
  switch (action.type) {
    case REQUEST_PORTFOLIOS:
      return {
        ...state,
        currentPage: action.page,
        isFetching: true,
      }
    case RECEIVE_PORTFOLIOS:
      return {
        ...state,
        isFetching: false,
        total: action.total,
        data: action.data
      }
    case RECEIVE_PORTFOLIO_TOTAL:
      return {
        ...state,
        data: state.data.reduce((initial, current, index) => {
          if (current.id === action.portfolioId) {
            initial.push(Object.assign({}, current, {totalPrice: action.total}))
          } else {
            initial.push(current)
          }

          return initial;
        }, [])
      }
    default:
      return state
  }
}

const currencies = (state = {
  isFetching: false,
  currentPage: 1,
  total: 0,
  data: []
}, action) => {
  switch (action.type) {
    case REQUEST_CURRENCIES:
      return {
        ...state,
        currentPage: action.page,
        isFetching: true,
      }
    case RECEIVE_CURRENCIES:
      return {
        ...state,
        isFetching: false,
        total: action.total,
        data: action.data
      }
    default:
      return state
  }
}

const rootReducer = combineReducers({
  currencies,
  portfolios,
})

export default rootReducer
