import React from 'react';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Switch, Route } from 'react-router-dom';
import { Login } from './page/Login';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/meals" component={ Recipes } />
    </Switch>
  );
}

export default App;
