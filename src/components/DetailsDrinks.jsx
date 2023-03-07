import { useEffect } from 'react';

export function DetailsDrinks() {
  const fetchDetailDrinks = async (recipeId) => {
    const apiDetailsRecipes = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${recipeId}`;
    const response = await fetch(apiDetailsRecipes);
    const json = await response.json();
    console.log(json);
    return Promise.resolve(json);
  };

  useEffect(() => {
    fetchDetailDrinks();
  }, []);

  return (
    <div>

      <img
        src=""
        alt="drink"
        data-testid="recipe-photo"
      />

      <h2 data-testid="recipe-title">Title-Drinks</h2>

      <h3 data-testid="recipe-category">Category</h3>

      <p data-testid={ `${index}-ingredient-name-and-measure` }>Ingredients</p>

      <p data-testid="instructions">Instructions</p>

    </div>
  );
}
