import PropTypes from 'prop-types';
import React, { useState } from 'react';
import logo from '../images/shareIcon.svg';
import logo2 from '../images/blackHeartIcon.svg';

function FavoriteRecipesCard({ recipe, index }) {
  const [mostrarMensagem, setMostrarMensagem] = useState(false);
  const [mostrarMensagem2, setMostrarMensagem2] = useState(false);

  function copyToClipboard() {
    const textToCopy = 'http://localhost:3000/meals/52771';
    navigator.clipboard.writeText(textToCopy).then(() => {
      console.log('String copiada para o clipboard');
    }).catch((err) => {
      console.error('Falha ao copiar a string para o clipboard', err);
    });
    setMostrarMensagem(true);
  }
  function copyToClipboard2() {
    const textToCopy = 'http://localhost:3000/meals/52771';
    navigator.clipboard.writeText(textToCopy).then(() => {
      console.log('String copiada para o clipboard');
    }).catch((err) => {
      console.error('Falha ao copiar a string para o clipboard', err);
    });
    setMostrarMensagem2(true);
  }
  return (
    <div>
      <img
        alt="foodpicture"
        src={ recipe.image }
        data-testid={ `${index}-horizontal-image` }
      />
      <h3
        data-testid={ `${index}-horizontal-name` }
      >
        {recipe.name}

      </h3>
      <p
        data-testid={ `${index}-horizontal-top-text` }
      >
        {`${recipe.nationality} - ${recipe.category}`}

      </p>
      <button
        onClick={ copyToClipboard }
        data-testid={ `${index}-horizontal-share-btn` }
        src={ logo }
      >
        compartilhar

      </button>
      {mostrarMensagem && <div>Link copied!</div>}
      <button
        data-testid={ `${index}-horizontal-favorite-btn` }
        src={ logo2 }
        onClick={ copyToClipboard2 }
      >
        Favoritar Receita

      </button>
      {mostrarMensagem2 && <div>Link copied!</div>}
    </div>
  );
}
FavoriteRecipesCard.propTypes = {
  index: PropTypes.number.isRequired,
  recipe: PropTypes.shape({
    category: PropTypes.string,
    image: PropTypes.string,
    name: PropTypes.string,
    nationality: PropTypes.string,
  }).isRequired,
};

export default FavoriteRecipesCard;
