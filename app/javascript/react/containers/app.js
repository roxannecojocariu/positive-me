import React from 'react'
import { Route, IndexRoute, Router, browserHistory } from 'react-router'

import HappyQuoteContainer from './HappyQuoteContainer'

const App = (props) => {
  return (
    <div>
      <Router history={browserHistory}>
        <Route path='/'>
          <Route path='/happy_quotes' component={HappyQuoteContainer}/>
        </Route>
      </Router>
    </div>
  )
}

export default App
