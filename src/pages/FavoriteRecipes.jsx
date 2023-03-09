import React from 'react';
import Header from '../components/Header';
import FavoriteRecipesCard from '../components/FavoriteRecipesCard';
import FilterDonePag from '../components/FilterDonePag';

function FavoriteRecipes() {
  const array = [0, 1, 2];
  return (
    <div>
      <Header
        title="Favorite Recipes"
        haveSearch={ false }
      />
      <FilterDonePag />
      {array.map((number) => <FavoriteRecipesCard index={ number } key={ number } />)}
    </div>
  );
}

export default FavoriteRecipes;
