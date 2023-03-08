import React, { useContext } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import DrinkCard from '../components/DrinkCard';
import RecipesContext from '../context/recipesContext';
import { findDrinkByCategory, drinksRequest } from '../services/api';

function Drinks() {
  const { drinks, drinksCategories, setDrinks } = useContext(RecipesContext);
  const slice = 12;
  const sliceCategory = 5;
  const onClick = async (category) => {
    const recipesByCategory = await findDrinkByCategory(category);
    setDrinks(recipesByCategory);
  };
  const onClickAll = async () => {
    const recipesDrinks = await drinksRequest();
    setDrinks(recipesDrinks);
  };
  return (
    <div>
      <Header
        title="Drinks"
        haveSearch
      />
      {drinksCategories.drinks?.length > 0
        ? drinksCategories.drinks.slice(0, sliceCategory).map((category, index) => (
          <button
            key={ index }
            onClick={ () => onClick(category.strCategory) }
            data-testid={ `${category.strCategory}-category-filter` }
          >
            {category.strCategory}
          </button>)) : null}
      <button
        onClick={ () => onClickAll() }
        data-testid="All-category-filter"
      >
        All

      </button>
      {drinks.drinks?.length > 0
        ? drinks.drinks.slice(0, slice).map((drink, index) => (
          <DrinkCard drink={ drink } index={ index } key={ index } />)) : null}

      <Footer />
    </div>
  );
}

export default Drinks;
