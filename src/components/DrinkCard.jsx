import PropTypes from 'prop-types';
import React from 'react';

function DrinkCard({ drink, index }) {
  return (
    <div data-testid={ `${index}-recipe-card` }>
      {drink && (
        <main>
          <img
            src={ drink.strDrinkThumb }
            alt="drink"
            data-testid={ `${index}-card-img` }
          />
          <h3 data-testid={ `${index}-card-name` }>{drink.strDrink}</h3>
        </main>)}

    </div>
  );
}

DrinkCard.propTypes = {
  drink: PropTypes.shape({
    strDrink: PropTypes.string,
    strDrinkThumb: PropTypes.string,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default DrinkCard;
