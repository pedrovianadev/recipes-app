import React from 'react';
import { DetailsDrinks } from '../components/DetailsDrinks';

function DrinkPage() {
  return (
    <div>
      <h1>DrinkPage</h1>
      <DetailsDrinks />
      <button
        data-testid="start-recipe-btn"
        className="Start-Recipe"
      >
        Start Recipe
      </button>
    </div>
  );
}

export default DrinkPage;
