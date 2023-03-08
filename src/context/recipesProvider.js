import PropTypes from 'prop-types';
import React, { useEffect, useMemo, useState } from 'react';
import RecipesContext from './recipesContext';
import { mealsRequest, drinksRequest,
  mealsCategory, drinksCategory } from '../services/api';

export default function RecipesProvider({ children }) {
  const [meals, setMeals] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [mealsCategories, setMealsCategories] = useState([]);
  const [drinksCategories, setDrinksCategories] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const recipesMeals = await mealsRequest();
      setMeals(recipesMeals);
      const recipesDrinks = await drinksRequest();
      setDrinks(recipesDrinks);
      const mealsCat = await mealsCategory();
      setMealsCategories(mealsCat);
      const drinksCat = await drinksCategory();
      setDrinksCategories(drinksCat);
    };
    fetch();
  }, []);

  const value = useMemo(() => ({
    meals,
    setMeals,
    drinks,
    setDrinks,
    mealsCategories,
    setMealsCategories,
    drinksCategories,
    setDrinksCategories,
  }), [meals, drinks, mealsCategories, drinksCategories]);

  return (
    <RecipesContext.Provider value={ value }>
      <span>{ children }</span>
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.any,
}.isRequired;
