import React from 'react'
import { Route, IndexRoute, Router, browserHistory } from 'react-router'

import FetchedQuoteContainer from './FetchedQuoteContainer'
import QuoteContainer from './QuoteContainer'
import QuoteFormContainer from './QuoteFormContainer'

const App = (props) => {
  return (
    <div>
      <Router history={browserHistory}>
        <Route path='/' component={FetchedQuoteContainer} />
        <Route path='/quotes' component={QuoteContainer} />
        <Route path='/quotes/new' component={QuoteFormContainer} />
      </Router>
    </div>
  )
}

export default App
