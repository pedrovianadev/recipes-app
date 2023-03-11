import PropTypes from 'prop-types';
import React, { useState } from 'react';

export default function IngredientsCards({ recipe, index, key2 }) {
  const [completed, setCompleted] = useState(false);
  return (

    <label
      htmlFor={ key2 }
      data-testid={ `${index}-ingredient-step` }
      className={ completed ? 'Checkbox-recipes' : null }
    >
      <input
        type="checkbox"
        id={ key2 }
        onChange={ () => setCompleted(!completed) }
      />
      {recipe}
    </label>
  );
}

IngredientsCards.propTypes = {
  index: PropTypes.number.isRequired,
  recipe: PropTypes.string.isRequired,
  key2: PropTypes.number.isRequired,
  // meal: PropTypes.shape({
  //   idMeal: PropTypes.number.isRequired,
  //   strMeal: PropTypes.string.isRequired,
  //   strMealThumb: PropTypes.string.isRequired,
  // }).isRequired,
};
