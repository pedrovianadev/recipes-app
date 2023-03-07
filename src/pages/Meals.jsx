import React, { useContext } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MealCard from '../components/MealCard';
import RecipesContext from '../context/recipesContext';

function Meals() {
  const { meals } = useContext(RecipesContext);
  const slice = 12;
  return (
    <div>
      <Header
        title="Meals"
        haveSearch
      />
      {meals.meals?.length > 0
        ? meals.meals.slice(0, slice).map((meal, index) => (
          <MealCard meal={ meal } index={ index } key={ index } />)) : null}

      <Footer />
    </div>
  );
}

export default Meals;
