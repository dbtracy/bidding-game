import React from 'react'
import { render } from 'react-dom'
import { Switch, Route, Redirect } from 'react-router'
import { BrowserRouter, Link } from 'react-router-dom'
import { Provider } from 'react-redux'

import store from './store'
import { Root } from './components/root/root'

render(
  <Provider store={store}>
    <BrowserRouter>
      <div className="bg">
        <Switch>
          <Route exact path="/" component={Root} />
          {/* <Route exact path="/scores" component={Scores} /> */}
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>,
  document.getElementById('main')
)
