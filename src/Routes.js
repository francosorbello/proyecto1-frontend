import React from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Dashboard from './components/Dashboard'


function Routes() {
  const loggedIn = true;
  return (
    <div>
      <BrowserRouter>
        <Switch>
            {/* TODO: implementar login */}
            <Route path="/"> {loggedIn ? <Dashboard/> : <h1>Logeate</h1>} </Route>
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default Routes
