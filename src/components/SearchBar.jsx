import React, { useState, useEffect, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom';
import RecipesContext from '../context/recipesContext';
import { setRecipe } from '../redux/reducers/headerSearch';
import {
  findMealByIngredient,
  findMealByName,
  findMealByFirstLetter,
  findCocktailByIngredient,
  findCocktailByName,
  findCocktailByFirstLetter,
} from '../services/api';
import RecipesDisplay from './RecipesDisplay';

function SearchBar() {
  const { search } = useSelector((state) => state.headerSearch);
  const [checked, setChecked] = useState('');
  const [recipes, setRecipes] = useState([]);
  const { meals, setMeals, drinks, setDrinks } = useContext(RecipesContext);

  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();

  const showResults = async (byIngredient, byName, byFirstLetter) => {
    if (checked === 'ingredient') {
      const data = await byIngredient(search);
      return data;
    }
    if (checked === 'name') {
      const data = await byName(search);
      return data;
    }

    if (search.length > 1) {
      global.alert('Your search must have only 1 (one) character');
      return;
    }
    const data = await byFirstLetter(search);
    return data;
  };

  const handleSearch = async () => {
    const { pathname } = location;
    if (pathname === '/meals') {
      const getResults = await showResults(
        findMealByIngredient,
        findMealByName,
        findMealByFirstLetter,
      );
      if (!getResults) return;
      setMeals({ ...getResults });
    } else {
      const getResults = await showResults(
        findCocktailByIngredient,
        findCocktailByName,
        findCocktailByFirstLetter,
      );
      if (!getResults) return;
      setDrinks({ ...getResults });
    }
  };

  useEffect(() => {
    const receitas = meals?.meals;
    setRecipes(receitas);
  }, [meals]);

  useEffect(() => {
    const receitas = drinks?.drinks;
    setRecipes(receitas);
  }, [drinks]);

  useEffect(() => {
    if (recipes === null) return;

    if (recipes && recipes.length === 1) {
      const { idMeal, idDrink } = recipes[0];
      if (idMeal) {
        history.push(`/meals/${idMeal}`);
      } else {
        history.push(`/drinks/${idDrink}`);
      }
    }
  }, [recipes, history]);

  useEffect(() => {
    if (recipes === null) return;

    if (recipes && recipes.length > 1) {
      dispatch(setRecipe(recipes));
    }
  }, [recipes, dispatch]);

  useEffect(() => {
    if (recipes === null) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }
  }, [recipes]);

  return (
    <div style={ { display: 'flex', flexDirection: 'column' } }>
      <label htmlFor="ingredient-radio">
        Ingredient
        <input
          data-testid="ingredient-search-radio"
          type="radio"
          name="search-radio"
          value="ingredient"
          id="ingredient-radio"
          onChange={ () => setChecked('ingredient') }
        />
      </label>

      <label htmlFor="name-radio">
        Nome da Receita
        <input
          data-testid="name-search-radio"
          type="radio"
          name="search-radio"
          value="name"
          id="name-radio"
          onChange={ () => setChecked('name') }
        />
      </label>

      <label htmlFor="first-letter-radio">
        Primeira Letra
        <input
          data-testid="first-letter-search-radio"
          type="radio"
          name="search-radio"
          value="first-letter"
          id="first-letter-radio"
          onChange={ () => setChecked('first-letter') }
        />
      </label>

      <button
        data-testid="exec-search-btn"
        type="button"
        style={ { width: '100px' } }
        onClick={ handleSearch }
      >
        Buscar
      </button>

      <RecipesDisplay />
    </div>
  );
}

export default SearchBar;
