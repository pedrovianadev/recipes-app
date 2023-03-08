import React, { useContext } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MealCard from '../components/MealCard';
import RecipesContext from '../context/recipesContext';

function Meals() {
  const { meals, mealsCategories } = useContext(RecipesContext);
  const slice = 12;
  const sliceCategory = 5;
  return (
    <div>
      <Header
        title="Meals"
        haveSearch
      />
      {mealsCategories.meals?.length > 0
        ? mealsCategories.meals.slice(0, sliceCategory).map((category, index) => (
          <button key={ index } data-testid={ `${category.strCategory}-category-filter` }>
            {category.strCategory}
          </button>)) : null}
      {meals.meals?.length > 0
        ? meals.meals.slice(0, slice).map((meal, index) => (
          <MealCard meal={ meal } index={ index } key={ index } />)) : null}

      <Footer />
    </div>
  );
}

export default Meals;
