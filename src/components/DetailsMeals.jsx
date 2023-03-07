import { useEffect } from 'react';

export function DetailsMeals() {
  const fetchDetailsMeals = async (recipeId) => {
    const apiDetailsRecipes = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`;
    const response = await fetch(apiDetailsRecipes);
    const json = await response.json();
    console.log(json);
    return Promise.resolve(json);
  };

  useEffect(() => {
    fetchDetailsMeals();
  }, []);

  return (
    <div>

      <img
        src=""
        alt="meal"
        data-testid="recipe-photo"
      />

      <h2 data-testid="recipe-title">Title-Meal</h2>

      <h3 data-testid="recipe-category">Category</h3>

      <p data-testid={ `${index}-ingredient-name-and-measure` }>Ingredients</p>

      <p data-testid="instructions">Instructions</p>

      <iframe
        width="420"
        height="315"
        src="https://www.youtube.com/embed/tgbNymZ7vqY?playlist=tgbNymZ7vqY&loop=1"
        title="YT"
      >
        Video
      </iframe>

    </div>
  );
}
