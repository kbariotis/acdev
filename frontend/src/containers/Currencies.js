import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchCurrenciesIfNeeded,changePage } from '../actions/currencies'
import CurrenciesTable from '../components/Currencies'
import {Pagination} from 'semantic-ui-react';

class Currencies extends Component {
  static propTypes = {
    currencies: PropTypes.object.isRequired,
    isFetching: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(fetchCurrenciesIfNeeded())
  }

  handlePageChange = (event, selectedPage) => {
    this.props.dispatch(changePage(selectedPage.activePage))
  }

  render() {
    const { total, currentPage, data, isFetching } = this.props
    const isEmpty = data.length === 0
    return (
      <div>
        {isEmpty
          ? (isFetching ? <h2>Loading...</h2> : <h2>Empty.</h2>)
          : <div style={{ opacity: isFetching ? 0.5 : 1 }}>
              <CurrenciesTable currencies={data} />
              <Pagination
                onPageChange={this.handlePageChange}
                activePage={currentPage}
                totalPages={parseInt(total/50, 10)}
              />
            </div>
        }
      </div>
    )
  }
}

const mapStateToProps = state => {

  return {
    ...state.currencies
  }
}

export default connect(mapStateToProps)(Currencies)
