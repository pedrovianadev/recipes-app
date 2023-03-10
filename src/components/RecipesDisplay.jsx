import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

function RecipesDisplay() {
  const { recipes } = useSelector((state) => state.headerSearch);
  const slice = 12;
  const history = useHistory();

  return (
    <div>
      {recipes !== null && recipes.slice(0, slice).map((recipe, index) => (
        <button
          key={ index }
          data-testid={ `${index}-recipe-card` }
          onClick={ () => history.push(`/drinks/${recipe.idDrink}`) }
        >
          <img
            src={ recipe.strMealThumb || recipe.strDrinkThumb }
            alt={ recipe.strMeal || recipe.strDrink }
            data-testid={ `${index}-card-img` }
          />
          <p data-testid={ `${index}-card-name` }>{recipe.strMeal || recipe.strDrink}</p>
        </button>
      ))}
    </div>
  );
}

export default RecipesDisplay;
