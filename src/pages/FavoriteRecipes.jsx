import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import FavoriteMealCard from '../components/FavoriteMealCard';
import FavoriteDrinkCard from '../components/FavoriteDrinkCard';
import { getFavoriteRecipes } from '../services/saveFavoriteRecipes';

function FavoriteRecipes() {
  const [array, setArray] = useState([]);
  const [filter, setFilter] = useState({
    meal: false,
    drink: false,
    all: true,
  });

  useEffect(
    () => {
      const showRecipes = () => {
        const recipes = getFavoriteRecipes();
        if (filter.all === true) {
          setArray(recipes);
        } else if (filter.meal === true) {
          const filterMeal = recipes.filter((recipe) => recipe.type === 'meal');
          setArray(filterMeal);
        } else if (filter.drink === true) {
          const filterDrink = recipes.filter((recipe) => recipe.type === 'drink');
          setArray(filterDrink);
        }
      };
      showRecipes();
    },
    [array, filter],
  );

  const handleMeal = () => {
    setFilter(
      { meal: true,
        drink: false,
        all: false,
      },
    );
  };
  const handleDrink = () => {
    setFilter(
      { meal: false,
        drink: true,
        all: false,
      },
    );
  };
  const handleAll = () => {
    setFilter(
      { meal: false,
        drink: false,
        all: true,
      },
    );
  };
  return (
    <div>
      <Header
        title="Favorite Recipes"
        haveSearch={ false }
      />
      <button data-testid="filter-by-all-btn" onClick={ handleAll }>All</button>
      <button data-testid="filter-by-meal-btn" onClick={ handleMeal }>Meals</button>
      <button data-testid="filter-by-drink-btn" onClick={ handleDrink }>Drinks</button>
      {array.map((recipes, index) => (
        recipes.type === 'meal'
          ? (
            <FavoriteMealCard
              recipe={ recipes }
              index={ index }
              key={ index }
            />
          )
          : (
            <FavoriteDrinkCard
              recipe={ recipes }
              index={ index }
              key={ index }
            />
          )
      ))}
    </div>
  );
}

export default FavoriteRecipes;
