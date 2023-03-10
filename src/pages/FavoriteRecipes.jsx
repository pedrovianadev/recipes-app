import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import FavoriteMealCard from '../components/FavoriteMealCard';
import FavoriteDrinkCard from '../components/FavoriteDrinkCard';
import FilterDonePag from '../components/FilterDonePag';
import { getFavoriteRecipes } from '../services/saveFavoriteRecipes';

function FavoriteRecipes() {
  const [array, setArray] = useState([]);
  const showRecipes = async () => {
    const musics = await getFavoriteRecipes();
    setArray(musics);
  };
  useEffect(
    () => {
      showRecipes();
    },
    [array],
  );
  return (
    <div>
      <Header
        title="Favorite Recipes"
        haveSearch={ false }
      />
      <FilterDonePag />
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
