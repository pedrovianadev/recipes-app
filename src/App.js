import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Switch, Route } from 'react-router-dom';
import { Login } from './pages/Login';
import Meals from './pages/Meals';
import Drinks from './pages/Drinks';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import DrinkPage from './pages/DrinkPage';
import MealPage from './pages/MealPage';

function App() {
  return (
    <Switch>
      <Route path="/" exact component={ Login } />
      <Route path="/meals" exact component={ Meals } />
      <Route path="/drinks" exact component={ Drinks } />
      <Route path="/profile" exact component={ Profile } />
      <Route path="/done-recipes" exact component={ DoneRecipes } />
      <Route path="/favorite-recipes" exact component={ FavoriteRecipes } />
      <Route path="/drinks/:id" exact component={ DrinkPage } />
      <Route path="/meals/:id" exact component={ MealPage } />
    </Switch>
  );
}

export default App;
