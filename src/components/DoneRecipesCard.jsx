import PropTypes from 'prop-types';
import React from 'react';

function DoneRecipesCard({ index }) {
  const tagName1 = 'Pasta';
  const tagName2 = 'Curry';
  return (
    <div>
      <img alt="foodpicture" data-testid={ `${index}-horizontal-image` } />
      <h3 data-testid={ `${index}-horizontal-name` }>Titulo</h3>
      <p data-testid={ `${index}-horizontal-top-text` }>Categoria</p>
      <p data-testid={ `${index}-horizontal-done-date` }>Data de Conclusão</p>
      <button data-testid={ `${index}-horizontal-share-btn` }>compartilhar</button>
      <p data-testid={ `${index}-${tagName1}-horizontal-tag` }>Tag</p>
      <p data-testid={ `${index}-${tagName2}-horizontal-tag` }>Tag</p>
    </div>
  );
}

DoneRecipesCard.propTypes = {
  index: PropTypes.number.isRequired,
};

export default DoneRecipesCard;
