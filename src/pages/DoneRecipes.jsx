import React from 'react';
import Header from '../components/Header';
import FilterDonePag from '../components/FilterDonePag';
import DoneRecipesCard from '../components/DoneRecipesCard';

function DoneRecipes() {
  /* const recipesDone = localStorage.getItem(doneRecipes); */
  const array = [0, 1, 2];
  return (
    <div>
      <Header
        title="Done Recipes"
        haveSearch={ false }
      />
      <FilterDonePag />
      {array.map((number) => <DoneRecipesCard index={ number } key={ number } />)}
    </div>
  );
}

export default DoneRecipes;
