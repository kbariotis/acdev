export const REQUEST_CURRENCIES = 'REQUEST_CURRENCIES'
export const RECEIVE_CURRENCIES = 'RECEIVE_CURRENCIES'

export const requestCurrencies = () => ({
  type: REQUEST_CURRENCIES
})

export const receiveCurrencies = (json, total) => ({
  type: RECEIVE_CURRENCIES,
  data: json,
  total,
})

const fetchCurrencies = (page) => dispatch => {
  dispatch(requestCurrencies())
  const url = `http://localhost:3000/currencies`
  const pageQuery = page && page !== 1 ? `?page=${page}` : '';
  return fetch(`${url}${pageQuery}`)
    .then(response => response.json())
    .then(json => dispatch(receiveCurrencies(json.data, json.total)))
}

const shouldFetchCurrencies = (state, fields) => {
  if (state.currencies.isFetching) {
    return false
  } else {
    return true
  }
}

export const fetchCurrenciesIfNeeded = () => (dispatch, getState) => {
  const state = getState();
  if (shouldFetchCurrencies(state)) {
    return dispatch(fetchCurrencies())
  }
}

export const changePage = (page) => (dispatch, getState) => {
  return dispatch(fetchCurrencies(page))
}
