import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom'
import { Switch, Route } from 'react-router-dom'

import Home from '../Home/Home';

const Routes = () => (
  <Switch>
    <Route exact path='/' component={ Home }/>
  </Switch>
)

class App extends Component {
  render(props) {
    return (
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    );
  }
}

export default App;
