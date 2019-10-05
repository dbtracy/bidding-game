import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter, Link } from 'react-router-dom'

import Root from './components/root'

render(
  <BrowserRouter>
    <div className="bg">
      <Root />
    </div>
  </BrowserRouter>,
  document.getElementById('main')
)
