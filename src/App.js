import React from 'react';
import { Switch, Route } from 'react-router-dom';
import drinks from './pages/drinks';
import meals from './pages/meals';
import test from './pages/test';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ test } />
      <Route exact path="/meals" component={ meals } />
      <Route exact path="/drinks" component={ drinks } />
    </Switch>
  );
}

export default App;
