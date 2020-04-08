import React from 'react'
import { render } from 'react-dom'
import { Switch, Route, Redirect } from 'react-router'
import { BrowserRouter, Link } from 'react-router-dom'

import { GamePlay } from './components/GamePlay/GamePlay'
import { Setup } from './components/Setup/Setup'
import { Frame } from './components/Frame/Frame'

render(
  <BrowserRouter>
    <div className="bg">
      <Switch>
        <Route exact path="/game" component={GamePlay} />
        <Route exact path="/" component={Frame} />
      </Switch>
    </div>
  </BrowserRouter>,
  document.getElementById('main')
)
