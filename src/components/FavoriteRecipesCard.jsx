import PropTypes from 'prop-types';
import React, { useState } from 'react';
import logo from '../images/shareIcon.svg';
import logo2 from '../images/blackHeartIcon.svg';

function FavoriteRecipesCard({ index }) {
  const tagName1 = 'Pasta';
  const tagName2 = 'Curry';
  const [mostrarMensagem, setMostrarMensagem] = useState(false);

  function copyToClipboard() {
    const textToCopy = 'http://localhost:3000/meals/52771';
    navigator.clipboard.writeText(textToCopy).then(() => {
      console.log('String copiada para o clipboard');
    }).catch((err) => {
      console.error('Falha ao copiar a string para o clipboard', err);
    });
    setMostrarMensagem(true);
  }
  return (
    <div>
      <img alt="foodpicture" src="https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg" data-testid={ `${index}-horizontal-image` } />
      <h3 data-testid={ `${index}-horizontal-name` }>Spicy Arrabiata Penne</h3>
      <p data-testid={ `${index}-horizontal-top-text` }>Italian - Vegetarian</p>
      <p data-testid={ `${index}-horizontal-done-date` }>23/06/2020</p>
      <button
        onClick={ copyToClipboard }
        data-testid={ `${index}-horizontal-share-btn` }
        src={ logo }
      >
        compartilhar

      </button>
      {mostrarMensagem && <div>Link copied!</div>}
      <p data-testid={ `${index}-${tagName1}-horizontal-tag` }>{tagName1}</p>
      <p data-testid={ `${index}-${tagName2}-horizontal-tag` }>{tagName2}</p>
      <button
        data-testid={ `${index}-horizontal-favorite-btn` }
        src={ logo2 }
      >
        Favoritar Receita

      </button>
    </div>
  );
}
FavoriteRecipesCard.propTypes = {
  index: PropTypes.number.isRequired,

};

export default FavoriteRecipesCard;
