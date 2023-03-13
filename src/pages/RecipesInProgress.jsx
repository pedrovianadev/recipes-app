import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { getMealsByID, getDrinksByID } from '../services/api';
import IngredientsCards from '../components/IngredientsCards';
import { addRecipe, removeRecipe } from '../services/saveFavoriteRecipes';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import logo from '../images/shareIcon.svg';


function RecipesInProgress() {
  const history = useHistory();
  const [recipe, setRecipe] = useState([]);
  const [favRecipe, setFavRecipe] = useState([]);
  const [typeOfRecipe, setTypeOfRecipe] = useState('');
  const { id } = useParams();

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

  const [mostrarMensagem, setMostrarMensagem] = useState(false);

  function copyToClipboard() {
    const url = window.location.href;
    const idd = url.split('/')[4];
    const type = url.split('/')[3];
    const textToCopy = `http://localhost:3000/${type}/${idd}`;
    navigator.clipboard.writeText(textToCopy).then(() => {
      console.log('String copiada para o clipboard');
    }).catch((err) => {
      console.error('Falha ao copiar a string para o clipboard', err);
    });
    setMostrarMensagem(true);
  }

  const handleClick = () => {
    history.push('/done-recipes');
  };

  useEffect(() => {
    const { pathname } = window.location;
    const idd = pathname.split('/')[2];
    const kindOfRecipe = pathname.split('/')[1];
    setTypeOfRecipe(kindOfRecipe);

    if (kindOfRecipe === 'meals') {
      const getMeals = async () => {
        const response = await getMealsByID(idd);
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
  }, [typeOfRecipe]);

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
        src={ favorited ? blackHeartIcon : whiteHeartIcon }
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
