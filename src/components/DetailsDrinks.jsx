import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export function DetailsDrinks() {
  const [drinkDetails, setDrinkDetails] = useState({});
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
    console.log(json);
  };

  useEffect(() => {
    fetchDetailDrinks();
    fetchApiMeals();
  }, [fetchDetailDrinks]);

  return (
    <div>

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

    </div>
  );
}
