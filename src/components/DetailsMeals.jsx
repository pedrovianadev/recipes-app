import { useEffect, useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';

export function DetailsMeals() {
  const [recipeDetails, setRecipeDetails] = useState({});
  const [urlVideo, setUrlVideo] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [measures, setMeasures] = useState([]);

  const { id } = useParams();

  const handleIngredients = (detailsObj) => {
    const getIngredients = Object.entries(detailsObj);
    const filteredIngredients = getIngredients
      .filter(([key, value]) => {
        if (key.includes('strIngredient') && value) {
          return value;
        }
        return false;
      });
    const arrIngredients = filteredIngredients.map((array) => array[1]);
    setIngredients(arrIngredients);

    const getMeasures = getIngredients
      .filter(([key, value]) => key.includes('strMeasure') && value !== ' ');
    const arrMeasures = getMeasures.map((array) => array[1]);
    setMeasures(arrMeasures);
  };

  const fetchDetailsMeals = useCallback(async () => {
    const apiDetailsRecipes = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    const response = await fetch(apiDetailsRecipes);
    const json = await response.json();
    const detailsObj = json.meals[0];
    setRecipeDetails(detailsObj);
    const urlRecipe = detailsObj.strYoutube.split('=')[1];
    const urlYouTube = `https://www.youtube.com/embed/${urlRecipe}`;
    setUrlVideo(urlYouTube);
    handleIngredients(detailsObj);
    return Promise.resolve(detailsObj);
  }, [id]);

  useEffect(() => {
    fetchDetailsMeals();
  }, [fetchDetailsMeals]);

  return (
    <div>

      <img
        src={ recipeDetails.strMealThumb }
        alt="meal"
        data-testid="recipe-photo"
      />

      <h2 data-testid="recipe-title">{ recipeDetails.strMeal }</h2>

      <h3 data-testid="recipe-category">{ recipeDetails.strCategory }</h3>

      {ingredients
        .map((ingredient, index) => (
          <p key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
            {`${ingredient} ${measures[index]}`}
          </p>
        ))}

      <p data-testid="instructions">{ recipeDetails.strInstructions }</p>

      <iframe
        width="420"
        height="315"
        src={ urlVideo }
        title="YT"
        data-testid="video"
      />

    </div>
  );
}
