import { useEffect, useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';
import { RecommendationCard } from './RecommendationCard';

export function DetailsMeals() {
  const [recipeDetails, setRecipeDetails] = useState({});
  const [urlVideo, setUrlVideo] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [measures, setMeasures] = useState([]);
  const [stateDrinks, setStateDrinks] = useState([]);
  const [mostrarMensagem, setMostrarMensagem] = useState(false);

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

  const fetchApiDrinks = useCallback(async () => {
    const apiDrinks = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
    const response = await fetch(apiDrinks);
    const json = await response.json();
    const arrayDrinks = json.drinks;
    setStateDrinks(arrayDrinks);
    return Promise.resolve(arrayDrinks);
  }, []);

  function copyToClipboard() {
    const textToCopy = window.location.href;
    navigator.clipboard.writeText(textToCopy).then(() => {
      console.log('String copiada para o clipboard');
    }).catch((err) => {
      console.error('Falha ao copiar a string para o clipboard', err);
    });
    setMostrarMensagem(true);
  }

  useEffect(() => {
    fetchDetailsMeals();
    fetchApiDrinks();
  }, [fetchDetailsMeals, fetchApiDrinks]);

  return (
    <div>
      <button data-testid="share-btn" onClick={ copyToClipboard }>Compartilhar</button>
      <button data-testid="favorite-btn">Favorite</button>
      {mostrarMensagem && <div>Link copied!</div>}
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

      <RecommendationCard stateDrinksOrMeals={ stateDrinks } />

    </div>
  );
}
