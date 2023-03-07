import PropTypes from 'prop-types';
import React from 'react';

function MealCard({ meal, index }) {
  return (
    <div data-testid={ `${index}-recipe-card` }>
      {meal && (
        <main>
          <img
            src={ meal.strMealThumb }
            alt="drink"
            data-testid={ `${index}-card-img` }
          />
          <h3 data-testid={ `${index}-card-name` }>{meal.strMeal}</h3>
        </main>)}

    </div>
  );
}

MealCard.propTypes = {
  index: PropTypes.number.isRequired,
  meal: PropTypes.shape({
    strMeal: PropTypes.string.isRequired,
    strMealThumb: PropTypes.string.isRequired,
  }).isRequired,
};

export default MealCard;
