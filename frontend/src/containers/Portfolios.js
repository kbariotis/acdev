import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import { fetchPortfoliosIfNeeded,changePage } from '../actions/portfolios'
import PortfoliosTable from '../components/Portfolios'
import {Container, Button, Pagination} from 'semantic-ui-react';

class Portfolios extends Component {
  static propTypes = {
    data: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(fetchPortfoliosIfNeeded())
  }

  handlePageChange = (event, selectedPage) => {
    this.props.dispatch(changePage(selectedPage.activePage))
  }

  render() {
    const { total, currentPage, data, isFetching } = this.props
    const isEmpty = data.length === 0
    return (
      <div>
        <Container textAlign='right'>
          <Button
            primary
            onClick={() => this.props.history.push('/portfolios/new')}
            >
            Create
          </Button>
        </Container>
        {isEmpty
          ? (isFetching ? <h2>Loading...</h2> : <h2>Empty.</h2>)
          : <div style={{ opacity: isFetching ? 0.5 : 1 }}>
              <PortfoliosTable portfolios={data} />
              <Pagination
                onPageChange={this.handlePageChange}
                defaultActivePage={currentPage}
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
    ...state.portfolios
  }
}

export default connect(mapStateToProps)(withRouter(Portfolios))
