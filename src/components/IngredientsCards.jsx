import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function IngredientsCards({ ingredient, id, index }) {
  const { pathname } = useLocation();
  const food = pathname.includes('meals') ? 'meals' : 'drinks';
  const [completed, setCompleted] = useState(((JSON.parse(
    localStorage.getItem('inProgressRecipes'),
  )) || { [food]: { [id]: [] } })[food][id].includes(ingredient));

  const doneIngredient = () => {
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'))
    || { drinks: { 178319: [] }, meals: { 52771: [] } };
    console.log(inProgressRecipes);
    if (!inProgressRecipes[food][id]) {
      inProgressRecipes[food] = { ...inProgressRecipes[food], [id]: [] };
    }
    if (completed) {
      inProgressRecipes[food][id] = [...inProgressRecipes[food][id]
        .filter((ing) => ing !== ingredient)];
    } else {
      inProgressRecipes[food][id] = [...inProgressRecipes[food][id], ingredient];
    }
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
  };

  return (

    <label
      htmlFor={ ingredient }
      data-testid={ `${index}-ingredient-step` }
      className={ completed ? 'Checkbox-recipes' : null }
    >
      <input
        type="checkbox"
        id={ ingredient }
        onChange={ () => {
          doneIngredient();
          setCompleted(!completed);
        } }
        defaultChecked={ completed }
      />
      {ingredient}
    </label>
  );
}

IngredientsCards.propTypes = {
  ingredient: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};
