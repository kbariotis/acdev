import React from 'react'
import PropTypes from 'prop-types'
import { Table } from 'semantic-ui-react'

const Currencies = ({currencies}) => (
  <Table celled>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>ID</Table.HeaderCell>
        <Table.HeaderCell>Name</Table.HeaderCell>
        <Table.HeaderCell>Symbol</Table.HeaderCell>
        <Table.HeaderCell>Price</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
      {currencies.map((c, i) =>
        <Table.Row key={i}>
          <Table.Cell>{c.id}</Table.Cell>
          <Table.Cell>{c.name}</Table.Cell>
          <Table.Cell>{c.symbol}</Table.Cell>
          <Table.Cell>{c.price}</Table.Cell>
        </Table.Row>
      )}
    </Table.Body>
  </Table>
)

Currencies.propTypes = {
  currencies: PropTypes.array.isRequired,
}

export default Currencies
