import PropTypes from 'prop-types';
import React, { useEffect, useMemo, useState } from 'react';
import RecipesContext from './recipesContext';
import { mealsRequest, drinksRequest } from '../services/api';

export default function RecipesProvider({ children }) {
  const [meals, setMeals] = useState([]);
  const [drinks, setDrinks] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const recipesMeals = await mealsRequest();
      setMeals(recipesMeals);
      const recipesDrinks = await drinksRequest();
      setDrinks(recipesDrinks);
    };
    fetch();
  }, []);

  const value = useMemo(() => ({
    meals,
    setMeals,
    drinks,
    setDrinks,
  }), [meals, drinks]);

  return (
    <RecipesContext.Provider value={ value }>
      <span>{ children }</span>
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.any,
}.isRequired;
