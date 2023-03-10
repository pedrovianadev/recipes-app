import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import FavoriteRecipesCard from '../components/FavoriteRecipesCard';
import FilterDonePag from '../components/FilterDonePag';
import { getFavoriteRecipes } from '../services/saveFavoriteRecipes';

function FavoriteRecipes() {
  const [array, setArray] = useState([]);
  const showMusics = async () => {
    const musics = await getFavoriteRecipes();
    setArray(musics);
  };
  useEffect(() => {
    showMusics();
  });
  console.log(array);
  return (
    <div>
      <Header
        title="Favorite Recipes"
        haveSearch={ false }
      />
      <FilterDonePag />
      {array.map((recipes, index) => (<FavoriteRecipesCard
        recipe={ recipes }
        index={ index }
        key={ index }
      />))}
    </div>
  );
}

export default FavoriteRecipes;
