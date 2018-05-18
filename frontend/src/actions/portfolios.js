export const REQUEST_PORTFOLIOS = 'REQUEST_PORTFOLIOS'
export const RECEIVE_PORTFOLIO_TOTAL = 'RECEIVE_PORTFOLIO_TOTAL'
export const RECEIVE_PORTFOLIOS = 'RECEIVE_PORTFOLIOS'

export const requestPortfolios = () => ({
  type: REQUEST_PORTFOLIOS
})

export const receivePortfolios = (json, total) => ({
  type: RECEIVE_PORTFOLIOS,
  data: json,
  total,
})

export const receivePortfolioTotal = (portfolioId, total) => ({
  type: RECEIVE_PORTFOLIO_TOTAL,
  portfolioId,
  total,
})

const fetchPortfolios = (page) => dispatch => {
  dispatch(requestPortfolios())
  const url = `http://localhost:3000/portfolios`
  const pageQuery = page && page !== 1 ? `?page=${page}` : '';
  return fetch(`${url}${pageQuery}`)
    .then(response => response.json())
    .then(json => dispatch(receivePortfolios(json.data, json.total)))
    .then(() => dispatch(fetchPortfolioTotalIfNeeded()))
}

const fetchPortfolioTotal = (portfolioId) => dispatch => {
  const url = `http://localhost:3000/portfolios/${portfolioId}/totalValue`
  return fetch(`${url}`)
    .then(response => response.json())
    .then(json => dispatch(receivePortfolioTotal(portfolioId, json.data)))
}

export const createPortfolio = (holdings) => dispatch => {
  const url = `http://localhost:3000/portfolios`

  return fetch(`${url}`, {
    body: JSON.stringify({
      holdings
    }),
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
    method: 'POST',
  })
    .then(response => response.json());
}

const shouldFetchPortfolios = (state) => {
  if (state.portfolios.isFetching) {
    return false
  } else {
    return true
  }
}

const shouldFetchPortfolioTotal = (portfolio) => {
  if (portfolio.total) {
    return false
  } else {
    return true
  }
}

export const fetchPortfoliosIfNeeded = () => (dispatch, getState) => {
  const state = getState();
  if (shouldFetchPortfolios(state)) {
    return dispatch(fetchPortfolios())
  }
}

export const fetchPortfolioTotalIfNeeded = () => async (dispatch, getState) => {
  const state = getState();
  for (const item in state.portfolios.data) {
    if (shouldFetchPortfolioTotal(state.portfolios.data[item])) {
      await dispatch(fetchPortfolioTotal(state.portfolios.data[item].id))
    }
  }
}

export const changePage = (page) => (dispatch, getState) => {
  return dispatch(fetchPortfolios(page))
}
