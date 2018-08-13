import React from 'react'
import { Route, IndexRoute, Router, browserHistory } from 'react-router'

import FetchedQuoteContainer from './FetchedQuoteContainer'
import QuoteContainer from './QuoteContainer'

const App = (props) => {
  return (
    <div>
      <Router history={browserHistory}>
        <Route path='/' component={FetchedQuoteContainer} />
        <Route path='/quotes' component={QuoteContainer} />
      </Router>
    </div>
  )
}

export default App
