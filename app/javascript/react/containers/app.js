import React from 'react'
import { Route, IndexRoute, Router, browserHistory } from 'react-router'

import QuoteContainer from './QuoteContainer'

const App = (props) => {
  return (
    <div>
      <Router history={browserHistory}>
        <Route path='/' component={QuoteContainer}/>
      </Router>
    </div>
  )
}

export default App
