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
import RecipesInProgress from './pages/RecipesInProgress';

function App() {
  return (
    <Switch>
      <Route path="/drinks/:id/in-progress" component={ RecipesInProgress } />
      <Route path="/meals/:id/in-progress" component={ RecipesInProgress } />

      <Route path="/drinks/:id" component={ DrinkPage } />
      <Route path="/meals/:id" exact component={ MealPage } />

      <Route path="/drinks" component={ Drinks } />
      <Route path="/meals" component={ Meals } />

      <Route path="/done-recipes" component={ DoneRecipes } />
      <Route path="/favorite-recipes" component={ FavoriteRecipes } />
      <Route path="/profile" component={ Profile } />
      <Route path="/" exact component={ Login } />
    </Switch>
  );
}

export default App;
