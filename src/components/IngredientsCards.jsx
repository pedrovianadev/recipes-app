import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function IngredientsCards({ ingredient, id }) {
  const { pathname } = useLocation();
  const food = pathname.includes('meals') ? 'meals' : 'drinks';
  const [completed, setCompleted] = useState(((JSON.parse(
    localStorage.getItem('inProgressRecipes'),
  )) || { [food]: { [id]: [] } })[food][id].includes(ingredient));

  const doneIngredient = () => {
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
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
      data-testid="ingredient-step"
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
};
