import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchCurrenciesIfNeeded } from '../actions/currencies'
import { createPortfolio } from '../actions/portfolios'
import { Container, Table, Input, Button, Dropdown } from 'semantic-ui-react'
import { withRouter } from 'react-router'

class CreatePortfolio extends Component {
  static propTypes = {
    currencies: PropTypes.object.isRequired,
    isFetching: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)

    this.state = {
      quantity: 1,
      currencyId: null,
      holdings: [],
    }
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(fetchCurrenciesIfNeeded())
  }

  handleQuantityChange(event, change) {
    if (Number.isInteger(parseInt(change.value, 10))) {
      this.setState({
        quantity: change.value
      })
    }
  }

  selectCurrency(event, change) {
    this.setState({
      currencyId: change.value,
    })
  }

  add() {
    this.setState({
      id: null,
      quantity: 1,
      holdings: this.state.holdings.concat([{
        id: this.state.currencyId,
        quantity: this.state.quantity,
        price: this.state.quantity * this.getCurrencyById(this.state.currencyId).price
      }])
    })
  }

  getCurrencyById(id) {
    return this.props.data.filter(d => d.id === id)[0]
  }

  create() {
    this.props
      .dispatch(createPortfolio(this.state.holdings))
      .then(() => this.props.history.push('/portfolios'))
  }

  render() {
    const { data, isFetching } = this.props
    const isEmpty = data.length === 0
    return (
      <div>
        <Table celled striped>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell colSpan='3'>Holdings</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            <Table.Row>
              <Table.Cell>
                {isEmpty
                  ? (isFetching ? <strong>Loading...</strong> : <strong>Empty.</strong>)
                  : <div style={{ opacity: isFetching ? 0.5 : 1 }}>
                      <Dropdown
                        placeholder='State'
                        fluid
                        search
                        selection
                        value={this.state.currencyId}
                        onChange={this.selectCurrency.bind(this)}
                        options={data.map((currency, i) => ({
                          value: currency.id,
                          text: `${currency.name} - ${currency.price}`,
                          key: i
                        }))} />
                    </div>
                }
              </Table.Cell>
              <Table.Cell>
                <Input
                  placeholder='Quantity'
                  value={this.state.quantity}
                  onChange={this.handleQuantityChange.bind(this)}
                  />
              </Table.Cell>
              <Table.Cell>
                <Button
                  onClick={this.add.bind(this)}
                  >
                  Add
                </Button>
              </Table.Cell>
            </Table.Row>
            {this.state.holdings && this.state.holdings.map((holding, i) =>
              <Table.Row key={i}>
                <Table.Cell>{this.getCurrencyById(holding.id).symbol}</Table.Cell>
                <Table.Cell>{holding.quantity}</Table.Cell>
                <Table.Cell textAlign='right'>{holding.price}</Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
          <Table.Footer>
            <Table.Row>
              <Table.HeaderCell colSpan={2} textAlign='right'>Total</Table.HeaderCell>
              <Table.HeaderCell textAlign='right'>
                {this.state.holdings && this.state.holdings.reduce((initial, current) => initial + current.price , 0)}
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        </Table>
        <Container textAlign='right'>
          <Button
            primary
            disabled={!this.state.holdings.length}
            onClick={this.create.bind(this)}
            >
            Create
          </Button>
        </Container>
      </div>
    )
  }
}

const mapStateToProps = state => {

  return {
    ...state.currencies
  }
}

export default connect(mapStateToProps)(withRouter(CreatePortfolio))
