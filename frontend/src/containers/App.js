import React from 'react'
import { withRouter } from 'react-router'

import { Menu, Container } from 'semantic-ui-react'
import Currencies from './Currencies'
import Portfolios from './Portfolios'
import CreatePortfolio from './CreatePortfolio'

import {
  Route,
} from 'react-router-dom'

const App = ({history,location}) => (
  <Container>
    <Menu>
      <Menu.Item
        name='currencies'
        active={location.pathname === '/'}
        onClick={() => history.push('/')}
      >
        Currencies
      </Menu.Item>
      <Menu.Item
        name='portfolios'
        active={location.pathname.indexOf('portfolios') > -1}
        onClick={() => history.push('/portfolios')}
      >
        Portfolios
      </Menu.Item>
    </Menu>
    <Route exact path="/" component={Currencies}/>
    <Route exact path="/portfolios" component={Portfolios}/>
    <Route path="/portfolios/new" component={CreatePortfolio}/>
  </Container>
)

export default withRouter(App)
