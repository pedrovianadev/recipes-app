import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import React from 'react';

function DrinkCard({ drink, index }) {
  const history = useHistory();
  return (
    <button
      type="button"
      onClick={ () => history.push(`/drinks/${drink.idDrink}`) }
      data-testid={ `${index}-recipe-card` }
    >
      {drink && (
        <main>
          <img
            src={ drink.strDrinkThumb }
            alt="drink"
            data-testid={ `${index}-card-img` }
          />
          <h3 data-testid={ `${index}-card-name` }>{drink.strDrink}</h3>
        </main>)}

    </button>
  );
}

DrinkCard.propTypes = {
  drink: PropTypes.shape({
    idDrink: PropTypes.number.isRequired,
    strDrink: PropTypes.string,
    strDrinkThumb: PropTypes.string,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default DrinkCard;
