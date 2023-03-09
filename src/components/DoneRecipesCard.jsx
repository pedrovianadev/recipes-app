import PropTypes from 'prop-types';
import React from 'react';
import logo from '../images/shareIcon.svg';

function DoneRecipesCard({ index }) {
  const tagName1 = 'Pasta';
  const tagName2 = 'Curry';
  return (
    <div>
      <img alt="foodpicture" src="https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg" data-testid={ `${index}-horizontal-image` } />
      <h3 data-testid={ `${index}-horizontal-name` }>Spicy Arrabiata Penne</h3>
      <p data-testid={ `${index}-horizontal-top-text` }>Italian - Vegetarian</p>
      <p data-testid={ `${index}-horizontal-done-date` }>23/06/2020</p>
      <button
        data-testid={ `${index}-horizontal-share-btn` }
        src={ logo }
      >
        compartilhar

      </button>
      <p data-testid={ `${index}-${tagName1}-horizontal-tag` }>{tagName1}</p>
      <p data-testid={ `${index}-${tagName2}-horizontal-tag` }>{tagName2}</p>
    </div>
  );
}

DoneRecipesCard.propTypes = {
  index: PropTypes.number.isRequired,
};

export default DoneRecipesCard;
