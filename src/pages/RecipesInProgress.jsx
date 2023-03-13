import React, { useEffect, useState } from 'react';
import clipboardCopy from 'clipboard-copy';
import { getMealsByID, getDrinksByID } from '../services/api';
import { addRecipe, removeRecipe } from '../services/saveFavoriteRecipes';
import IngredientsCards from '../components/IngredientsCards';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

const START_INDEX = -1;
let index = START_INDEX;

function RecipesInProgress() {
  const [recipe, setRecipe] = useState([]);
  const [typeOfRecipe, setTypeOfRecipe] = useState('');
  const [notes, setNotes] = useState('');
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
        setFavRecipe({
          id: response.meals[0].idMeal,
          type: 'meal',
          nationality: response.meals[0].strArea,
          category: response.meals[0].strCategory,
          alcoholicOrNot: '',
          name: response.meals[0].strMeal,
          image: response.meals[0].strMealThumb,
        });
      };
      getMeals();
    } else {
      const getDrinks = async () => {
        const response = await getDrinksByID(idd);
        setRecipe(response.drinks[0]);
        setFavRecipe({
          id: response.drinks[0].idDrink,
          type: 'drink',
          nationality: '',
          category: response.drinks[0].strCategory,
          alcoholicOrNot: response.drinks[0].strAlcoholic,
          name: response.drinks[0].strDrink,
          image: response.drinks[0].strDrinkThumb,
        });
      };
      getDrinks();
    }
    if (!inProgressRecipes[kindOfRecipe]) {
      inProgressRecipes = { ...inProgressRecipes, [kindOfRecipe]: { [id]: [] } };
      localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
    }
  }, [typeOfRecipe]);

  const favRecipe = {
    id,
    type: typeOfRecipe.slice(0, START_INDEX),
    nationality: recipe.strArea || '',
    category: recipe.strCategory,
    alcoholicOrNot: typeOfRecipe === 'meals' ? '' : recipe.strAlcoholic,
    name: recipe[typeOfRecipe === 'meals' ? 'strMeal' : 'strDrink'],
    image: recipe[typeOfRecipe === 'meals' ? 'strMealThumb' : 'strDrinkThumb'],
  };

  const copy = async () => {
    await clipboardCopy(`http://localhost:3000/${typeOfRecipe}/${id}`); setNotes('Link copied!');
  };

  const checkFavorit = () => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    return favoriteRecipes?.some((element) => element.id === id);
  };

  const [favorited, setFavorited] = useState(checkFavorit());

  const favorite = async () => {
    if (favorited) {
      await removeRecipe(favRecipe);
    } else {
      await addRecipe(favRecipe);
    }
    setFavorited((prevState) => !prevState);
  };

  console.log(recipe);

  return (
    <div>
      <button
        data-testid="share-btn"
        onClick={ copy }
      >
        Compartilhar

      </button>
      {notes}
      <button
        data-testid="favorite-btn"
        onClick={ favorite }
        src={ favorited ? blackHeartIcon : whiteHeartIcon }
      >
        Favorite
        <img src={ favorited ? blackHeartIcon : whiteHeartIcon } alt="" />
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
            {Object.keys(recipe).map((key) => {
              if (key.includes('Ingredient') && recipe[key]) {
                index += 1;
                return (
                  <li key={ index }>
                    <IngredientsCards
                      setDisabled={ setDisabled }
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
            disabled={ disabled }
            onClick={ handleClick }
          >
            Finalizar Receita
          </button>
        </div>
      )}
    </div>
  );
}

export default RecipesInProgress;
