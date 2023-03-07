import PropTypes from 'prop-types';
import React from 'react';
import { useHistory } from 'react-router-dom';

function MealCard({ meal, index }) {
  const history = useHistory();
  return (
    <button
      type="button"
      onClick={ () => history.push(`/meals/${meal.idMeal}`) }
      data-testid={ `${index}-recipe-card` }
    >
      {meal && (
        <main>
          <img
            src={ meal.strMealThumb }
            alt="drink"
            data-testid={ `${index}-card-img` }
          />
          <h3 data-testid={ `${index}-card-name` }>{meal.strMeal}</h3>
        </main>)}

    </button>
  );
}

MealCard.propTypes = {
  index: PropTypes.number.isRequired,
  meal: PropTypes.shape({
    idMeal: PropTypes.number.isRequired,
    strMeal: PropTypes.string.isRequired,
    strMealThumb: PropTypes.string.isRequired,
  }).isRequired,
};

export default MealCard;
