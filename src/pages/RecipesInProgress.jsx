import React, { useEffect, useState } from 'react';
import { getMealsByID, getDrinksByID } from '../services/api';
import IngredientsCards from '../components/IngredientsCards';
import { addRecipe } from '../services/saveFavoriteRecipes';
import logo from '../images/shareIcon.svg';
import logo2 from '../images/blackHeartIcon.svg';
// Só pra mandar novamente o PR

function RecipesInProgress() {
  const [recipe, setRecipe] = useState([]);
  const [typeOfRecipe, setTypeOfRecipe] = useState('');

  const [mostrarMensagem, setMostrarMensagem] = useState(false);

  function copyToClipboard() {
    const url = window.location.href;
    const id = url.split('/')[4];
    const type = url.split('/')[3];
    const textToCopy = `http://localhost:3000/${type}/${id}`;
    navigator.clipboard.writeText(textToCopy).then(() => {
      console.log('String copiada para o clipboard');
    }).catch((err) => {
      console.error('Falha ao copiar a string para o clipboard', err);
    });
    setMostrarMensagem(true);
  }

  const favorite = async () => {
    await addRecipe(recipe);
  };

  useEffect(() => {
    const { pathname } = window.location;
    const id = pathname.split('/')[2];
    const kindOfRecipe = pathname.split('/')[1];
    setTypeOfRecipe(kindOfRecipe);

    if (kindOfRecipe === 'meals') {
      const getMeals = async () => {
        const response = await getMealsByID(id);
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
  }, [typeOfRecipe]);

  // const handleCheckbox = ({target}) => {
  //   target.checked ? (text-decoration: line-through solid rgb(0, 0, 0)) : null;
  // };

  return (
    <div>
      <button
        data-testid="share-btn"
        src={ logo }
        onClick={ copyToClipboard }
      >
        Compartilhar

      </button>
      <button
        src={ logo2 }
        data-testid="favorite-btn"
        onClick={ favorite }
      >
        Favorite

      </button>
      {mostrarMensagem && <div>Link copied!</div>}
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
            {Object.keys(recipe).map((key, index) => {
              if (key.includes('Ingredient') && recipe[key]) {
                // const completed = false;
                return (
                  <li key={ index }>
                    <IngredientsCards
                      key={ key }
                      index={ index }
                      recipe={ recipe[key] }
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
