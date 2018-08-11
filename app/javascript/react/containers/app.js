import React from 'react'
import { Route, IndexRoute, Router, browserHistory } from 'react-router'

import FetchedQuoteContainer from './FetchedQuoteContainer'

const App = (props) => {
  return (
    <div>
      <Router history={browserHistory}>
        <Route path='/' component={FetchedQuoteContainer}/>
      </Router>
    </div>
  )
}

export default App
