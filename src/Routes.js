import React from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Dashboard from './components/Dashboard'
import NavBar from './components/NavBar'


function Routes() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
            <Route path="/" component={Dashboard}></Route>
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default Routes
