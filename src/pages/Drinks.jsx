import React, { useContext } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import DrinkCard from '../components/DrinkCard';
import RecipesContext from '../context/recipesContext';

function Drinks() {
  const { drinks, drinksCategories } = useContext(RecipesContext);
  const slice = 12;
  const sliceCategory = 5;
  console.log(drinksCategories);
  return (
    <div>
      <Header
        title="Drinks"
        haveSearch
      />
      {drinksCategories.drinks?.length > 0
        ? drinksCategories.drinks.slice(0, sliceCategory).map((category, index) => (
          <button key={ index } data-testid={ `${category.strCategory}-category-filter` }>
            {category.strCategory}
          </button>)) : null}
      {drinks.drinks?.length > 0
        ? drinks.drinks.slice(0, slice).map((drink, index) => (
          <DrinkCard drink={ drink } index={ index } key={ index } />)) : null}

      <Footer />
    </div>
  );
}

export default Drinks;
