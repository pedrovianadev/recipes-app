import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { RecommendationCard } from './RecommendationCard';
import { addRecipe, removeRecipe } from '../services/saveFavoriteRecipes';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

export function DetailsDrinks() {
  const [drinkDetails, setDrinkDetails] = useState({});
  const [ingredients, setIngredients] = useState([]);
  const [measures, setMeasures] = useState([]);
  const [stateMeals, setStateMeals] = useState([]);
  const [mostrarMensagem, setMostrarMensagem] = useState(false);
  const { id } = useParams();

  const checkFavorit = () => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    return favoriteRecipes?.some((element) => element.id === id);
  };

  const [favorited, setFavorited] = useState(checkFavorit());

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
      .filter(([key, value]) => key.includes('strMeasure') && value !== null);
    const arrMeasures = getMeasures.map((array) => array[1]);
    setMeasures(arrMeasures);
  };

  const fetchDetailDrinks = useCallback(async () => {
    const apiDetailsRecipes = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
    const response = await fetch(apiDetailsRecipes);
    const json = await response.json();
    const detailsObj = json.drinks[0];
    setDrinkDetails(detailsObj);
    handleIngredients(detailsObj);
    return Promise.resolve(detailsObj);
  }, [id]);

  const fetchApiMeals = async () => {
    const apiMeals = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    const response = await fetch(apiMeals);
    const json = await response.json();
    const arrayMeals = json.meals;
    setStateMeals(arrayMeals);
    return Promise.resolve(arrayMeals);
  };

  function copyToClipboard() {
    const textToCopy = window.location.href;
    navigator.clipboard.writeText(textToCopy).then(() => {
      console.log('String copiada para o clipboard');
    }).catch((err) => {
      console.error('Falha ao copiar a string para o clipboard', err);
    });
    setMostrarMensagem(true);
  }

  const recipe = {
    id: drinkDetails.idDrink,
    type: 'drink',
    nationality: '',
    category: drinkDetails.strCategory,
    alcoholicOrNot: drinkDetails.strAlcoholic,
    name: drinkDetails.strDrink,
    image: drinkDetails.strDrinkThumb,
  };

  const favorite = async () => {
    if (favorited) {
      await removeRecipe(recipe);
    } else {
      await addRecipe(recipe);
    }
    setFavorited((prevState) => !prevState);
  };

  useEffect(() => {
    fetchDetailDrinks();
    fetchApiMeals();
  }, [fetchDetailDrinks]);

  return (
    <div>
      <button data-testid="share-btn" onClick={ copyToClipboard }>Compartilhar</button>
      <button
        data-testid="favorite-btn"
        onClick={ favorite }
        src={ favorited ? blackHeartIcon : whiteHeartIcon }
      >
        Favorite
        <img src={ favorited ? blackHeartIcon : whiteHeartIcon } alt="" />
      </button>
      {mostrarMensagem && <div>Link copied!</div>}
      <img
        src={ drinkDetails.strDrinkThumb }
        alt="drink"
        data-testid="recipe-photo"
      />

      <h2 data-testid="recipe-title">{drinkDetails.strDrink}</h2>

      <h3 data-testid="recipe-category">{drinkDetails.strAlcoholic}</h3>

      {ingredients
        .map((ingredient, index) => (
          <p key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
            {`${ingredient} ${measures[index] ? measures[index] : ''}`}
          </p>
        ))}

      <p data-testid="instructions">{drinkDetails.strInstructions}</p>

      <RecommendationCard stateDrinksOrMeals={ stateMeals } />

    </div>
  );
}
