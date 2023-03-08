import React, { useContext, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MealCard from '../components/MealCard';
import RecipesContext from '../context/recipesContext';
import { findMealByCategory, mealsRequest } from '../services/api';

function Meals() {
  const { meals, mealsCategories, setMeals } = useContext(RecipesContext);
  const slice = 12;
  const sliceCategory = 5;
  const [categoria, setcategoria] = useState({
    Beef: false,
    Breakfast: false,
    Chicken: false,
    Dessert: false,
    Goat: false,
  });
  const onClick = async (category) => {
    const recipesByCategory = await findMealByCategory(category);
    const recipesMeals = await mealsRequest();
    const updatedCategoria = {};
    Object.keys(categoria).forEach((key) => {
      updatedCategoria[key] = false;
    });
    updatedCategoria[category] = true;
    setMeals(categoria[category] === false ? recipesByCategory : recipesMeals);
    setcategoria(updatedCategoria);
  };
  const onClickAll = async () => {
    const recipesMeals = await mealsRequest();
    setMeals(recipesMeals);
  };
  return (
    <div>
      <Header
        title="Meals"
        haveSearch
      />
      {mealsCategories.meals?.length > 0
        ? mealsCategories.meals.slice(0, sliceCategory).map((category, index) => (
          <button
            onClick={ () => onClick(category.strCategory) }
            key={ index }
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
      {meals.meals?.length > 0
        ? meals.meals.slice(0, slice).map((meal, index) => (
          <MealCard meal={ meal } index={ index } key={ index } />)) : null}

      <Footer />
    </div>
  );
}

export default Meals;
