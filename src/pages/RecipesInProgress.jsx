import React, { useEffect, useState } from 'react';
import { getMealsByID, getDrinksByID } from '../services/api';
import IngredientsCards from '../components/IngredientsCards';

const START_INDEX = -1;
let index = START_INDEX;

function RecipesInProgress() {
  const [recipe, setRecipe] = useState([]);
  const [typeOfRecipe, setTypeOfRecipe] = useState('');
  const { pathname } = window.location;
  const id = pathname.split('/')[2];
  let inProgressRecipes = JSON
    .parse(localStorage.getItem('inProgressRecipes'))
    || { drinks: { 178319: [] }, meals: { 52771: [] } };

  useEffect(() => {
    const kindOfRecipe = pathname.split('/')[1];
    setTypeOfRecipe(kindOfRecipe);

    if (kindOfRecipe === 'meals') {
      const getMeals = async () => {
        const response = await getMealsByID(id);
        console.log(response, 'linha 21');
        setRecipe(response.meals[0]);
      };
      getMeals();
    } else {
      const getDrinks = async () => {
        const response = await getDrinksByID(id);
        setRecipe(response.drinks[0]);
      };
      getDrinks();
    }
    if (!inProgressRecipes[kindOfRecipe]) {
      inProgressRecipes = { ...inProgressRecipes, [kindOfRecipe]: { [id]: [] } };
      localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
    }
  }, [typeOfRecipe]);

  console.log(recipe);

  return (
    <div>
      <button
        type="button"
        data-testid="share-btn"
      >
        Compartilhar
      </button>
      <button
        type="button"
        data-testid="favorite-btn"
      >
        Favoritar
      </button>
      <h1>Receita em progresso</h1>
      {recipe && (
        <div>
          <h2 data-testid="recipe-title">{ recipe.strMeal || recipe.strDrink }</h2>
          <img
            data-testid="recipe-photo"
            src={ recipe.strMealThumb || recipe.strDrinkThumb }
            alt={ recipe.strMeal || recipe.strDrink }
          />
          <h3 data-testid="recipe-category">
            {recipe.strCategory || recipe.strAlcoholic}
          </h3>
          <h2>Instruções</h2>
          <p data-testid="instructions">{recipe.strInstructions}</p>
          <h2>Ingredientes</h2>
          <ul>
            {Object.keys(recipe).map((key) => {
              if (key.includes('Ingredient') && recipe[key]) {
                index += 1;
                return (
                  <li key={ index }>
                    <IngredientsCards
                      index={ index }
                      ingredient={ recipe[key] }
                      id={ id }
                    />
                  </li>
                );
              }
              return null;
            })}
          </ul>
          <button
            type="button"
            data-testid="finish-recipe-btn"
          >
            Finalizar Receita
          </button>
        </div>
      )}
    </div>
  );
}

export default RecipesInProgress;
