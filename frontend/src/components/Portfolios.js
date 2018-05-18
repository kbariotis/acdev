import React from 'react'
import PropTypes from 'prop-types'
import { Loader, Table } from 'semantic-ui-react'

const Portfolios = ({portfolios}) => (
  <Table celled>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>ID</Table.HeaderCell>
        <Table.HeaderCell>Total Value</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
      {portfolios.map((p, i) =>
        <Table.Row key={i}>
          <Table.Cell>{p.id}</Table.Cell>
          <Table.Cell>{p.totalPrice ? p.totalPrice : (<Loader active inline />)}</Table.Cell>
        </Table.Row>
      )}
    </Table.Body>
  </Table>
)

Portfolios.propTypes = {
  portfolios: PropTypes.array.isRequired,
}

export default Portfolios
